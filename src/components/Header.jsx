import React, { useContext, useEffect } from 'react'
import MuteSwitch from './MuteSwitch'
import DarkModeSwitch from './DarkModeSwitch'
import SoundWidget from './SoundWidget'
import { SoundContext } from '../contexts/SoundContext';

const Header = () => {
    const { muted } = useContext(SoundContext);

    return (
        <div className="fixed top-6 flex z-50 w-screen justify-between px-4">
            <div className="flex sm:space-x-2.5 sm:w-fit w-full items-center">
                <MuteSwitch />
                {!muted && <SoundWidget />}
            </div>

            <DarkModeSwitch />
        </div>

  )
}

export default Header