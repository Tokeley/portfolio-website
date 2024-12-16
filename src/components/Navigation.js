import React, { useEffect } from 'react';

const Navigation = () => {
    useEffect(() => {
        const handleScroll = () => {
          const sections = document.querySelectorAll('.section');
          const bar = document.querySelector('.bar');
    
          sections.forEach((element, i) => {
            const beginPoint = element.offsetTop - 300;
            const lastPoint = beginPoint + element.clientHeight + 100;
    
            if (window.scrollY >= beginPoint && window.scrollY <= lastPoint) {
              bar.style.top = `${i * 70}px`; // Adjust based on item height + margin
            }
          });
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    
      return (
        <div className="fixed top-1/3 left-6 z-50">
          <div className="relative">
            <div className="bar absolute left-[-15px] w-1 h-10 bg-gray-700 transition-all duration-300"></div>
    
            <div className="flex flex-col space-y-8">
              <div className="flex items-center">
                <a href="#Home" className="w-10 h-10 flex items-center justify-center shadow-lg rounded-md">
                  <i className="fa-solid fa-house text-gray-700"></i>
                </a>
                <span className="ml-3 opacity-0 hover:opacity-100 transition-opacity text-gray-700">Home</span>
              </div>
    
              <div className="flex items-center">
                <a href="#About" className="w-10 h-10 flex items-center justify-center shadow-lg rounded-md">
                  <i className="fas fa-yin-yang text-gray-700"></i>
                </a>
                <span className="ml-3 opacity-0 hover:opacity-100 transition-opacity text-gray-700">About</span>
              </div>
    
              <div className="flex items-center">
                <a href="#Projects" className="w-10 h-10 flex items-center justify-center shadow-lg rounded-md">
                  <i className="fas fa-mug-hot text-gray-700"></i>
                </a>
                <span className="ml-3 opacity-0 hover:opacity-100 transition-opacity text-gray-700">Coding</span>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Navigation