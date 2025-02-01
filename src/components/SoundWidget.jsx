import React, { useEffect, useContext, useState } from 'react';
import { SoundContext } from '../contexts/SoundContext';
import useSound from 'use-sound';
import SoundInfo from './SoundInfo';

// Array of audio tracks
const tracks = [
  { title: "Ethereal Forest", src: "/resources/audio/Ethereal-Forest.mp3" },
  { title: "Fractal River", src: "/resources/audio/Fractal-River.mp3" },
  { title: "Calm Park", src: "/resources/audio/Calm-Park.mp3" },
];

const SoundWidget = ({currentTrackIndex, setCurrentTrackIndex}) => {
  const { muted, setMuted, isMobile, setIsMobile } = useContext(SoundContext);
  const [bgMusic, setBgMusic] = useState(new Audio(tracks[currentTrackIndex].src)); // Initial audio object
  const [loading, setLoading] = useState(true);
  const clickSound = new Audio("/resources/audio/Click.mp3");

  useEffect(() => {

    clickSound.volume = 0.4;
    bgMusic.volume = 0.6;
    bgMusic.loop = true;
  }, []);

  const play = () => {
    bgMusic
      .play()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Failed to play bg music:", error);
      });
  };

  const stop = () => {
    bgMusic.pause();
  };

  const changeTrack = (direction) => {
    if (!isMobile) {
      clickSound.volume = 0.4;
      clickSound.play().catch((error) => {
        console.error("Failed to play sound on:", error);
      });
    }
    stop(); // Stop current track
    setLoading(true);
    const newIndex =
      direction === "next"
        ? (currentTrackIndex + 1) % tracks.length // Cycle forward
        : (currentTrackIndex - 1 + tracks.length) % tracks.length; // Cycle backward
    setCurrentTrackIndex(newIndex);
    const newTrack = new Audio(tracks[newIndex].src);
    newTrack.volume = 0.5;
    newTrack.loop = true;
    setBgMusic(newTrack); // Update audio object
  };

  useEffect(() => {
    if (!muted) {
      play();
    } else {
      stop();
    }

    // Cleanup audio on unmount
    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, [muted, bgMusic]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stop();
      } else if (!muted && document.visibilityState === 'visible') {
        play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isMobile, muted, bgMusic]);

  return (
    <div className="flex flex-grow items-center">
      <div className="mx-4 sm:mx-0 flex-grow sm:w-60 w-full h-max border border-gray-700 flex items-center justify-between p-2 backdrop-blur-lg">
        <i
          className="fa-solid fa-backward text-gray-700 cursor-pointer"
          onClick={() => changeTrack("previous")}
        ></i>
        {loading ? (
          <div className="w-6 h-6 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <p className="text-gray-700 dark:text-offwhite truncate">
            {tracks[currentTrackIndex].title}
          </p>
        )}
        <i
          className="fa-solid fa-forward text-gray-700 cursor-pointer"
          onClick={() => changeTrack("next")}
        ></i>
      </div>
      {
        !isMobile ? (<SoundInfo />) : <></>
      }
    </div>
  );
};

export default SoundWidget;
