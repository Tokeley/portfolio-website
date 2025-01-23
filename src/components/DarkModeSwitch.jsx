import React, { useContext, useRef } from 'react'
import { DarkModeContext } from '../contexts/DarkModeContext';
import { SoundContext } from '../contexts/SoundContext';

const DarkModeSwitch = () => {
  const { darkModeOn, setDarkModeOn } = useContext(DarkModeContext);
  const { muted, setMuted } = useContext(SoundContext);
  const lightOn = new Audio("/resources/audio/LightOn.mp3");
  const lightOff = new Audio("/resources/audio/LightOff.mp3");

  const handleClick = () => { 
    setDarkModeOn((prevMode) => !prevMode)

    if ( !muted ) {
      if (darkModeOn){
        lightOff.play().catch((error) => { console.error("Failed to play sound on:", error); });
      } else {
        lightOn.play().catch((error) => { console.error("Failed to play sound off:", error); });
      }
    }
  }

  return (
    <div className="flex items-center group pr-0 sm:pr-4">
      <span className="hidden lg:flex font-montserratMedium mr-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 dark:text-offwhite text-xl">
        {darkModeOn ? "Dark Mode" : "Light Mode"}
      </span>
      <a
        className="hover:cursor-pointer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                    transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                    hover:scale-105 hover:shadow-xl"
        onClick={handleClick}
      >
        {darkModeOn ? (
          <i className="fa-solid fa-moon text-gray-700 dark:text-offwhite text-xl"></i>
        ) : (
          <i className="fa-solid fa-sun text-gray-700 dark:text-offwhite text-xl"></i>
        )}
      </a>
    </div>
  );
};

export default DarkModeSwitch
