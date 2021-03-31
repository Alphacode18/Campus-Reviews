console.disableYellowBox = true;

import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import { ThemeContext } from './theme-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AuthStack from './navigation/StackNavigator';
import AuthenticatedNavigator from './navigation/SwitchNavigator';
import firebase from './config/firebase';

export default () => {
  const [theme, setTheme] = React.useState('light');
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setIsAuthenticated(true) : setIsAuthenticated(false);
    console.log(isAuthenticated);
  });

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          {isAuthenticated ? <AuthenticatedNavigator /> : <AuthStack />}
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};
