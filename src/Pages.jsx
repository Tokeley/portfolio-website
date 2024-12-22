import React, { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

const Pages = ({ bgOpacity, checked }) => {
  
  const isDarkMode = document.documentElement.classList.contains('dark');

  console.log("OPacity: " + bgOpacity + " Darkmode" + isDarkMode);

  let backgroundColor
  if (checked){
    backgroundColor = `rgba(24, 24, 27, ${bgOpacity})`;
  }
  else{
    backgroundColor = `rgba(255, 255, 255, ${bgOpacity})`;
  }

  return (
    <div
    
      style={{
        backgroundColor: `var(--dynamic-bg-color)`,
        '--dynamic-bg-color': backgroundColor,
      }}
    >
      <Home />
      <About />
      <Projects />
      <Experience />
      <Resume />
      <Contact />
    </div>
  );
};

export default Pages;
