import React, { useEffect, useContext, useState } from 'react';
import { SoundContext } from '../contexts/SoundContext';
import useSound from 'use-sound';

// Array of audio tracks
const tracks = [
  { title: "Calm Soul", src: "/resources/audio/calm_soul.mp3" },
  { title: "Ocean Waves", src: "/resources/audio/ocean_waves.mp3" },
  { title: "Rain Ambience", src: "/resources/audio/rain_ambience.mp3" },
  { title: "Room Ambience", src: "/resources/audio/room_ambience.mp3" },
];

const SoundWidget = () => {
  const { muted } = useContext(SoundContext);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Track index
  const [bgMusic, setBgMusic] = useState(new Audio(tracks[0].src)); // Initial audio object
  const [playClick] = useSound('/resources/audio/Click.mp3');

  const play = () => {
    bgMusic.play().catch((error) => {
      console.error("Failed to play bg music:", error);
    });
  };

  const stop = () => {
    bgMusic.pause();
  };

  const changeTrack = (direction) => {
    playClick();
    stop(); // Stop current track
    const newIndex =
      direction === "next"
        ? (currentTrackIndex + 1) % tracks.length // Cycle forward
        : (currentTrackIndex - 1 + tracks.length) % tracks.length; // Cycle backward
    setCurrentTrackIndex(newIndex);
    const newTrack = new Audio(tracks[newIndex].src);
    newTrack.loop = true;
    newTrack.volume = 0.3;
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

  return (
    <div className="mx-4 sm:mx-0 flex-grow sm:w-60 w-full h-max border border-gray-700 flex items-center justify-between p-2 backdrop-blur-lg">
      <i
        className="fa-solid fa-backward text-gray-700 cursor-pointer"
        onClick={() => changeTrack("previous")}
      ></i>
      <p className="text-gray-700 dark:text-offwhite truncate">
        {tracks[currentTrackIndex].title}
      </p>
      <i
        className="fa-solid fa-forward text-gray-700 cursor-pointer"
        onClick={() => changeTrack("next")}
      ></i>
    </div>
  );
};

export default SoundWidget;
