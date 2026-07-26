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

    // #scroll-container (not the document) is what actually scrolls - see
    // the comment on it below for why.
    const scrollContainer = document.getElementById('scroll-container');
    if (!scrollContainer) return undefined;

    const update = () => {
      ticking = false;
      const homeSection = document.getElementById('Home');
      if (homeSection) {
        const homeHeight = homeSection.offsetHeight;
        const scrollY = scrollContainer.scrollTop;
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

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
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
      {/* The document (html/body) is locked from scrolling (see index.css) -
          this container scrolls instead. Mobile Safari only auto-hides its
          toolbar in response to the document scrolling, so keeping all real
          scrolling confined to here keeps the toolbar from disappearing. */}
      <div id="scroll-container" className="h-dvh overflow-y-auto overscroll-contain scroll-smooth [-webkit-overflow-scrolling:touch]">
        <div className="relative z-10">
          <Pages />
        </div>
      </div>
    </div>
  );
};

export default App;


