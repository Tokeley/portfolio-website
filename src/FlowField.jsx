import { useRef, useEffect, useState } from 'react';
import p5 from 'p5';

const FlowField = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const sketchRef = useRef();
  const [orientation, setOrientation] = useState(Math.floor(Math.random() * 4));

  useEffect(() => {
    const sketch = (p) => {
      let particles = [];
      
      const screenSize = window.innerWidth * window.innerHeight;
      const num = screenSize / 500;
      const noiseScale = 0.002;

      p.setup = () => {
        p.createCanvas(p.windowWidth*0.9999, p.windowHeight*0.9999).parent(sketchRef.current);
        for (let i = 0; i < num; i++) {
          particles.push(p.createVector(p.random(0, p.width), p.random(0, p.height)));
        }
        p.stroke(255);
        if (isDarkMode){
          p.background(0, 1);
        }
        else{
          p.background(255, 1);
        }
      };

      p.draw = () => {
        let time = p.millis() * 0.00000001;

        // Set the point size
        p.strokeWeight(2);
        for (let i = 0; i < num; i++) {
          let particle = particles[i];

          // Sunset palette based on vertical position (top -> bottom)
          const t = p.constrain(particle.y / p.height, 0, 1);
          const sunsetStops = [
            { at: 0.0,  c: p.color(46, 2, 105) },   // deep violet
            { at: 0.35, c: p.color(124, 58, 237) }, // violet
            { at: 0.55, c: p.color(236, 72, 153) }, // pink
            { at: 0.75, c: p.color(249, 115, 22) }, // orange
            { at: 1.0,  c: p.color(253, 224, 71) }  // gold
          ];

          let lower = sunsetStops[0];
          let upper = sunsetStops[sunsetStops.length - 1];
          for (let s = 0; s < sunsetStops.length - 1; s++) {
            if (t >= sunsetStops[s].at && t <= sunsetStops[s + 1].at) {
              lower = sunsetStops[s];
              upper = sunsetStops[s + 1];
              break;
            }
          }

          const localT = (t - lower.at) / (upper.at - lower.at || 1);
          const baseColor = p.lerpColor(lower.c, upper.c, localT);

          // Subtle brightness variation toward center adds depth
          const edgeFactor = Math.min(particle.x, p.width - particle.x, particle.y, p.height - particle.y);
          const brightnessBoost = p.map(edgeFactor, 0, p.width / 3, -40, 30);

          let r = p.constrain(p.red(baseColor) + brightnessBoost, 0, 255);
          let g = p.constrain(p.green(baseColor) + brightnessBoost * 0.6, 0, 255);
          let b = p.constrain(p.blue(baseColor) + brightnessBoost * 0.2, 0, 255);

          // Calculate distance to the nearest edge and map it to opacity
          let distanceToEdge = Math.min(particle.x, p.width - particle.x, particle.y, p.height - particle.y);

          // Increase opacity near edges for nice vignette; lower in center
          let opacity = p.map(distanceToEdge, 0, p.width / 2, 255, 80);
          opacity = p.constrain(opacity, 120, 255);
          
          p.stroke(r, g, b, 255 - opacity);
          p.point(particle.x, particle.y);
          let n = p.noise(particle.x * noiseScale, particle.y * noiseScale, time);
          let a = p.TAU * n;
          
          // Adjust direction based on orientation
          switch (orientation) {
            case 0:
              particle.x += p.cos(a);
              particle.y += p.sin(a);
              break;
            case 1:
              particle.x += p.sin(a);
              particle.y += p.cos(a);
              break;
            case 2:
              particle.x -= p.cos(a);
              particle.y -= p.sin(a);
              break;
            case 3:
              particle.x -= p.sin(a);
              particle.y -= p.cos(a);
              break;
            default:
              particle.x += p.cos(a);
              particle.y += p.sin(a);
          }
        }
      };
    };

    const myP5 = new p5(sketch, sketchRef.current);

    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default FlowField;
