import React, { useState } from 'react';

import { ThemeContext, themes } from './context/ThemeContext';
/**
 * Components
 */
import Button from './components/Button';

function Toolbar(props) {
  return (
    <Button onClick={props.onChangeTheme}>Change theme</Button>
  );
}

const ThemeButton = () => {
  const [currentThemeName, setCurrentThemeName] = useState('light');
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const onChangeTheme = () => {
    if (currentThemeName === 'light') {
      setCurrentThemeName('dark');
      setCurrentTheme(themes.dark);
    }
    else {
      setCurrentThemeName('light');
      setCurrentTheme(themes.light);
    }
  }

  return (
    <div>
      <h1>Theme button</h1>

      <ThemeContext.Provider value={currentTheme}>
        <Toolbar onChangeTheme={onChangeTheme} />
      </ThemeContext.Provider>

      <Button>Default theme</Button>
    </div>
  );
}

export default ThemeButton;
