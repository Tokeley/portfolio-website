import React, { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch"
import Navigation from './components/Navigation';
import FlowfieldBackground from './components/FlowfieldBackground';
import Pages from './Pages';

const App = () => {
  const [bgOpacity, setBgOpacity] = useState(0);
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('Home');
      if (homeSection) {
        const homeHeight = homeSection.offsetHeight;
        const scrollY = window.scrollY;
        const newOpacity = (scrollY / homeHeight) * 0.9;
        setBgOpacity(scrollY > homeHeight ? 0.9 : newOpacity);
      }
    };

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      setChecked(true)
    }
    else{
      setChecked(false)
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', checked)
  }, [checked])

  return (
      <div className="relative">
        <FlowfieldBackground />
        <Navigation />
        <Switch size="lg" className="fixed top-6 right-6 z-50" checked={checked} onCheckedChange={(e) => setChecked(e.checked)}/>
        <div className="relative z-10">
          <Pages bgOpacity={bgOpacity} checked={checked}/>
        </div>
      </div>
  );
};

export default App;

