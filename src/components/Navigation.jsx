import { useEffect } from 'react';
import { FaHome, FaBook, FaHammer, FaCode, FaEnvelope } from 'react-icons/fa';

const Navigation = () => {

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const bar = document.querySelector('.bar');
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
          bar.style.top = `${i * 64}px`;
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
    <div className="fixed left-4 z-50 top-1/2 transform -translate-y-1/2">
      <div className="relative">

        <div className="bar absolute left-[-10px] w-1 h-10 bg-gray-700 dark:bg-offwhite transition-all duration-300 rounded-md"></div>

          <div className="flex flex-col space-y-6">

            <div className="flex items-center">
              <a href="#Home" className="peer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700">
                <FaHome className="text-gray-700 dark:text-offwhite text-xl" />
              </a>
              <span className="font-montserratMedium ml-2 opacity-0 peer-hover:opacity-100 transition-opacity text-gray-700 dark:text-offwhite text-xl">
                Home
              </span>
            </div>

            <div className="flex items-center">
              <a href="#About" className="peer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700">
                <FaBook className="text-gray-700 dark:text-offwhite text-xl" />
              </a>
              <span className="font-montserratMedium ml-2 opacity-0 peer-hover:opacity-100 transition-opacity text-gray-700 dark:text-offwhite text-xl">
                About
              </span>
            </div>

            <div className="flex items-center">
              <a href="#Projects" className="peer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700">
                <FaHammer className="text-gray-700 dark:text-offwhite text-xl" />
              </a>
              <span className="font-montserratMedium ml-2 opacity-0 peer-hover:opacity-100 transition-opacity text-gray-700 dark:text-offwhite text-xl">
                Projects
              </span>
            </div>

            <div className="flex items-center">
              <a href="#Experience" className="peer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700">
                <FaCode className="text-gray-700 dark:text-offwhite text-xl" />
              </a>
              <span className="font-montserratMedium ml-2 opacity-0 peer-hover:opacity-100 transition-opacity text-gray-700 dark:text-offwhite text-xl">
                Experience
              </span>
            </div>

            <div className="flex items-center">
              <a href="#Contact" className="peer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700">
                <FaEnvelope className="text-gray-700 dark:text-offwhite text-xl" />
              </a>
              <span className="font-montserratMedium ml-2 opacity-0 peer-hover:opacity-100 transition-opacity text-gray-700 dark:text-offwhite text-xl">
                Contact
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Navigation;
