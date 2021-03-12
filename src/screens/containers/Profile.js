import React, { useState } from 'react';
import { Layout, Text, Button, Spinner,CheckBox } from '@ui-kitten/components';
import firebase from '../../../config/firebase';
import { Alert } from 'react-native';
import { StyleSheet, Keyboard, TouchWithoutFeedback, TouchOpacity } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';

export default ProfileScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword , setNewPassword] = useState('');
  const [userName, setUsername] = useState('');
  const [confirmUserName , setConfirmUserName] = useState('');
  const user = firebase.auth().currentUser;
  const [loading, setLoading] = useState(false);
 // const firebase = require('firebase');
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setLoading(true);
        Alert.alert('Logged out');
      })
      .catch((error) => {
        Alert.alert('Something went wrong');
      });
  };
  const handleDelete = () => {
    user
      .delete()
      .then(() => {
        setLoading(true);
        Alert.alert('Account Deletion successful');
      })
      .catch(function (error) {
        Alert.alert('Something went wrong');
      });
  };
   const handleChangePassword = () => {
  // Re-use functionality needs to be tested.
    if (newPassword === currentPassword) {
      Alert.alert("Your new password must be different from your current password.");
    }
    else {
 // this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        Alert.alert("Password was changed.");
       // Alert.alert(user.email)
      }).catch((error) => {
        Alert.alert("Error. Password could not be changed.")
      });
   /* }).catch((error) => {
      Alert.alert("Error. Could not change Password.")
    });*/
    }

  };
  const handleEditUsername = () => {
  if (confirmUserName === userName) {
    Alert.alert("New Username must be different from current Username.");
  }

  };

   /*reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email , currentPassword);
    return user.reauthenticateWithCredential(cred);
  }*/
   /* reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }*/



    return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onPress={handleLogout}
        style={{ width: '50%', borderRadius: 5 }}
        appearance='outline'
      >
        {loading === false ? <Text>Logout</Text> : <Spinner size='small' />}
      </Button>
      <Button
        onPress={handleDelete}
        style={{ width: '50%', borderRadius: 5, marginTop: 25 }}
        appearance='outline'
      >
        {loading === false ? (
          <Text>Delete Account</Text>
        ) : (
          <Spinner size='small' />
        )}
      </Button>
        <Text category='h1' style={{ padding: 20, marginTop: 20 }}>
          Change your Password
        </Text>
        <Input
          style={styles.inputBox}
          placeholder='Current Password'
          secureTextEntry={true}
          value={currentPassword}
          autoCapitalize="none"
          onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
        />
          <Input
          style={styles.inputBox}
          placeholder='Enter New Password'
          secureTextEntry={true}
          value={newPassword}
          autoCapitalize="none"
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
        <Text category='h1' style={{ padding: 20, marginTop: 20 }}>
          Edit your User Name
        </Text>
        <Input
          style={styles.inputBox}
          placeholder='New User Name'
          value={userName}
          autoCapitalize="none"
          onChangeText={(userName) => setUsername(userName)}
        />
        <Input
          style={styles.inputBox}
          placeholder='Confirm User Name'
          value={confirmUserName}
          autoCapitalize="none"
          onChangeText={(confirmUserName) => setConfirmUserName(confirmUserName)}
        />
        <Button
          onPress={handleEditUsername}
          style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
          appearance='outline'
        >
          <Text>
            Change User Name
          </Text>
          </Button>


    </Layout>
    
             

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

