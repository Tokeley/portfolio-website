import { useRef, useEffect, useState } from 'react';
import p5 from 'p5';

const FlowField = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const sketchRef = useRef();
  const [orientation, setOrientation] = useState(0);

  useEffect(() => {
    const sketch = (p) => {
      let particles = [];
      
      const num = window.innerWidth < 1024 ? 750 : 3000;
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
        }
      };

      const onScreen = (v, p) => {
        return v.x >= 0 && v.x <= p.width && v.y >= 0 && v.y <= p.height;
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
