import React, { useState, useEffect, useContext } from 'react';
import { SoundProvider } from './contexts/SoundContext';
import Navigation from './components/Navigation';
import NavigationMobile from './components/NavigationMobile';
import FlowfieldBackground from './components/FlowfieldBackground';
import Pages from './Pages';
import Header from './components/Header';
import { DarkModeContext } from './contexts/DarkModeContext';

const App = () => {
  const [bgOpacity, setBgOpacity] = useState(0.3);
  const { darkModeOn, setDarkModeOn } = useContext( DarkModeContext );

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
    const handleScroll = () => {
      const homeSection = document.getElementById('Home');
      if (homeSection) {
        const homeHeight = homeSection.offsetHeight;
        const scrollY = window.scrollY;
        const newOpacity = (scrollY / homeHeight) * 0.6;
        setBgOpacity(scrollY > homeHeight ? 0.9 : newOpacity + 0.3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <Header/>
          <div className="relative z-10">
            <Pages bgOpacity={bgOpacity} />
          </div>
        </div>
    </SoundProvider>
  );
};

export default App;


