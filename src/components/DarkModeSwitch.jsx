import React, { useContext } from 'react'
import { DarkModeContext } from '../contexts/DarkModeContext';

const DarkModeSwitch = () => {
  const { darkModeOn, setDarkModeOn } = useContext(DarkModeContext);

  const handleClick = () => { 
    console.log("clicked")
    setDarkModeOn((prevMode) => !prevMode)
  }

  return (
    <div className="flex items-center fixed top-6 right-6 z-50 group">
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
