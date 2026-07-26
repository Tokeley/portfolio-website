import React, { useState, useEffect, useContext } from 'react';
import Navigation from './components/Navigation';
import NavigationMobile from './components/NavigationMobile';
import FlowfieldBackground from './components/FlowfieldBackground';
import Pages from './Pages';
import Header from './components/Header';
import { DarkModeContext } from './contexts/DarkModeContext';
import { SoundContext } from './contexts/SoundContext';

const App = () => {
  const { darkModeOn, setDarkModeOn } = useContext( DarkModeContext );
  const { muted, setMuted, isMobile, setIsMobile } = useContext(SoundContext);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkModeOn(true);
    } else {
      setDarkModeOn(false);
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkModeOn);
  }, [darkModeOn]);
    
  useEffect(() => {
    // The overlay opacity is written to a CSS variable instead of React state
    // so scrolling never re-renders the component tree.
    let ticking = false;

    const update = () => {
      ticking = false;
      const homeSection = document.getElementById('Home');
      if (homeSection) {
        const homeHeight = homeSection.offsetHeight;
        const scrollY = window.scrollY;
        const newOpacity = (scrollY / homeHeight) * 0.6;
        document.documentElement.style.setProperty(
          '--dynamic-bg-opacity',
          String(scrollY > homeHeight ? 0.9 : newOpacity + 0.3)
        );
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      let details = navigator.userAgent; 
      let regexp = /android|iphone|kindle|ipad/i; 
      let isMobileDevice = regexp.test(details) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkIfMobile();
  }, []);


  return (
    <div className="relative">
      <FlowfieldBackground />
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <div className="block lg:hidden">
        <NavigationMobile />
      </div>
      <Header/>
      <div className="relative z-10">
        <Pages />
      </div>
    </div>
  );
};

export default App;


