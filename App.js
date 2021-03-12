console.disableYellowBox = true;

import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AuthStack from './navigation/StackNavigator';
import AuthenticatedNavigator from './navigation/SwitchNavigator';
import firebase from './config/firebase';

export default () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setIsAuthenticated(true) : setIsAuthenticated(false);
    console.log(isAuthenticated);
  });

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {isAuthenticated ? <AuthenticatedNavigator /> : <AuthStack />}
      </ApplicationProvider>
    </>
  );
};
