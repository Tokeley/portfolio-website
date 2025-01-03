import React, { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

const Pages = ({ bgOpacity, checked }) => {

  let backgroundColor
  if (checked){
    backgroundColor = `rgba(24, 24, 27, ${bgOpacity})`;
  }
  else{
    backgroundColor = `rgba(255, 255, 255, ${bgOpacity})`;
  }

  return (
    <div
    className='pb-40'
      style={{
        backgroundColor: `var(--dynamic-bg-color)`,
        '--dynamic-bg-color': backgroundColor,
      }}
    >
      <Home />
      <About />
      <Projects />
      <Experience checked={checked}/>
      <Contact />
    </div>
  );
};

export default Pages;
