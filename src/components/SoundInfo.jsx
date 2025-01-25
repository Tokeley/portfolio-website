import React, {useContext, useState, useEffect} from 'react'
import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { DarkModeContext } from '../contexts/DarkModeContext';

const SoundInfo = () => {
    const { darkModeOn, setDarkModeOn } = useContext(DarkModeContext);
    const [open, setOpen] = useState(false)
    const [bgColor, setBgColor] = useState('')

    useEffect(() => {
        if (darkModeOn){
            setBgColor('#374151')
        } else {
            setBgColor('#f5f5f5')
        }
    }, [darkModeOn])

    return (
        <div>
            <PopoverRoot size={'xs'} open={open} onOpenChange={(e) => setOpen(e.open)}>
                <PopoverTrigger asChild>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24" fill="#374151" className='ml-2 hover:cursor-pointer transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 hover:scale-105 hover:shadow-xl z-50'>
                        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
                    </svg>
                </PopoverTrigger>
                <PopoverContent css={{ "--popover-bg": {bgColor} }}>
                    <PopoverArrow />
                    <PopoverBody className='space-y-2'>
                        <p className='font-montserratMedium text-gray-700 dark:text-gray-200'>
                            If you are enjoying these ambient soundscapes, please check out my soundscape mixer website:
                        </p>
                        <div className='flex items-center w-full justify-center'>
                            <a href="https://www.thezenzone.app/" target="_blank" rel="noopener noreferrer" >
                                <div className='border p-2 hover:cursor-pointer transform transition-all duration-200 ease-in-out active:translate-y-1 active:scale-95 hover:scale-105 hover:shadow-xl z-50'>
                                    <p>
                                        The Zen Zone
                                    </p>
                                </div>
                            </a>
                        </div>
                    </PopoverBody>
                </PopoverContent>
            </PopoverRoot>
        </div>
    )
}

export default SoundInfo