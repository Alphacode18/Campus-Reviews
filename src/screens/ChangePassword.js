//TODO: Integrate with the latest version of homescreen
import React, { useState } from 'react';
import { StyleSheet, Keyboard, TouchWithoutFeedback, TouchOpacity, Alert } from 'react-native';
import { Layout, Button, Input, Text, Spinner, Icon } from '@ui-kitten/components';

import Firebase from '../../config/firebase';

export default changePassword = ({navigation}) =>  {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword , setNewPassword] = useState('');

  //TODO: Add implementationa and integrate with Firebase
  const handleChangePassword = () => {
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        Alert.alert("Password was changed.");
      }).catch((error) => {
        Alert.alert("Error. Password could not be changed.")
      });
    }).catch((error) => {
      Alert.alert("Error. Could not change Password.")
    });

  };

  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email , currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Layout style={styles.container} level={'1'}>
        <Text category='h1' style={{ padding: 20, marginTop: 50 }}>
          Change your Password
        </Text>
        <Input
          style={styles.inputBox}
          placeholder='Current Password'
          value={currentPassword}
          onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
        />
        <Input
          style={styles.inputBox}
          placeholder='Enter New Password'
          value={newPassword}
          onChangeText={(newPassword) => setNewPassword(newPassword)}
        />
        <Button
          onPress={handleChangePassword}
          style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
          appearance='outline'
        >
          <Text>
            Change Password
          </Text>
        </Button>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    top: 20
  },
  inputBox: {
    width: '85%',
    margin: 0,
    padding: 15,
    fontSize: 16,
    textAlign: 'center',
  },
});
