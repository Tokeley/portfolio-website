import React, { useEffect, useState } from 'react';
import FlowField from './FlowField';

function App() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Set the fade-in state to true after the component mounts
    const timer = setTimeout(() => setFadeIn(true), 1000); // Delay for 0.5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-white">
      <div className="absolute inset-0 flex items-center justify-center">
        <FlowField />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none backdrop-blur-sm">
        <h1
          className={`p-10 text-9xl font-montserratExtraLight text-black transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}` }
        >
          Alex Manning
        </h1>
      </div>
    </div>
  );
}

export default App;




        

