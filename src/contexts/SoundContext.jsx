import React, { createContext, useState } from 'react';

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [muted, setMuted] = useState(true);

  return (
    <SoundContext.Provider value={{ muted, setMuted }}>
      {children}
    </SoundContext.Provider>
  );
};