import React from 'react';

const SoundWidget = () => {
  return (
    <div className="mx-4 sm:mx-0 flex-grow sm:w-60 w-full h-max border border-gray-700 flex items-center justify-between p-2 backdrop-blur-lg">
        <i className="fa-solid fa-backward text-gray-700"></i>
        <p className="text-gray-700 truncate">Campfire Calm</p>
        <i className="fa-solid fa-forward text-gray-700"></i>
    </div>
  );
};

export default SoundWidget;
