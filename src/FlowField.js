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
      const num = 3000;
      const noiseScale = 0.002;

      p.setup = () => {
        p.createCanvas(p.windowWidth*0.9999, p.windowHeight*0.9999).parent(sketchRef.current);
        for (let i = 0; i < num; i++) {
          particles.push(p.createVector(p.random(0, p.width), p.random(0, p.height)));
        }
        p.stroke(255);
      };

      p.draw = () => {
        p.background(255, 1);
        let time = p.millis() * 0.00000001;

        // Set the point size
        p.strokeWeight(4);
        for (let i = 0; i < num; i++) {
          let particle = particles[i];

          // Position based
          // let r = p.map(particle.x, 0, p.width, 50, 255);
          // let g = p.map(particle.y, 0, p.height, 50, 255);
          // let b = p.map(particle.x, 0, p.width, 255, 50);

          // let centerX = p.width / 2;
          // let centerY = p.height / 2;
          // let distToCenter = p.dist(particle.x, particle.y, centerX, centerY);

          // let r = p.map(distToCenter, 0, p.width / 2, 255, 0);
          // let g = p.map(distToCenter, 0, p.width / 2, 0, 255);
          // let b = p.map(distToCenter, 0, p.width / 2, 0, 255);

          // let r = p.map(particle.y, 0, p.height, 255, 0);
          // let g = p.map(particle.x, 0, p.width, 255, 0);
          // let b = 200;

          let edgeFactor = Math.min(particle.x, p.width - particle.x, particle.y, p.height - particle.y);
          let r = p.map(edgeFactor, 0, p.width / 4, 255, 100);
          let g = 50;
          let b = p.map(edgeFactor, 0, p.width / 4, 100, 255);




          // Calculate distance to the nearest edge and map it to opacity
          let distanceToEdge = Math.min(particle.x, p.width - particle.x, particle.y, p.height - particle.y);

          // Make the effect more pronounced by adjusting the range and scaling
          let opacity = p.map(distanceToEdge, 0, p.width / 2, 255, 100);
          opacity = p.constrain(opacity, 150, 255); // Ensure the opacity stays within bounds
          
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
            //particle.x = p.random(0, p.width);
            //particle.y = p.random(0, p.height);
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
