import React, { useContext } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import { DarkModeContext } from './contexts/DarkModeContext';

const Pages = () => {
  const { darkModeOn } = useContext(DarkModeContext);
  // Opacity lives in --dynamic-bg-opacity (updated directly on scroll in
  // App.jsx, bypassing React); only the base colour depends on dark mode.
  const backgroundColor = darkModeOn
    ? 'rgba(24, 24, 27, var(--dynamic-bg-opacity, 0.3))'
    : 'rgba(255, 255, 255, var(--dynamic-bg-opacity, 0.3))';

  return (
    <div
    className='sm:pb-0 pb-40'
      style={{
        backgroundColor: `var(--dynamic-bg-color)`,
        '--dynamic-bg-color': backgroundColor,
      }}
    >
      <Home />
      <About />
      <Projects />
      <Experience/>
      <Contact />
    </div>
  );
};

export default Pages;
