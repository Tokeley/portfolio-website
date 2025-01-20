import React, { createContext, useState, useEffect } from 'react';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkModeOn, setDarkModeOn] = useState(true);

  useEffect(() => {
    console.log("Dark mode is on: ", darkModeOn);
  }, [darkModeOn]);
  return (
    <DarkModeContext.Provider value={{ darkModeOn, setDarkModeOn }}>
      {children}
    </DarkModeContext.Provider>
  );
};