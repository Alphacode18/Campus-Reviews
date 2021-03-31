import React, { createContext } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {
    console.log('Hello!');
  },
});
