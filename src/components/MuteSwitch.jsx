import React, { useContext } from 'react';
import useSound from 'use-sound';
import { SoundContext } from '../contexts/SoundContext';

const MuteSwitch = () => {
  const { muted, setMuted } = useContext(SoundContext);

  const [playSoundOn] = useSound("/resources/audio/SoundOn.mp3");
  const [playSoundOff] = useSound("/resources/audio/SoundOff.mp3");

  const handleClick = () => {
    setMuted(!muted);

    if (!muted) {
      playSoundOff();
    } else {
      playSoundOn();
    }
  };

  return (
    <div className="flex items-center group">
      <a
        className="hover:cursor-pointer w-10 h-10 flex items-center justify-center shadow-xl rounded-md bg-offwhite dark:bg-gray-700 
                   transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 
                   hover:scale-105 hover:shadow-xl z-50"
        onClick={handleClick}
      >
        {muted ? (
          <i className="fa-solid fa-volume-xmark text-gray-700 dark:text-offwhite text-xl"></i>
        ) : (
          <i className="fa-solid fa-volume-high text-gray-700 dark:text-offwhite text-xl"></i>
        )}
      </a>
    </div>
  );
};

export default MuteSwitch;
