import '@testing-library/jest-dom/vitest';
import { vi, beforeEach } from 'vitest';

// jsdom doesn't implement matchMedia (used by App, FlowField, Chakra/next-themes)
export const createMatchMedia = (matches) => (query) => ({
  matches: typeof matches === 'function' ? matches(query) : matches,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(() => false),
});

// jsdom doesn't implement audio playback; track instances so tests can
// assert how many Audio objects components create.
export class MockAudio {
  constructor(src) {
    this.src = src;
    this.volume = 1;
    this.loop = false;
    this.currentTime = 0;
    this.paused = true;
    MockAudio.instances.push(this);
  }

  play() {
    this.paused = false;
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
  }
}
MockAudio.instances = [];

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// jsdom doesn't implement IntersectionObserver; tests can grab the most
// recent instance and call `.trigger(isIntersecting)` to simulate scroll.
export class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
    MockIntersectionObserver.instances.push(this);
  }

  observe(el) {
    this.elements.add(el);
  }

  unobserve(el) {
    this.elements.delete(el);
  }

  disconnect() {
    this.elements.clear();
  }

  trigger(isIntersecting, target) {
    this.callback([{ isIntersecting, target }], this);
  }
}
MockIntersectionObserver.instances = [];

beforeEach(() => {
  MockAudio.instances = [];
  MockIntersectionObserver.instances = [];
  window.matchMedia = vi.fn(createMatchMedia(false));
  window.Audio = MockAudio;
  globalThis.Audio = MockAudio;
  window.ResizeObserver = MockResizeObserver;
  globalThis.ResizeObserver = MockResizeObserver;
  window.IntersectionObserver = MockIntersectionObserver;
  globalThis.IntersectionObserver = MockIntersectionObserver;
  document.documentElement.className = '';
  document.documentElement.style.cssText = '';
});
