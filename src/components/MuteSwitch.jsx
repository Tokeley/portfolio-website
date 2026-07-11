import React, { useContext, useRef } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { SoundContext } from '../contexts/SoundContext';

const createSound = (src, volume) => {
  const audio = new Audio(src);
  audio.volume = volume;
  return audio;
};

const MuteSwitch = () => {
  const { muted, setMuted, isMobile } = useContext(SoundContext);

  // Created once per mount (not per render) so clicks don't re-fetch audio
  const soundsRef = useRef(null);
  const getSounds = () => {
    if (!soundsRef.current) {
      soundsRef.current = {
        soundOn: createSound("/resources/audio/SoundOn.mp3", 0.6),
        soundOff: createSound("/resources/audio/SoundOff.mp3", 0.6),
      };
    }
    return soundsRef.current;
  };

  const handleClick = () => {
    setMuted(!muted);

    const { soundOn, soundOff } = getSounds();
    if (!muted && !isMobile) {
      soundOff.play().catch((error) => { console.error("Failed to play sound on:", error); });
    } else if (!isMobile) {
      soundOn.play().catch((error) => { console.error("Failed to play sound off:", error); });
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
          <FaVolumeMute data-testid="icon-muted" className="text-gray-700 dark:text-offwhite text-xl" />
        ) : (
          <FaVolumeUp data-testid="icon-unmuted" className="text-gray-700 dark:text-offwhite text-xl" />
        )}
      </a>
    </div>
  );
};

export default MuteSwitch;
