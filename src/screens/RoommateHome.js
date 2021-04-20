import React, { useState, ReactDOM, useReducer } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	View,
	TouchableOpacity,
	Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath, Icon, Card, Spinner } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import { useScrollToTop } from '@react-navigation/native';
import { render } from 'react-dom';

const types = [ 'Dining', 'On-Campus Facilities', 'Classes', 'Professors' ];
let profileKeys = [];
let profileNames = [];
let userProfiles = [];
let currentUserProfile = null;

export default (roommateHome = ({ navigation, route }) => {
	const currentUser = route.params.currentUser;
	let currentAlias = currentUser.substr(0, currentUser.indexOf('@'));
	const [ profiles, setProfiles ] = useState([]);
	const ref = Firebase.database().ref('/Roommate Profile');

	useEffect(() => {
		ref.on('value', (snapshot) => {
			let n = profiles.length;
			for (let i = 0; i < n; i++) {
				profiles.pop();
			}
			snapshot.forEach(function(data) {
				if (data.key === currentAlias) {
					currentUserProfile = data.toJSON();
				} else {
					profileNames.push(data.key);
					setProfiles((profiles) => [ ...profiles, data.toJSON() ]);
				}
			});

			ref.off();
		});
	}, []);

	for (let i = 0; i < profiles.length; i++) {
		for (let key in profiles[i]) {
			profileKeys[i] = key;
		}
	}

	for (let i = 0; i < profiles.length; i++) {
		let temp = profiles[i];
		let temp2 = profileKeys[i];
		userProfiles[i] = temp[temp2];
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Layout style={styles.container} level={'1'}>
				<Button
					onPress={() => {
						navigation.navigate('RoommateProfile', {
							currentUser: currentUser
						});
					}}
				>
					{' '}
					Profile{' '}
				</Button>
				<Button
					style={{ marginTop: 20 }}
					onPress={() => {
						if (currentUser != null) {
							navigation.navigate('FindRoommates', {
								currentUser: currentUser,
								userProfiles: userProfiles,
								currentUserProfile: currentUserProfile
							});
						} else {
							Alert.alert('Please make a profile first so we can match you.');
						}
					}}
				>
					{' '}
					Find Roommates{' '}
				</Button>
			</Layout>
		</TouchableWithoutFeedback>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
