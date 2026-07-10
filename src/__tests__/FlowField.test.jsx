import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { MockP5, createLcg } from '../test-utils/mockP5';
import { createMatchMedia } from '../setupTests';
import FlowField from '../FlowField';

vi.mock('p5', async () => {
  const { MockP5 } = await import('../test-utils/mockP5');
  return { default: MockP5 };
});

const setWindowSize = (width, height) => {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, configurable: true, writable: true });
};

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
    const { unmount } = render(<FlowField />);
    expect(MockP5.instances).toHaveLength(1);
    unmount();
    expect(MockP5.instances[0].removed).toBe(true);
  });

  it('renders at pixel density 1 and sets stroke weight once in setup', () => {
    render(<FlowField />);
    const { p } = MockP5.instances[0];
    expect(p.calls.pixelDensity).toEqual([1]);
    expect(p.calls.strokeWeight).toEqual([2]);

    p.calls.strokeWeight = [];
    p.draw();
    expect(p.calls.strokeWeight).toHaveLength(0);
  });

  it('spawns screen-area/500 particles on normal screens', () => {
    render(<FlowField />);
    const { p } = MockP5.instances[0];
    p.draw();
    expect(p.calls.point).toHaveLength(Math.floor((1024 * 768) / 500));
  });

  it('caps the particle count on very large screens', () => {
    setWindowSize(4000, 2500); // uncapped would be 20,000 particles
    render(<FlowField />);
    const { p } = MockP5.instances[0];
    p.draw();
    expect(p.calls.point).toHaveLength(3000);
  });

  it('produces the same colours as the original p5 lerpColor implementation', () => {
    render(<FlowField />);
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
    render(<FlowField />);
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
    render(<FlowField />);
    const { p } = MockP5.instances[0];
    const num = Math.floor((1024 * 768) / 500);
    expect(p.calls.noLoop).toBe(1);
    expect(p.calls.point).toHaveLength(150 * num); // pre-rendered trails
  });

  it('resizes the canvas and repaints the background on window resize', () => {
    render(<FlowField />);
    const { p } = MockP5.instances[0];
    const backgroundsBefore = p.calls.background.length;

    p.windowWidth = 800;
    p.windowHeight = 600;
    p.windowResized();

    expect(p.calls.resizeCanvas).toHaveLength(1);
    expect(p.width).toBeCloseTo(800 * 0.9999, 1);
    expect(p.calls.background.length).toBe(backgroundsBefore + 1);
  });
});
