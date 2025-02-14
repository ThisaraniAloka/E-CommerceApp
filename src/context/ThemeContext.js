import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const savedMode = await AsyncStorage.getItem("darkMode");
      setDarkMode(savedMode === "true");
    };
    loadSettings();
  }, []);

  const toggleDarkMode = async () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
