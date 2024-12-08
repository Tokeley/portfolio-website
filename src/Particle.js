export class Particle {
  constructor(p, x, y) {
      this.p = p;
      this.x = x;
      this.y = y;

      this.xLast = x;
      this.xlast = y;
  }

  updateLast(x, y){
      this.xLast = x;
      this.xlast = y;
  }
  }

