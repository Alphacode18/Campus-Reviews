import React, { useState, useContext } from 'react';
import { Layout, Text, Button, Spinner, CheckBox } from '@ui-kitten/components';
import firebase, { db } from '../../../config/firebase';
import { Alert } from 'react-native';
import { ThemeContext } from '../../../theme-context';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import {
  StyleSheet,
  Keyboard,
  TouchWithoutFeedback,
  TouchOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Input, Icon, Card, Modal } from '@ui-kitten/components';

const user = firebase.auth().currentUser;

export default ProfileScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [userName, setUsername] = useState('');
  const [confirmUserName, setConfirmUserName] = useState('');
  const user = firebase.auth().currentUser;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const screenWidth = Dimensions.get('window').width;
  const themeContext = useContext(ThemeContext);
  // const firebase = require('firebase');
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://console.firebase.google.com/u/2/project/campus-reviews-e74e0/overview');
    setResult(result);
  };
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
  const getUsername = async () => {
    const data = db.collection('users').doc(user['uid']);
    const doc = await data.get();
    setUsername(doc.data().username);
  };
  getUsername();
  const handleChangePassword = () => {
    // Re-use functionality needs to be tested.
    if (newPassword === currentPassword) {
      Alert.alert(
        'Your new password must be different from your current password.'
      );
    } else {
      // this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user
        .updatePassword(newPassword)
        .then(() => {
          Alert.alert('Password was changed.');
          // Alert.alert(user.email)
        })
        .catch((error) => {
          Alert.alert('Error. Password could not be changed.');
        });
      /* }).catch((error) => {
      Alert.alert("Error. Could not change Password.")
    });*/
    }
  };
   const handleChangeEmail = () => {
  var user = firebase.auth().currentUser;
  user
    .updateEmail(newEmail)
    .then(() => {
       Alert.alert('Email was updated');
    })

  };
  //}
  const Anchor = ({ href }) => {
    _handlePress = () => {
      //Linking.openURL(this.props.href);
      Linking.openURL(href);
      // this.props.onPress && this.props.onPress();
      this.onPress && this.onPress();
      Alert.alert('Feature succesfully requested');
    };
    return (
      <Button style={{ marginTop: 20 }} onPress={this._handlePress}>
        REQUEST A FEATURE
      </Button>
    );
  };

  const Anchor2 = ({ href }) => {
    _handlePress = () => {
      //Linking.openURL(this.props.href);
      Linking.openURL(href);
      // this.props.onPress && this.props.onPress();
      this.onPress && this.onPress();
      Alert.alert('User succesfully reported');
    };
    return (
      <Button style={{ marginTop: 20 }} onPress={this._handlePress}>
        REPORT A USER
      </Button>
    );
  };
  const Anchor3 = ({ href }) => {
    _handlePress = () => {
      //Linking.openURL(this.props.href);
      Linking.openURL(href);
      // this.props.onPress && this.props.onPress();
      this.onPress && this.onPress();
      Alert.alert('Bug reported');
    };
    return (
      <Button style={{ marginTop: 20 }} onPress={this._handlePress}>
        REPORT A BUG
      </Button>
    );
  };
  const Anchor4 = ({ href }) => {
    _handlePress = () => {
      //Linking.openURL(this.props.href);
      Linking.openURL(href);
      // this.props.onPress && this.props.onPress();
      this.onPress && this.onPress();
      Alert.alert('Reason sent to user');
    };
    return (
      <Button style={{ marginTop: 20 }} onPress={this._handlePress}>
        SEND BAN REASON
      </Button>
    );
  };

  const handleEditUsername = async () => {
  const data = db.collection('users').doc(user['uid']);
  const res = await data.update({username: newUsername});
  setUsername(newUsername);
  Alert.alert('The username has been updated');
  };

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          width: screenWidth,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ marginTop: 75 }}>Hey {userName}</Text>
        <Button
          onPress={handleLogout}
          style={{ width: '50%', borderRadius: 5, marginTop: 50 }}
          appearance='outline'
        >
          {loading === false ? <Text>Logout</Text> : <Spinner size='small' />}
        </Button>
        <Button
          onPress={handleDelete}
          style={{ width: '50%', borderRadius: 5, marginTop: 15 }}
          appearance='outline'
        >
          {loading === false ? (
            <Text>Delete Account</Text>
          ) : (
            <Spinner size='small' />
          )}
        </Button>
        <Text style={{ padding: 4, marginTop: 15 }}>Change your Password</Text>
        <Input
          style={styles.inputBox}
          placeholder='Current Password'
          secureTextEntry={true}
          value={currentPassword}
          autoCapitalize='none'
          onChangeText={(currentPassword) =>
            setCurrentPassword(currentPassword)
          }
        />
        <Input
          style={styles.inputBox}
          placeholder='Enter New Password'
          secureTextEntry={true}
          value={newPassword}
          autoCapitalize='none'
          onChangeText={(newPassword) => setNewPassword(newPassword)}
        />
        <Button
          onPress={handleChangePassword}
          style={{ width: '50%', borderRadius: 20, marginTop: 15 }}
          appearance='outline'
        >
          <Text>Change Password</Text>
        </Button>
        <Text style={{ padding: 4, marginTop: 15 }}>Change your email</Text>
        <Input
          style={styles.inputBox}
          placeholder='Enter New Email'
          value={newEmail}
          autoCapitalize='none'
          onChangeText={(newEmail) => setNewEmail(newEmail)}
        />
        <Button
          onPress={handleChangeEmail}
          style={{ width: '50%', borderRadius: 20, marginTop: 15 }}
          appearance='outline'
        >
          <Text>Change Email</Text>
        </Button>
        <Button
        onPress={_handlePressButtonAsync}
        >
          <Text>BAN USER</Text>
        </Button>

        <Anchor4
          href="mailto:@purdue.edu?subject=You were banned from Campus Reviewst&body=You were banned because\n"
          title='Email Expo'
        />


        <Anchor
          href='mailto:Campus.Reviews.fb@gmail.com?subject=Feature Request&body=Request your feature below this line!\n'
          title='Email Expo'
        />

        <Anchor2
          href="mailto:Campus.Reviews.fb@gmail.com?subject=User Report&body=Enter the user you're reporting, as well as any reasons below\n"
          title='Email Expo'
        />

        <Anchor3
          href="mailto:Campus.Reviews.fb@gmail.com?subject=Bug Report&body=Describe the issue you're encountering below\n"
          title='Email Expo'
        />

        <Text style={{ padding: 4, marginTop: 15 }}>Edit your User Name</Text>
        <Input
          style={styles.inputBox}
          placeholder='New User Name'
          value={newUsername}
          autoCapitalize='none'
          onChangeText={(newUsername) => setNewUsername(newUsername)}
        />
        <Button
          onPress={handleEditUsername}
          style={{ width: '50%', borderRadius: 20, marginTop: 15 }}
          appearance='outline'
        >
          <Text>Change User Name</Text>
        </Button>

        <View style={styles.container}>
          <Button onPress={() => setVisible(true)}>FAQs</Button>

          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
          >
            <Card disabled={true}>
              <Text category='h1' style={{ padding: 20, marginTop: 50 }}>
                FREQUENTLY ASKED QUESTIONS
              </Text>
              <Text>1.What does the credibility rating mean?</Text>
              <Text>
                Ans: Your credibility rating is a representation of how reliable
                other users found your answers and posts to be
              </Text>
              <Text>2. How can I improve my credibility rating?</Text>
              <Text>
                Ans: We recommend only answering about things you are sure
                about, ensuring that your answers are more likely to help
                people, rather than harm them.
              </Text>
              <Text>3. Can I change my usewname?</Text>
              <Text>
                Ans: Yes! You should be able to find the Edit Username screen at
              </Text>
              <Text>4. Can I change my account email ID?</Text>
              <Text>
                Ans: Yes, you can change your email using the _. You will have
                to verify once again that it is a Purdue email.
              </Text>
              <Button onPress={() => setVisible(false)}>Back</Button>
            </Card>
          </Modal>
        </View>
        <Button style={{ margin: 50 }} onPress={themeContext.toggleTheme}>
          TOGGLE THEME
        </Button>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
  },
  inputBox: {
    width: '85%',
    margin: 0,
    padding: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
