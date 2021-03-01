import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from 'react-native';
import {
  Layout,
  Text,
  Input,
  Button,
  Spinner,
  Icon,
} from '@ui-kitten/components';
import Firebase from '../../config/firebase';

export default register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  //[potential]TODO:
  /*
   * Integrated using email for now, maybe add using username later
   */
  const handleLogin = () => {
    setLoading(true);
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Incorrect Email or Password. Try again.');
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Layout style={styles.container} level={'1'}>
        <Text category='h1' style={{ padding: 20, marginTop: 50 }}>
          Let's Get Started!
        </Text>
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
        <Button
          onPress={handleLogin}
          style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
          appearance='outline'
        >
          {loading === false ? <Text>Login</Text> : <Spinner size='small' />}
        </Button>
        <TouchableOpacity
          style={{ color: 'white', marginTop: 40 }}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text>
            <Text>Do not have an account yet? </Text>
            <Text style={{ textDecorationLine: 'underline' }}>Sign Up</Text>
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
