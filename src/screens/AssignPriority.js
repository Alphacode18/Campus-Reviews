import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	textarea,
	Alert,
	View,
	SafeAreaView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	Layout,
	Text,
	Button,
	Input,
	Select,
	SelectItem,
	IndexPath,
	Icon,
	Radio,
	RadioGroup
} from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';

export default (assignPriority = ({ navigation, route }) => {
	const {
		currentUser,
		currentUserProfile,
		name,
		email,
		year,
		major,
		sex,
		isSmoker,
		bedtimeVal,
		videogameVal,
		academicVal,
		socialVal,
		peopleVal,
		borrowVal,
		noiseVal,
		neatVal,
		para,
		key
	} = route.params;
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;

	let cT1 = '';
	let cT2 = '';
	let cT3 = '';
	let cT4 = '';
	let cT5 = '';
	let cT6 = '';
	let cT7 = '';
	let cT8 = '';

	if (currentUserProfile != null) {
		cT1 = currentUserProfile.priority1;
		cT2 = currentUserProfile.priority2;
		cT3 = currentUserProfile.priority3;
		cT4 = currentUserProfile.priority4;
		cT5 = currentUserProfile.priority5;
		cT6 = currentUserProfile.priority6;
		cT7 = currentUserProfile.priority7;
		cT8 = currentUserProfile.priority8;
	}

	const [ t1, setT1 ] = useState(cT1);
	const [ t2, setT2 ] = useState(cT2);
	const [ t3, setT3 ] = useState(cT3);
	const [ t4, setT4 ] = useState(cT4);
	const [ t5, setT5 ] = useState(cT5);
	const [ t6, setT6 ] = useState(cT6);
	const [ t7, setT7 ] = useState(cT7);
	const [ t8, setT8 ] = useState(cT8);
	const map = new Map();
	const map2 = new Map();
	let currentAlias = currentUser.substr(0, currentUser.indexOf('@'));

	const validate = () => {
		if (
			t1 === '' ||
			t1.length > 1 ||
			t1 < '1' ||
			t1 > '8' ||
			(t2 === '' || t2.length > 1 || t2 < '1' || t2 > '8') ||
			(t3 === '' || t3.length > 1 || t3 < '1' || t3 > '8') ||
			(t4 === '' || t4.length > 1 || t4 < '1' || t4 > '8') ||
			(t5 === '' || t5.length > 1 || t5 < '1' || t5 > '8') ||
			(t6 === '' || t6.length > 1 || t6 < '1' || t6 > '8') ||
			(t7 === '' || t7.length > 1 || t7 < '1' || t7 > '8') ||
			(t8 === '' || t8.length > 1 || t8 < '1' || t8 > '8')
		) {
			return false;
		} else {
			const set = new Set([ t1, t2, t3, t4, t5, t6, t7, t8 ]);
			return set.size === 8;
		}
	};

	const initializeMap = () => {
		map[t1] = 1;
		map[t2] = 2;
		map[t3] = 3;
		map[t4] = 4;
		map[t5] = 5;
		map[t6] = 6;
		map[t7] = 7;
		map[t8] = 8;

		map2[bedtimeVal + 'bedtimeVal'] = '1';
		map2[videogameVal + 'videogameVal'] = '2';
		map2[academicVal + 'academicVal'] = '3';
		map2[socialVal + 'socialVal'] = '4';
		map2[peopleVal + 'peopleVal'] = '5';
		map2[borrowVal + 'borrowVal'] = '6';
		map2[noiseVal + 'noiseVal'] = '7';
		map2[neatVal + 'neatVal'] = '8';
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<Layout style={styles.container} level={'1'}>
				<SafeAreaView>
					<View contentContainerStyle={{ flex: 1, height: screenHeight }}>
						<ScrollView
							contentContainerStyle={{
								flexGrow: 1,
								width: screenWidth,
								alignItems: 'center'
							}}
						>
							<Button status="basic" onPress={() => navigation.navigate('RoommateProfile')}>
								{' '}
								Back{' '}
							</Button>

							<View style={{ justifyContent: 'center', marginTop: 20 }}>
								<Text style={{ fontSize: 16 }}>
									{'Please order the questions you just answered in terms of importance.'}
								</Text>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
								<Input value={t1} placeholder="1" onChangeText={(t1) => setT1(t1)} />
								<Input
									style={{ marginLeft: 5 }}
									value={t2}
									placeholder="2"
									onChangeText={(t2) => setT2(t2)}
								/>
								<Input
									style={{ marginLeft: 5 }}
									value={t3}
									placeholder="3"
									onChangeText={(t3) => setT3(t3)}
								/>
								<Input
									style={{ marginLeft: 5 }}
									value={t4}
									placeholder="4"
									onChangeText={(t4) => setT4(t4)}
								/>
								<Input
									style={{ marginLeft: 5 }}
									value={t5}
									placeholder="5"
									onChangeText={(t5) => setT5(t5)}
								/>
								<Input
									style={{ marginLeft: 5 }}
									value={t6}
									placeholder="6"
									onChangeText={(t6) => setT6(t6)}
								/>
								<Input
									style={{ marginLeft: 5 }}
									value={t7}
									placeholder="7"
									onChangeText={(t7) => setT7(t7)}
								/>
								<Input
									style={{ marginLeft: 5 }}
									value={t8}
									placeholder="8"
									onChangeText={(t8) => setT8(t8)}
								/>
							</View>
							<View style={{ flexDirection: 'row', marginTop: 10 }}>
								<View style={{ justifyContent: 'flex-start' }}>
									<Text>{'Most                                                         Least'}</Text>
								</View>
							</View>
							<View style={{ marginTop: 10, alignItems: 'center' }}>
								<Button
									appearance="outline"
									onPress={() => {
										if (validate() == true) {
											initializeMap();
											console.log(email);
											if (currentUserProfile != null) {
												Firebase.database()
													.ref('/Roommate Profile/' + currentAlias + '/')
													.remove();
											}
											Firebase.database().ref('/Roommate Profile/' + currentAlias + '/').push({
												name: name,
												email: email,
												year: year,
												major: major,
												sex: sex,
												isSmoker: isSmoker,
												bedtimeVal: [ bedtimeVal, map[map2[bedtimeVal + 'bedtimeVal']] ],
												videogameVal: [
													videogameVal,
													map[map2[videogameVal + 'videogameVal']]
												],
												academicVal: [ academicVal, map[map2[academicVal + 'academicVal']] ],
												socialVal: [ socialVal, map[map2[socialVal + 'socialVal']] ],
												peopleVal: [ peopleVal, map[map2[peopleVal + 'peopleVal']] ],
												borrowVal: [ borrowVal, map[map2[borrowVal + 'borrowVal']] ],
												noiseVal: [ noiseVal, map[map2[noiseVal + 'noiseVal']] ],
												neatVal: [ neatVal, map[map2[neatVal + 'neatVal']] ],
												para: para,
												priority1: t1,
												priority2: t2,
												priority3: t3,
												priority4: t4,
												priority5: t5,
												priority6: t6,
												priority7: t7,
												priority8: t8
											});

											navigation.navigate('RoommateHome', {});
										} else {
											Alert.alert('Please fill in all fields with unique numbers from 1-8.');
										}
									}}
								>
									{' '}
									Done{' '}
								</Button>
							</View>
							<Text>_______________________________________</Text>
							<View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
								<Text>{'Question 1:     '}</Text>
								<Text style={{ marginTop: 0 }}>{'How early do you go to bed?'}</Text>
							</View>
							<Text>_______________________________________</Text>
							<View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
								<Text>{'Question 2:   '}</Text>
								<Text style={{ marginTop: 5 }}>
									{'How much time a day do you \nspend on videogames?'}
								</Text>
							</View>
							<Text>_______________________________________</Text>
							<View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
								<Text>{'Question 3:   '}</Text>
								<Text style={{ marginTop: 5 }}>{'How academically inclined     \nare you?'}</Text>
							</View>
							<Text>_______________________________________</Text>
							<View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
								<Text>{'  Question 4:   '}</Text>
								<Text style={{ marginTop: 0 }}>{'How socially inclined are you?'}</Text>
							</View>
							<Text>_______________________________________</Text>
							<View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
								<Text>{'Question 5:   '}</Text>
								<Text style={{ marginTop: 5 }}>
									{'How often will you bring         \npeople over?'}
								</Text>
							</View>
							<Text>_______________________________________</Text>
							<View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
								<Text>{'Question 6:   '}</Text>
								<Text style={{ marginTop: 5 }}>
									{'How often will you need to \nborrow items from your            \nroommate?'}
								</Text>
							</View>
							<Text>_______________________________________</Text>
							<View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
								<Text>{'Question 7:   '}</Text>
								<Text style={{ marginTop: 5 }}>{'What is your noise tolerance   \nlevel?'}</Text>
							</View>
							<Text>_______________________________________</Text>
							<View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
								<Text>{'Question 8:   '}</Text>
								<Text style={{ marginTop: 0 }}>{'How neat are you?                     '}</Text>
							</View>
							<Text>_______________________________________</Text>
						</ScrollView>
					</View>
				</SafeAreaView>
			</Layout>
		</KeyboardAvoidingView>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputBox: {
		width: '90%',
		margin: 0,
		padding: 15,
		fontSize: 16,
		textAlign: 'center'
	}
});
