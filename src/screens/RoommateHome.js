import React, { useState, ReactDOM, useReducer, useEffect, useFocusEffect } from 'react';
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
import { useScrollToTop, useIsFocused } from '@react-navigation/native';
import { render } from 'react-dom';

const types = [ 'Dining', 'On-Campus Facilities', 'Classes', 'Professors' ];
let profileKeys = [];
let profileNames = [];
let userProfiles = [];

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export default (roommateHome = ({ navigation, route }) => {
	let isFocused = useIsFocused();
	const currentUser = route.params.currentUser;
	const postType = route.params.postType;
	console.log('Roommate Home post type');
	console.log(postType);
	const [ currentUserProfile, setCurrentUserProfile ] = useState(null);
	let currentAlias = currentUser.substr(0, currentUser.indexOf('@'));
	const [ profiles, setProfiles ] = useState([]);
	const ref = Firebase.database().ref('/Roommate Profile');
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;
	console.log('home roommate');

	useEffect(
		() => {
			console.log('use Effect');
			ref.on('value', (snapshot) => {
				let n = profiles.length;
				for (let i = 0; i < n; i++) {
					profiles.pop();
				}
				snapshot.forEach(function(data) {
					if (data.key === currentAlias) {
						setCurrentUserProfile(data.toJSON());
					} else {
						profileNames.push(data.key);
						setProfiles((profiles) => [ ...profiles, data.toJSON() ]);
					}
				});

				// console.log('done with effect');
				// console.log(profiles);
				// console.log(currentUserProfile);

				ref.off();
			});
		},
		[ isFocused ]
	);

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
			<Layout style={{ flex: 1 }} level={'1'}>
				<Button
					title="Back"
					appearance={'ghost'}
					size={'large'}
					style={{
						justifyContent: 'left',
						marginLeft: 0.02 * screenWidth,
						marginTop: 0.05 * screenHeight,
						maxWidth: 0.2 * screenWidth,
						maxHeight: 0.1 * screenHeight,
						marginRight: 0.8 * screenWidth
					}}
					accessoryLeft={BackIcon}
					onPress={() => {
						navigation.navigate('Show' + postType);
					}}
				/>
				<View style={styles.container}>
					<Button
						onPress={() => {
							console.log('press');
							console.log(userProfiles);
							console.log(currentUserProfile);
							if (currentUserProfile == null) {
								navigation.navigate('RoommateProfile', {
									currentUser: currentUser
								});
							} else {
								let cKey = '';
								console.log('else');
								let navProfile = null;
								for (let key in currentUserProfile) {
									console.log('key');
									console.log(key);
									cKey = key;
									console.log(currentUserProfile[key]);
									navProfile = currentUserProfile[key];
								}
								navigation.navigate('RoommateProfile', {
									currentUser: currentUser,
									currentUserProfile: navProfile,
									key: cKey
								});
							}
						}}
					>
						{' '}
						Profile{' '}
					</Button>
					<Button
						style={{ marginTop: 20 }}
						onPress={() => {
							//console.log("userProfiles");
							//console.log(currentUserProfile.isSmoker);
							let navProfile = null;
							if (currentUserProfile != null) {
								for (let key in currentUserProfile) {
									console.log('key');
									console.log(key);
									console.log(currentUserProfile[key]);
									navProfile = currentUserProfile[key];
								}

								navigation.navigate('FindRoommates', {
									currentUser: currentUser,
									userProfiles: userProfiles,
									currentUserProfile: navProfile
								});
							} else {
								Alert.alert('Please make a profile first so we can match you.');
							}
						}}
					>
						{' '}
						Find Roommates{' '}
					</Button>
				</View>
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
