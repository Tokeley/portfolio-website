import React from 'react'
import { Switch } from "@/components/ui/switch"

const DarkModeSwitch = ({ checked, setChecked }) => {
    return (
      <div className="flex items-center fixed top-6 right-6 z-50 group">
        <span className="hidden xl:flex font-montserratMedium mr-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 dark:text-offwhite text-2xl">
          {checked ? "Dark Mode" : "Light Mode"}
        </span>
        <a
          className="hover:cursor-pointer w-12 h-12 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                     transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                     hover:scale-105 hover:shadow-2xl"
          onClick={() => setChecked(!checked)}
        >
          {checked ? (
            <i className="fa-solid fa-moon text-gray-700 dark:text-offwhite text-2xl"></i>
          ) : (
            <i className="fa-solid fa-sun text-gray-700 dark:text-offwhite text-2xl"></i>
          )}
        </a>
      </div>
    );
  };

export default DarkModeSwitch

//<Switch size="lg" className="fixed top-6 right-6 z-50" checked={checked} onCheckedChange={(e) => setChecked(e.checked)}/>