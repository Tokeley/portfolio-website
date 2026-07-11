import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { MockP5, createLcg } from '../test-utils/mockP5';
import { createMatchMedia, MockIntersectionObserver } from '../setupTests';
import { DarkModeProvider, DarkModeContext } from '../contexts/DarkModeContext';
import FlowField from '../FlowField';

vi.mock('p5', async () => {
  const { MockP5 } = await import('../test-utils/mockP5');
  return { default: MockP5 };
});

const setWindowSize = (width, height) => {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, configurable: true, writable: true });
};

const renderFlowField = () => render(<DarkModeProvider><FlowField /></DarkModeProvider>);

const renderFlowFieldWithHero = () =>
  render(
    <DarkModeProvider>
      <div id="Home" />
      <FlowField />
    </DarkModeProvider>
  );

// Reference implementation of the ORIGINAL (pre-optimization) per-particle
// colour algorithm, which used p5.lerpColor/map/constrain. The optimized
// arithmetic in FlowField.jsx must reproduce it.
const originalColor = (x, y, width, height) => {
  const constrain = (v, min, max) => Math.max(min, Math.min(max, v));
  const map = (v, a, b, c, d) => c + ((v - a) / (b - a)) * (d - c);
  const lerp = (a, b, amt) => a + (b - a) * amt;

  const stops = [
    { at: 0.0, c: [0, 90, 50] },
    { at: 0.3, c: [35, 139, 69] },
    { at: 0.55, c: [65, 171, 93] },
    { at: 0.75, c: [116, 196, 118] },
    { at: 1.0, c: [161, 217, 155] },
  ];

  const t = constrain(y / height, 0, 1);
  let lower = stops[0];
  let upper = stops[stops.length - 1];
  for (let s = 0; s < stops.length - 1; s++) {
    if (t >= stops[s].at && t <= stops[s + 1].at) {
      lower = stops[s];
      upper = stops[s + 1];
      break;
    }
  }
  const localT = (t - lower.at) / (upper.at - lower.at || 1);
  const base = [0, 1, 2].map((i) => lerp(lower.c[i], upper.c[i], localT));

  const edgeFactor = Math.min(x, width - x, y, height - y);
  const boost = map(edgeFactor, 0, width / 3, -40, 30);

  const r = constrain(base[0] + boost * 0.3, 0, 255);
  const g = constrain(base[1] + boost * 0.9, 0, 255);
  const b = constrain(base[2] + boost * 0.3, 0, 255);

  let opacity = map(edgeFactor, 0, width / 2, 255, 80);
  opacity = constrain(opacity, 120, 255);

  return [r, g, b, 255 - opacity];
};

describe('FlowField', () => {
  beforeEach(() => {
    MockP5.instances = [];
    setWindowSize(1024, 768);
  });

  it('creates a single p5 instance and removes it on unmount', () => {
    const { unmount } = renderFlowField();
    expect(MockP5.instances).toHaveLength(1);
    unmount();
    expect(MockP5.instances[0].removed).toBe(true);
  });

  it('renders at pixel density 1 and sets stroke weight once in setup', () => {
    renderFlowField();
    const { p } = MockP5.instances[0];
    expect(p.calls.pixelDensity).toEqual([1]);
    expect(p.calls.strokeWeight).toEqual([2]);

    p.calls.strokeWeight = [];
    p.draw();
    expect(p.calls.strokeWeight).toHaveLength(0);
  });

  it('spawns screen-area/500 particles on normal screens', () => {
    renderFlowField();
    const { p } = MockP5.instances[0];
    p.draw();
    expect(p.calls.point).toHaveLength(Math.floor((1024 * 768) / 500));
  });

  it('caps the particle count on very large screens', () => {
    setWindowSize(4000, 2500); // uncapped would be 20,000 particles
    renderFlowField();
    const { p } = MockP5.instances[0];
    p.draw();
    expect(p.calls.point).toHaveLength(3000);
  });

  it('produces the same colours as the original p5 lerpColor implementation', () => {
    renderFlowField();
    const { p } = MockP5.instances[0];
    p.calls.stroke = []; // drop the initial stroke(255) from setup
    p.draw();

    // Reproduce spawn positions with the same deterministic LCG the mock used
    const lcg = createLcg();
    const num = Math.floor((1024 * 768) / 500);
    const positions = [];
    for (let i = 0; i < num; i++) {
      positions.push([lcg() * p.width, lcg() * p.height]);
    }

    expect(p.calls.stroke.length).toBeGreaterThanOrEqual(num);
    // First frame strokes happen before any movement, so they map 1:1 to spawns.
    // Allow ±1 per channel: the original lerpColor rounded to integer levels.
    for (let i = 0; i < 25; i++) {
      const [x, y] = positions[i];
      const expected = originalColor(x, y, p.width, p.height);
      const actual = p.calls.stroke[i];
      for (let c = 0; c < 4; c++) {
        expect(Math.abs(actual[c] - expected[c])).toBeLessThanOrEqual(1);
      }
    }
  });

  it('moves every particle each frame', () => {
    renderFlowField();
    const { p } = MockP5.instances[0];
    p.draw();
    const first = p.calls.point.map(([x, y]) => `${x},${y}`);
    p.draw();
    const second = p.calls.point.slice(first.length).map(([x, y]) => `${x},${y}`);
    expect(second).toHaveLength(first.length);
    expect(second.every((pos, i) => pos !== first[i])).toBe(true);
  });

  it('renders a static trail image and stops the loop under prefers-reduced-motion', () => {
    window.matchMedia = vi.fn(
      createMatchMedia((query) => query.includes('prefers-reduced-motion'))
    );
    renderFlowField();
    const { p } = MockP5.instances[0];
    const num = Math.floor((1024 * 768) / 500);
    expect(p.calls.noLoop).toBe(1);
    expect(p.calls.point).toHaveLength(150 * num); // pre-rendered trails
  });

  it('resizes the canvas and repaints the background on window resize', () => {
    renderFlowField();
    const { p } = MockP5.instances[0];
    const backgroundsBefore = p.calls.background.length;

    p.windowWidth = 800;
    p.windowHeight = 600;
    p.windowResized();

    expect(p.calls.resizeCanvas).toHaveLength(1);
    expect(p.width).toBeCloseTo(800 * 0.9999, 1);
    expect(p.calls.background.length).toBe(backgroundsBefore + 1);
  });

  it('re-scatters particles to match the new size on resize (shrinking)', () => {
    // Start large, then shrink drastically - without a re-scatter, most
    // particles would still be positioned outside the new, smaller canvas
    // and simply stop being drawn.
    setWindowSize(1920, 1080);
    renderFlowField();
    const { p } = MockP5.instances[0];
    const originalNum = Math.min(Math.floor((1920 * 1080) / 500), 3000);
    p.draw();
    expect(p.calls.point).toHaveLength(originalNum);

    p.windowWidth = 400;
    p.windowHeight = 300;
    p.windowResized();

    const newNum = Math.floor((400 * 300 * 0.9999 * 0.9999) / 500);
    p.calls.point = [];
    p.draw();
    expect(p.calls.point).toHaveLength(newNum);
    // Every re-scattered particle must fall within the new (smaller) canvas.
    for (const [x, y] of p.calls.point) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(p.width);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(p.height);
    }
  });

  it('re-scatters particles to fill the new area on resize (growing)', () => {
    setWindowSize(400, 300);
    renderFlowField();
    const { p } = MockP5.instances[0];

    p.windowWidth = 2000;
    p.windowHeight = 1500;
    p.windowResized();

    const newNum = Math.min(Math.floor((2000 * 1500 * 0.9999 * 0.9999) / 500), 3000);
    p.calls.point = [];
    p.draw();
    expect(p.calls.point).toHaveLength(newNum);
  });

  describe('dark mode toggling mid-session', () => {
    const renderWithDarkMode = (darkModeOn) =>
      render(
        <DarkModeContext.Provider value={{ darkModeOn, setDarkModeOn: () => {} }}>
          <FlowField />
        </DarkModeContext.Provider>
      );

    it('does not repaint on mount beyond the initial setup background', () => {
      renderWithDarkMode(true);
      const { p } = MockP5.instances[0];
      expect(p.calls.background).toHaveLength(1);
    });

    it('repaints at the same low alpha as setup when dark mode toggles (does not wipe trails)', () => {
      const { rerender } = renderWithDarkMode(true);
      const { p } = MockP5.instances[0];
      expect(p.calls.background).toEqual([[0, 1]]); // dark, near-transparent initial paint

      rerender(
        <DarkModeContext.Provider value={{ darkModeOn: false, setDarkModeOn: () => {} }}>
          <FlowField />
        </DarkModeContext.Provider>
      );

      // Low alpha (1), same as setup - a full-opacity repaint would erase
      // the particle trails accumulated since mount.
      expect(p.calls.background).toEqual([[0, 1], [255, 1]]);
    });

    it('repaints again when toggling back to the original theme', () => {
      const { rerender } = renderWithDarkMode(false);
      const { p } = MockP5.instances[0];

      rerender(
        <DarkModeContext.Provider value={{ darkModeOn: true, setDarkModeOn: () => {} }}>
          <FlowField />
        </DarkModeContext.Provider>
      );
      expect(p.calls.background.at(-1)).toEqual([0, 1]);

      rerender(
        <DarkModeContext.Provider value={{ darkModeOn: false, setDarkModeOn: () => {} }}>
          <FlowField />
        </DarkModeContext.Provider>
      );
      expect(p.calls.background.at(-1)).toEqual([255, 1]);
    });
  });

  describe('pausing while scrolled past the hero', () => {
    it('pauses and resumes the sketch as the hero leaves/enters the viewport', () => {
      renderFlowFieldWithHero();
      const { p } = MockP5.instances[0];
      const observer = MockIntersectionObserver.instances[0];
      expect(observer).toBeDefined();

      observer.trigger(false);
      expect(p.calls.noLoop).toBe(1);

      observer.trigger(true);
      expect(p.calls.loop).toBe(1);
    });

    it('does not observe anything when reduced motion is already active', () => {
      window.matchMedia = vi.fn(
        createMatchMedia((query) => query.includes('prefers-reduced-motion'))
      );
      renderFlowFieldWithHero();
      expect(MockIntersectionObserver.instances).toHaveLength(0);
    });

    it('does not crash when no hero element is present', () => {
      expect(() => renderFlowField()).not.toThrow();
      expect(MockIntersectionObserver.instances).toHaveLength(0);
    });
  });
});
