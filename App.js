import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AuthStack from './navigation/StackNavigator';
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
        {/* If persistence is false, display authentication screens */}
        {!isAuthenticated && <AuthStack />}
        {/* Else show protected screens */}
      </ApplicationProvider>
    </>
  );
};
