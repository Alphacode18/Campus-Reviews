import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Alert,
	Keyboard,
	ScrollView,
	Dimensions,
	View
} from 'react-native';
import Constants from 'expo-constants';
const { manifest } = Constants;
import { Layout, Text, Input, Button, Spinner, Icon, Popover, Modal, CheckBox } from '@ui-kitten/components';
import Firebase, { db } from '../../config/firebase';
import axios from 'axios';
import TandC from './TandC.js';

export default (register = ({ navigation }) => {
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ secureTextEntry, setSecureTextEntry ] = useState(true);
	const [ loading, setLoading ] = useState(false);
	const [ visible, setVisible ] = React.useState(false);
	const [ checked, setChecked ] = React.useState(false);
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;

	const renderToggleButton = () => <Button onPress={() => setVisible(true)}>Terms and Conditions</Button>;

	const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

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
	const handleTC = () => {
		console.log('handleTC');
		console.log(checked);
		if (checked == false) {
			Alert.alert('Please agree to Terms and Conditions.');
		} else {
			handleRegistrations();
		}
	};

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
        const response = await Firebase.auth().createUserWithEmailAndPassword(
          email,
          password
        );
        setLoading(false);
        console.log(response);
        if (response.user.uid) {
          const user = {
            uid: response.user.uid,
            username: username,
          };
          db.collection('users').doc(response.user.uid).set(user);
        }
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
				<View contentContainerStyle={{ flex: 1, height: screenHeight }}>
					<ScrollView
						contentContainerStyle={{
							flexGrow: 1,
							width: screenWidth,
							alignItems: 'center'
						}}
					>
						<Text category="h1" style={{ padding: 20, marginTop: 50 }}>
							Welcome To Campus Reviews!
						</Text>
						<Input
							style={styles.inputBox}
							value={username}
							placeholder="Username (30 characters or less)" /* TODO: check for uniqueness, [possible TODO]: suggestions for username (based on email id?)  */
							onChangeText={(username) => setUsername(username)}
						/>
						<Input
							style={styles.inputBox}
							placeholder="Email"
							value={email}
							onChangeText={(email) => setEmail(email)}
						/>
						<Input
							style={styles.inputBox}
							value={password}
							placeholder="Password"
							accessoryRight={renderIcon}
							secureTextEntry={secureTextEntry}
							onChangeText={(password) => setPassword(password)}
						/>
						<Input
							style={styles.inputBox}
							value={confirmPassword}
							placeholder="Confirm Password"
							accessoryRight={renderIcon}
							secureTextEntry={secureTextEntry}
							onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
						/>
						<Modal
							style={{ maxHeight: 0.8 * screenHeight, minWidth: screenWidth }}
							backdropStyle={styles.backdrop}
							visible={visible}
							onBackdropPress={() => setVisible(false)}
						>
							<Layout>
								<TandC />
							</Layout>
						</Modal>

						<View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
							<CheckBox checked={checked} onChange={(nextChecked) => setChecked(nextChecked)} />
							<Text> {' I agree to the '}</Text>
							<TouchableOpacity onPress={() => setVisible(true)}>
								<Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
									Terms and Conditions
								</Text>
							</TouchableOpacity>
						</View>

						<Button
							onPress={handleTC}
							style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
							appearance="outline"
						>
							{loading === false ? <Text>Sign Up</Text> : <Spinner size="small" />}
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
					</ScrollView>
				</View>
			</Layout>
		</TouchableWithoutFeedback>
	);
});

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
		textAlign: 'center'
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 4,
		paddingVertical: 8
	},
	avatar: {
		marginHorizontal: 4
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	}
});
