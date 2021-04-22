import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from 'react-native';
import Constants from 'expo-constants';
const { manifest } = Constants;
import {
  Layout,
  Text,
  Input,
  Button,
  Spinner,
  Icon,
} from '@ui-kitten/components';
import Firebase from '../../config/firebase';
import axios from 'axios';

export default register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const AlertIcon = (props) => <Icon {...props} name='alert-circle-outline' />;

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  //TODO
  /*
   * Read Through Firebase Docs & firebase.config before implementation
   */
  const handleRegistrations = async () => {
    const uri = `http://${manifest.debuggerHost
      .split(':')
      .shift()}:3000/${email}`;
    setLoading(true);
    if (username.length > 30) {
      setLoading(false);
      Alert.alert('Username longer than expected');
    } else if (password === confirmPassword) {
      const res = await axios.get(uri);
      const data = res.data;
      console.log('Validation Successful?', data['isValid']);
      if (res.data['isValid']) {
        Firebase.auth()
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            console.log(user['user']['uid']);
            const store = {
              uid: user['user']['uid'],
              username: username,
            };
            db.collection('users').doc(user['user']['uid']).set(store);
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert('Invalid Email or Incomplete Details'); //TODO: Alert text may need to be updated.
          });
      } else {
        setLoading(false);
        Alert.alert(
          "We couldn't validate your purdue identity. Please try again"
        );
      }
    } else {
      setLoading(false);
      Alert.alert('Passwords Do Not Match');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Layout style={styles.container} level={'1'}>
        <Text category='h1' style={{ padding: 20, marginTop: 50 }}>
          Welcome To Campus Reviews!
        </Text>
        <Input
          style={styles.inputBox}
          value={username}
          placeholder='Username (30 characters or less)' /* TODO: check for uniqueness, [possible TODO]: suggestions for username (based on email id?)  */
          onChangeText={(username) => setUsername(username)}
        />
        <Input
          style={styles.inputBox}
          placeholder='Email'
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <Input
          style={styles.inputBox}
          value={password}
          placeholder='Password'
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={(password) => setPassword(password)}
        />
        <Input
          style={styles.inputBox}
          value={confirmPassword}
          placeholder='Confirm Password'
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }
        />
        <Button
          onPress={handleRegistrations}
          style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
          appearance='outline'
        >
          {loading === false ? <Text>Sign Up</Text> : <Spinner size='small' />}
        </Button>
        <TouchableOpacity
          style={{ color: 'white', marginTop: 40 }}
          onPress={() => navigation.navigate('Login')}
        >
          <Text>
            <Text>Already have an account? </Text>
            <Text style={{ textDecorationLine: 'underline' }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </Layout>
    </TouchableWithoutFeedback>
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
});
