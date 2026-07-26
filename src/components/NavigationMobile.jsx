import { useEffect } from 'react';
import { FaHome, FaBook, FaHammer, FaCode, FaEnvelope } from 'react-icons/fa';

const NavigationMobile = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const barMobile = document.querySelector('.barMobile');
    // #scroll-container (not the document) is what actually scrolls - see
    // the comment on it in App.jsx.
    const scrollContainer = document.getElementById('scroll-container');
    if (!scrollContainer) return undefined;
    let ticking = false;
    let activeIndex = -1;

    const update = () => {
      ticking = false;
      const scrollY = scrollContainer.scrollTop;
      sections.forEach((element, i) => {
        const beginPoint = element.offsetTop - 100;
        const lastPoint = beginPoint + element.clientHeight + 100;

        if (scrollY >= beginPoint && scrollY <= lastPoint && activeIndex !== i) {
          activeIndex = i;
          barMobile.style.left = `${i * 64}px`;
        }
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="">
        <div className="barMobile absolute bottom-[-10px] w-10 h-1 bg-gray-700 dark:bg-offwhite transition-all duration-300 rounded-md"></div>
          <div className="flex space-x-6">

            <div className="items-center group">
             
              <a href="#Home" className="hover:cursor-pointer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                     transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                     hover:scale-105 hover:shadow-2xl"> 
                <FaHome className="text-gray-700 dark:text-offwhite text-xl" />
              </a>
            </div>

            <div className="items-center group">
      
              <a href="#About" className="hover:cursor-pointer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                     transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                     hover:scale-105 hover:shadow-2xl">
                <FaBook className="text-gray-700 dark:text-offwhite text-xl" />
              </a>
              
            </div>

            <div className="items-center group">
              <a href="#Projects" className="hover:cursor-pointer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                     transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                     hover:scale-105 hover:shadow-2xl">
                <FaHammer className="text-gray-700 dark:text-offwhite text-xl" />
              </a>
              
            </div>

            <div className="items-center group">
  
              <a href="#Experience" className="hover:cursor-pointer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                     transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                     hover:scale-105 hover:shadow-2xl">
                <FaCode className="text-gray-700 dark:text-offwhite text-xl" />
              </a>
              
            </div>

            <div className="items-center group">
            
              <a href="#Contact" className="hover:cursor-pointer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                     transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                     hover:scale-105 hover:shadow-2xl">
                <FaEnvelope className="text-gray-700 dark:text-offwhite text-xl" />
              </a>
  
            </div>
          </div>
        </div>
      </div>
  );
}

export default NavigationMobile;
