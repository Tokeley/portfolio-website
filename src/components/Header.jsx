import React, { useEffect } from 'react'
import MuteSwitch from './MuteSwitch'
import DarkModeSwitch from './DarkModeSwitch'

const Header = () => {
    return (
        <div>
            <MuteSwitch />
            <DarkModeSwitch/>
        </div>
  )
}

export default Header