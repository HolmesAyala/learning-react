import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Button = (props) => {
  const themeContext = useContext(ThemeContext);

  const buttonStyle = {
    color: themeContext.foreground,
    backgroundColor: themeContext.background
  };

  return <button style={buttonStyle} {...props}></button>;
}

export default Button;
