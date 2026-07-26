import { useRef, useEffect, useState, useContext } from 'react';
import p5 from 'p5';
import { DarkModeContext } from './contexts/DarkModeContext';

// Nature green palette, top -> bottom. Stored as plain numbers so the draw
// loop never allocates p5.Color objects (it runs per-particle, per-frame).
const GREEN_STOPS = [
  { at: 0.0, r: 0, g: 90, b: 50 },
  { at: 0.3, r: 35, g: 139, b: 69 },
  { at: 0.55, r: 65, g: 171, b: 93 },
  { at: 0.75, r: 116, g: 196, b: 118 },
  { at: 1.0, r: 161, g: 217, b: 155 },
];

// Particles are a background effect; cap the count so very large screens
// (e.g. 4K, ~16k particles uncapped) don't grind the main thread.
const MAX_PARTICLES = 3000;

// The browser fires many 'resize' events per second while a window edge is
// being dragged. Re-scattering thousands of particles on every single one
// of those events blocks the main thread for the whole drag - the page
// (including unrelated text/layout) appears frozen, then snaps all at once
// when the drag ends and the backlog finally clears. Debouncing means the
// expensive work runs once, shortly after the user stops resizing.
const RESIZE_DEBOUNCE_MS = 200;

const TAU = Math.PI * 2;

const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);

// Mobile browsers resize the viewport (window.innerHeight) as their
// address bar/toolbar hides and shows while scrolling - that's not a real
// layout change, but re-scattering particles for it looks like an unwanted
// redraw. Rather than trying to filter "real" resizes from toolbar noise,
// mobile just doesn't react to resize at all: the canvas is sized once, up
// front, to the largest the viewport can be (toolbar hidden), so it already
// covers the toolbar-hidden state and never needs to change.
const isMobileDevice = () => /android|iphone|ipad|ipod|kindle/i.test(navigator.userAgent);

// Measures the CSS "large viewport height" (100lvh - the height assuming
// browser UI is hidden) via an off-screen probe, since there's no direct JS
// API for it. Falls back to the current innerHeight in browsers that don't
// support the lvh unit (the probe's height then resolves to 0).
const measureLargeViewportHeight = () => {
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed; top:0; left:0; height:100lvh; width:0; visibility:hidden; pointer-events:none;';
  document.body.appendChild(probe);
  const height = probe.offsetHeight;
  document.body.removeChild(probe);
  return height || window.innerHeight;
};

const FlowField = () => {
  const { darkModeOn } = useContext(DarkModeContext);
  const sketchRef = useRef();
  const [orientation] = useState(Math.floor(Math.random() * 4));

  // Sketch closures capture values at mount time; refs let setup/draw/resize
  // always read the *current* dark mode without recreating the p5 instance.
  const darkModeRef = useRef(darkModeOn);
  const p5ApiRef = useRef(null);
  const myP5InstanceRef = useRef(null);
  const isFirstDarkModeRender = useRef(true);
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    darkModeRef.current = darkModeOn;

    // Skip the mount render: setup() already painted the correct background.
    if (isFirstDarkModeRender.current) {
      isFirstDarkModeRender.current = false;
      return;
    }

    // Same low alpha as the initial setup paint: nudges the base tint toward
    // the new theme without a full-opacity wipe, which would erase the
    // particle trails accumulated since mount (they'd look "reset").
    p5ApiRef.current?.repaint();
  }, [darkModeOn]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = isMobileDevice();

    const sketch = (p) => {
      let particles = [];
      let num = 0;
      const noiseScale = 0.002;

      // Particle count/positions are sized to the canvas's current
      // dimensions. Called on setup and again once resizing settles -
      // otherwise shrinking the window leaves most particles positioned
      // off the new (smaller) canvas, and growing it leaves the new space
      // empty.
      const scatterParticles = () => {
        num = Math.min(Math.floor((p.width * p.height) / 500), MAX_PARTICLES);
        particles = [];
        for (let i = 0; i < num; i++) {
          particles.push(p.createVector(p.random(0, p.width), p.random(0, p.height)));
        }
      };

      const paintBackground = (alpha = 1) => {
        if (darkModeRef.current) {
          p.background(0, alpha);
        } else {
          p.background(255, alpha);
        }
      };

      p.setup = () => {
        // On mobile, size for the largest the viewport can get (toolbar
        // hidden) up front - see the comment on isMobileDevice above.
        const initialHeight = isMobile ? measureLargeViewportHeight() : p.windowHeight;
        p.createCanvas(p.windowWidth * 0.9999, initialHeight * 0.9999).parent(sketchRef.current);
        // The trails are soft; rendering at device pixel ratio (4x the pixels
        // on retina) is imperceptible here and much more expensive.
        p.pixelDensity(1);
        scatterParticles();
        p.stroke(255);
        p.strokeWeight(2);
        paintBackground(1);

        if (prefersReducedMotion) {
          // Build the trail image once, then hold a static frame.
          for (let i = 0; i < 150; i++) {
            p.draw();
          }
          p.noLoop();
        }
      };

      p.draw = () => {
        const time = p.millis() * 0.00000001;
        const width = p.width;
        const height = p.height;

        for (let i = 0; i < num; i++) {
          const particle = particles[i];

          // Vertical position -> gradient colour (pure arithmetic, no allocs)
          const t = clamp(particle.y / height, 0, 1);
          let lower = GREEN_STOPS[0];
          let upper = GREEN_STOPS[GREEN_STOPS.length - 1];
          for (let s = 0; s < GREEN_STOPS.length - 1; s++) {
            if (t >= GREEN_STOPS[s].at && t <= GREEN_STOPS[s + 1].at) {
              lower = GREEN_STOPS[s];
              upper = GREEN_STOPS[s + 1];
              break;
            }
          }
          const localT = (t - lower.at) / (upper.at - lower.at || 1);

          // Subtle brightness variation toward center adds depth
          const edgeFactor = Math.min(particle.x, width - particle.x, particle.y, height - particle.y);
          const brightnessBoost = -40 + (edgeFactor / (width / 3)) * 70;

          const r = clamp(lower.r + (upper.r - lower.r) * localT + brightnessBoost * 0.3, 0, 255);
          const g = clamp(lower.g + (upper.g - lower.g) * localT + brightnessBoost * 0.9, 0, 255);
          const b = clamp(lower.b + (upper.b - lower.b) * localT + brightnessBoost * 0.3, 0, 255);

          // Increase opacity near edges for nice vignette; lower in center
          let opacity = 255 + (edgeFactor / (width / 2)) * (80 - 255);
          opacity = clamp(opacity, 120, 255);

          p.stroke(r, g, b, 255 - opacity);
          p.point(particle.x, particle.y);

          const a = TAU * p.noise(particle.x * noiseScale, particle.y * noiseScale, time);

          // Adjust direction based on orientation
          switch (orientation) {
            case 1:
              particle.x += Math.sin(a);
              particle.y += Math.cos(a);
              break;
            case 2:
              particle.x -= Math.cos(a);
              particle.y -= Math.sin(a);
              break;
            case 3:
              particle.x -= Math.sin(a);
              particle.y -= Math.cos(a);
              break;
            default:
              particle.x += Math.cos(a);
              particle.y += Math.sin(a);
          }
        }
      };

      p.windowResized = () => {
        // The canvas is already sized for the largest possible viewport
        // (see setup) and mobile has no real resizes worth reacting to
        // (see isMobileDevice above), so there's nothing to do here.
        if (isMobile) return;

        // Debounced: only touch the canvas/particles once resizing has
        // settled, so a live drag doesn't block the main thread (see
        // RESIZE_DEBOUNCE_MS above).
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
        resizeTimeoutRef.current = setTimeout(() => {
          resizeTimeoutRef.current = null;
          p.resizeCanvas(p.windowWidth * 0.9999, p.windowHeight * 0.9999);
          paintBackground(1);
          scatterParticles();
        }, RESIZE_DEBOUNCE_MS);
      };

      p5ApiRef.current = {
        repaint: () => paintBackground(1),
      };
    };

    const myP5 = new p5(sketch, sketchRef.current);
    myP5InstanceRef.current = myP5;

    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
        resizeTimeoutRef.current = null;
      }
      myP5.remove();
      myP5InstanceRef.current = null;
      p5ApiRef.current = null;
    };
  }, []);

  // The canvas is a fixed, full-screen background layer that sits behind the
  // rest of the site, so it stays mounted (and animating) even once the user
  // has scrolled well past it. Pause the sketch while the hero is off-screen
  // and resume it when it scrolls back into view.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined; // already a static frame; nothing to pause/resume
    }

    const heroEl = document.getElementById('Home');
    if (!heroEl || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const instance = myP5InstanceRef.current;
        if (!instance) return;
        if (entry.isIntersecting) {
          instance.loop();
        } else {
          instance.noLoop();
        }
      },
      { threshold: 0 }
    );
    observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  return <div ref={sketchRef}></div>;
};

export default FlowField;
