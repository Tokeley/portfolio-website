import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

const Pages = ({ bgOpacity }) => {
  console.log('bgOpacity:', bgOpacity);
  
  const backgroundColor = `rgba(255, 255, 255, ${bgOpacity})`; // Adjust for light mode
  const darkBackgroundColor = `rgba(24, 24, 27, ${bgOpacity})`; // Adjust for dark mode

  return (
    <div
      className=" bg-white dark:bg-appleGrey"
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
