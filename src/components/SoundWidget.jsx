import React from 'react'

const SoundWidget = () => {
  return (
    <div className='w-auto sm:w-60 mx-4 h-max border-1 border border-gray-700 dark:border-offwhite flex items-center justify-between p-2 backdrop-blur-lg'>
        <i className="fa-solid fa-backward text-gray-700"></i>
        <p className='text-gray-700'>Campfire Calm</p>
        <i class="fa-solid fa-forward text-gray-700"></i>
    </div>
  )
}

export default SoundWidget