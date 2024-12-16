import React, { useEffect } from 'react';

const Navigation = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const bar = document.querySelector('.bar');

      sections.forEach((element, i) => {
        const beginPoint = element.offsetTop - 100;
        const lastPoint = beginPoint + element.clientHeight + 100;

        if (window.scrollY >= beginPoint && window.scrollY <= lastPoint) {
          bar.style.top = `${i * 90}px`; // Adjust based on new item height + margin
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-6 z-50 top-1/2 transform -translate-y-1/2">
      <div className="relative">
        <div className="bar absolute left-[-20px] w-2 h-12 bg-gray-700 transition-all duration-300"></div>

        <div className="flex flex-col space-y-10">
          <div className="flex items-center group">
            <a href="#Home" className="w-12 h-12 flex items-center justify-center shadow-lg rounded-md">
              <i className="fa-solid fa-house text-gray-700 text-2xl"></i>
            </a>
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 text-xl">
              Home
            </span>
          </div>

          <div className="flex items-center group">
            <a href="#About" className="w-12 h-12 flex items-center justify-center shadow-lg rounded-md">
              <i className="fa-solid fa-book text-gray-700 text-2xl"></i>
            </a>
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 text-lg">
              About
            </span>
          </div>

          <div className="flex items-center group">
            <a href="#Projects" className="w-12 h-12 flex items-center justify-center shadow-lg rounded-md">
              <i className="fa-solid fa-hammer text-gray-700 text-2xl"></i>
            </a>
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 text-lg">
              Projects
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
