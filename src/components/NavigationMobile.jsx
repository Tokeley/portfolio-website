import { useEffect } from 'react';

const NavigationMobile = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const barMobile = document.querySelector('.barMobile');
    
      sections.forEach((element, i) => {
        const beginPoint = element.offsetTop - 100;
        const lastPoint = beginPoint + element.clientHeight + 100;
    
        if (window.scrollY >= beginPoint && window.scrollY <= lastPoint) {
          barMobile.style.left = `${i * 104}px`; 
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="">
        <div className="barMobile absolute bottom-[-20px] w-16 h-2 bg-gray-700 dark:bg-offwhite transition-all duration-300 rounded-md"></div>
          <div className="flex space-x-10">

            <div className="items-center group">
             
              <a href="#Home" className="hover:cursor-pointer w-16 h-16 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                     transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                     hover:scale-105 hover:shadow-2xl"> 
                <i className="fa-solid fa-house text-gray-700 dark:text-offwhite text-3xl"></i>
              </a>
            </div>

            <div className="items-center group">
      
              <a href="#About" className="hover:cursor-pointer w-16 h-16 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                     transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                     hover:scale-105 hover:shadow-2xl">
                <i className="fa-solid fa-book text-gray-700 dark:text-offwhite text-3xl"></i>
              </a>
              
            </div>

            <div className="items-center group">
              <a href="#Projects" className="hover:cursor-pointer w-16 h-16 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                     transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                     hover:scale-105 hover:shadow-2xl">
                <i className="fa-solid fa-hammer text-gray-700 dark:text-offwhite text-3xl"></i>
              </a>
              
            </div>

            <div className="items-center group">
  
              <a href="#Experience" className="hover:cursor-pointer w-16 h-16 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                     transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                     hover:scale-105 hover:shadow-2xl">
                <i className="fa-solid fa-code text-gray-700 dark:text-offwhite text-3xl"></i>
              </a>
              
            </div>

            <div className="items-center group">
            
              <a href="#Contact" className="hover:cursor-pointer w-16 h-16 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                     transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                     hover:scale-105 hover:shadow-2xl">
                <i className="fa-solid fa-envelope text-gray-700 dark:text-offwhite text-3xl"></i>
              </a>
  
            </div>
          </div>
        </div>
      </div>
  );
}

export default NavigationMobile;
