import React, { useState, useCallback } from 'react';
/**
 * Context
 */
import { ThemeContext, themes, THEME_NAME } from './context/ThemeContext';
/**
 * Components
 */
import ThemeButton from './components/ThemeButton';

const UpdateFromNestedComponent = () => {
  const toggleTheme = useCallback(() => {
    setThemeValue(({ theme, ...attributes }) => ({
      theme: theme.name === THEME_NAME.LIGHT ? themes[THEME_NAME.DARK] : themes[THEME_NAME.LIGHT],
      ...attributes
    }));
  }, []);

  const [themeValue, setThemeValue] = useState({ theme: themes.light, toggleTheme });

  return (
    <div>
      <h1>Update context from nested component</h1>

      <ThemeContext.Provider value={themeValue}>
        <ThemeButton>Change theme</ThemeButton>
      </ThemeContext.Provider>

      <ThemeButton>Default theme</ThemeButton>
    </div>
  );
}

export default UpdateFromNestedComponent;
