import React, { createContext, useState } from 'react';

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [muted, setMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <SoundContext.Provider value={{ muted, setMuted, isMobile, setIsMobile }}>
      {children}
    </SoundContext.Provider>
  );
};