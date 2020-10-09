import React from 'react';

export const THEME_NAME = {
	LIGHT: 'light',
	DARK: 'dark',
};

export const themes = {
	[THEME_NAME.LIGHT]: {
		name: THEME_NAME.LIGHT,
		color: '#000000',
		backgroundColor: '#ffffff',
	},
	[THEME_NAME.DARK]: {
		name: THEME_NAME.DARK,
		color: '#ffffff',
		backgroundColor: '#000000',
	},
};

export const ThemeContext = React.createContext({
	theme: themes[THEME_NAME.DARK],
	/**
	 * Change the theme between light and dark
	 */
	toggleTheme: () => {},
});
