import { useEffect, useState } from 'react';
import FlowField from '../FlowField';
import { FaGithub, FaEnvelope, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="Home" className="section h-screen flex items-center justify-center z-0">
        <div className={` w-60 sm:w-auto flex items-center justify-center flex-col transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <h1
              className='lg:text-8xl text-7xl font-francy text-gray-700 dark:text-offwhite text-center tracking-wider leading-tight'
            >
              ALEX MANNING
            </h1>

            <div className={`flex space-x-4 mt-4`}>
                <div className="hover:scale-110 transition-transform duration-300">
                  <a href="https://github.com/Tokeley" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-3xl text-gray-700 dark:text-offwhite cursor-pointer" />
                  </a>
                </div>
                <div className="hover:scale-110 transition-transform duration-300">
                  <a href="mailto:alex.t.manning@gmail.com" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope className="text-3xl text-gray-700 dark:text-offwhite cursor-pointer" />
                  </a>
                </div>
                <div className="hover:scale-110 transition-transform duration-300">
                  <a href="https://www.instagram.com/alex.manning_/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-3xl text-gray-700 dark:text-offwhite cursor-pointer" />
                  </a>
                </div>
                <div className="hover:scale-110 transition-transform duration-300">
                  <a href="https://www.linkedin.com/in/alex-manning-7993ab231/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-3xl text-gray-700 dark:text-offwhite cursor-pointer" />
                  </a>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Home;
