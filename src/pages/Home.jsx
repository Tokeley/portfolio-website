import { useEffect, useState } from 'react';
import FlowField from '../FlowField';

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Set the fade-in state to true after the component mounts
    const timer = setTimeout(() => setFadeIn(true), 1000); // Delay for 0.5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="Home" className="section h-screen flex items-center justify-center z-0">
        <div className="flex items-center justify-center pointer-events-none">
            <h1
            className={`p-10 text-9xl font-montserratMedium text-gray-700 transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}` }
            >
            Alex Manning
            </h1>
        </div>
    </section>
  );
}

export default Home