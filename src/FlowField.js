// src/FlowField.js
import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { Particle } from './Particle.js';

const FlowField = () => {
  const sketchRef = useRef();
  const [orientation, setOrientation] = useState(0);

  useEffect(() => {
    const sketch = (p) => {
      let particles = [];
      const num = 5000;
      const noiseScale = 0.007;

      p.setup = () => {
        p.createCanvas(1600, 800).parent(sketchRef.current);
        for (let i = 0; i < num; i++) {
          particles.push(p.createVector(p.random(0, p.width), p.random(0, p.height)));
        }
        p.stroke(255);
      };

      p.draw = () => {
        p.background(0, 90);
        let time = p.millis() * 0.00001;

        // Set the point size
        p.strokeWeight(5);
        for (let i = 0; i < num; i++) {
          let particle = particles[i];
          let r = p.map(particle.x, 0, p.width, 50, 255);
          let g = p.map(particle.y, 0, p.height, 50, 255);
          let b = p.map(particle.x, 0, p.width, 255, 50);

          // Calculate distance to the nearest edge and map it to opacity
          let distanceToEdge = Math.min(particle.x, p.width - particle.x, particle.y, p.height - particle.y);
          
          let opacity = p.map(distanceToEdge, 0, Math.min(p.width, p.height)/2, 255, 30);

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
          
          if (!onScreen(particle, p)) {
            particle.x = p.random(0, p.width);
            particle.y = p.random(0, p.height);
          }
        }
      };

      const onScreen = (v, p) => {
        return v.x >= 0 && v.x <= p.width && v.y >= 0 && v.y <= p.height;
      };

      p.mouseReleased = () => {
        setOrientation((prevOrientation) => (prevOrientation + 1) % 4);
      };
    };

    const myP5 = new p5(sketch, sketchRef.current);

    return () => {
      myP5.remove();
    };
  }, [orientation]);

  return <div ref={sketchRef}></div>;
};

export default FlowField;
