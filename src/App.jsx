import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import FlowfieldBackground from './components/FlowfieldBackground';
import Pages from './Pages';

const App = () => {
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('Home');
      const homeHeight = homeSection.offsetHeight;
      const scrollY = window.scrollY;

      let newOpacity = (scrollY / homeHeight) * 0.9;
      console.log('scrollY:', scrollY, 'homeHeight:', homeHeight, 'newOpacity:', newOpacity);

      if (scrollY > homeHeight) {
        setBgOpacity(0.9);
      } else {
        setBgOpacity(newOpacity);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    //console.log('bgOpacity:', bgOpacity);
  }, [bgOpacity]);

  return (
    <div className="relative">
      <FlowfieldBackground />
      <Navigation />
      <div className="relative z-10 ">
        <Pages bgOpacity={bgOpacity} />
      </div>
    </div>
  );
}

export default App;
