import React, { useState, useEffect } from 'react';
import { SoundProvider } from './contexts/SoundContext';
import Navigation from './components/Navigation';
import NavigationMobile from './components/NavigationMobile';
import FlowfieldBackground from './components/FlowfieldBackground';
import Pages from './Pages';
import DarkModeSwitch from './components/DarkModeSwitch';
import MuteSwitch from './components/MuteSwitch';

const App = () => {
  const [bgOpacity, setBgOpacity] = useState(0.3);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('Home');
      if (homeSection) {
        const homeHeight = homeSection.offsetHeight;
        const scrollY = window.scrollY;
        const newOpacity = (scrollY / homeHeight) * 0.6;
        setBgOpacity(scrollY > homeHeight ? 0.9 : newOpacity + 0.3);
      }
    };

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setChecked(true);
    } else {
      setChecked(false);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', checked);
  }, [checked]);

  return (
    <SoundProvider>
      <div className="relative">
        <FlowfieldBackground />
        <div className="hidden lg:block">
          <Navigation />
        </div>
        <div className="block lg:hidden">
          <NavigationMobile />
        </div>
        <MuteSwitch />
        <DarkModeSwitch checked={checked} setChecked={setChecked} />
        <div className="relative z-10">
          <Pages bgOpacity={bgOpacity} checked={checked} />
        </div>
      </div>
    </SoundProvider>
  );
};

export default App;


