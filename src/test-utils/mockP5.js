// A stub of the p5 instance API surface FlowField uses, so tests can drive
// the sketch (setup/draw/resize) deterministically without a real canvas.

// Deterministic LCG so tests can reproduce particle spawn positions
export const createLcg = (seed = 42) => {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
};

export class MockP5 {
  static instances = [];

  constructor(sketch, node) {
    this.node = node;
    this.removed = false;

    const lcg = createLcg();

    const p = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      width: 0,
      height: 0,
      calls: {
        pixelDensity: [],
        stroke: [],
        strokeWeight: [],
        point: [],
        background: [],
        noLoop: 0,
        loop: 0,
        resizeCanvas: [],
      },
      createCanvas(w, h) {
        p.width = w;
        p.height = h;
        return { parent: () => {} };
      },
      pixelDensity(d) {
        p.calls.pixelDensity.push(d);
      },
      createVector(x, y) {
        return { x, y };
      },
      random(min, max) {
        return min + (max - min) * lcg();
      },
      stroke(...args) {
        p.calls.stroke.push(args);
      },
      strokeWeight(w) {
        p.calls.strokeWeight.push(w);
      },
      background(...args) {
        p.calls.background.push(args);
      },
      point(x, y) {
        p.calls.point.push([x, y]);
      },
      noLoop() {
        p.calls.noLoop += 1;
      },
      loop() {
        p.calls.loop += 1;
      },
      resizeCanvas(w, h) {
        p.width = w;
        p.height = h;
        p.calls.resizeCanvas.push([w, h]);
      },
      millis: () => 0,
      noise: () => 0.5,
    };

    this.p = p;
    sketch(p);
    p.setup();
    MockP5.instances.push(this);
  }

  // Real p5 instance mode passes the instance itself as `p` to the sketch,
  // so `new p5(...)` and the `p` seen inside setup/draw are the same object
  // with `.loop()`/`.noLoop()` directly on it. This wrapper isn't that same
  // object, so delegate to keep call sites (`myP5.loop()`) working the same.
  loop() {
    this.p.loop();
  }

  noLoop() {
    this.p.noLoop();
  }

  remove() {
    this.removed = true;
  }
}
