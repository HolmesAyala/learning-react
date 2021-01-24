import React, { useContext } from 'react';
/**
 * Context
 */
import { ThemeContext } from '../../context/ThemeContext';

const ThemeButton = (props) => {
  const theme = useContext(ThemeContext);

  const onClickInButton = () => {
    theme.toggleTheme();
  }

  const buttonStyle = {
    color: theme.theme.color,
    backgroundColor: theme.theme.backgroundColor
  }

  return (
    <button style={buttonStyle} onClick={onClickInButton} {...props}></button>
  );
}

export default ThemeButton;
