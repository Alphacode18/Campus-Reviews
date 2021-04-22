import React, { useState, useEffect, ReactDOM, useReducer } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	View,
	TouchableOpacity,
	Alert,
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
	RadioGroup,
	Card
} from '@ui-kitten/components';
import Slider from '@react-native-community/slider';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import { useScrollToTop } from '@react-navigation/native';
import { render } from 'react-dom';

const questions = [
	[ 'Before 11pm', '11pm-12am', '12am-1am', '1am-2am', 'After 2am' ],
	[ 'None', '0-1hr', '1-3hrs', '3-5hrs', 'Over 5hrs' ],
	[ 'Not at all', '0-1hr', '1-3hrs', '3-5hrs', 'Primary focus' ],
	[ 'Not at all', '0-1hr', '1-3hrs', '3-5hrs', 'Primary focus' ],
	[ 'Never', 'Rarely', 'Sometimes', 'Often', 'Very Often' ],
	[ 'Absolute silence', 'Quiet', 'A bit of noise', 'Loud', 'Very Loud' ],
	[ 'Very messy', 'Slightly messy', 'In the middle', 'Slightly neat', 'Very neat' ]
];

const Header = ({ props, profileMatch, matchToScoreMap }) => {
	return (
		<View style={{ marginLeft: 10, marginBottom: 10 }}>
			<Text style={{ marginTop: 10 }}>{'Name: ' + profileMatch.name}</Text>
			<Text style={{ marginTop: 10 }}>{'Email: ' + profileMatch.email}</Text>
			<Text style={{ marginTop: 10 }}>{profileMatch.year + ' ' + profileMatch.major}</Text>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
				<Text style={{ marginTop: 10 }}>{profileMatch.sex}</Text>
				<Text style={{ marginTop: 10 }}>
					{'Similarity: ' + (100 - Math.floor(100 * matchToScoreMap[profileMatch])) + '%'}
				</Text>
			</View>
		</View>
	);
};

export default (readRoommateProfile = ({ route, navigation }) => {
	const { profileMatch, matchToScoreMap } = route.params;
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;
	const [ bedtimeVal, setbedtimeVal ] = useState(profileMatch.bedtimeVal[0]);
	const [ videogameVal, setvideogameVal ] = useState(profileMatch.videogameVal[0]);
	const [ academicVal, setacademicVal ] = useState(profileMatch.academicVal[0]);
	const [ socialVal, setsocialVal ] = useState(profileMatch.socialVal[0]);
	const [ peopleVal, setpeopleVal ] = useState(profileMatch.peopleVal[0]);
	const [ borrowVal, setborrowVal ] = useState(profileMatch.borrowVal[0]);
	const [ noiseVal, setnoiseVal ] = useState(profileMatch.noiseVal[0]);
	const [ neatVal, setneatVal ] = useState(profileMatch.neatVal[0]);
	const [ para, setPara ] = useState(profileMatch.para);

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
							<Card
								style={{ minWidth: 0.95 * screenWidth }}
								header={(props) => (
									<Header {...props} profileMatch={profileMatch} matchToScoreMap={matchToScoreMap} />
								)}
							>
								<View
									style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}
								/>
								<View style={{ marginBottom: 10, alignItems: 'center' }}>
									<Text style={{ marginTop: 5 }}>{'How early do you go to bed?'}</Text>
									<Text style={{ marginTop: 5 }}>{questions[0][bedtimeVal]}</Text>
									<Slider
										disabled
										style={{ width: 200, height: 40 }}
										minimumValue={0}
										maximumValue={4}
										step={1}
										value={bedtimeVal}
										onValueChange={(bedtimeVal) => setbedtimeVal(bedtimeVal)}
										minimumTrackTintColor="#000000"
										maximumTrackTintColor="#000000"
									/>
								</View>
								<View style={{ marginBottom: 10, alignItems: 'center' }}>
									<Text style={{ marginTop: 5 }}>
										{'How much time a day do you spend on \n\t\t\t\tvideogames?'}
									</Text>
									<Text style={{ marginTop: 5 }}>{questions[1][videogameVal]}</Text>
									<Slider
										disabled
										style={{ width: 200, height: 40 }}
										minimumValue={0}
										maximumValue={4}
										step={1}
										value={videogameVal}
										onValueChange={(videogameVal) => setvideogameVal(videogameVal)}
										minimumTrackTintColor="#000000"
										maximumTrackTintColor="#000000"
									/>
								</View>
								<View style={{ marginBottom: 10, alignItems: 'center' }}>
									<Text style={{ marginTop: 5 }}>{'How academically inclined are you?'}</Text>
									<Text style={{ marginTop: 5 }}>{questions[2][academicVal]}</Text>
									<Slider
										disabled
										style={{ width: 200, height: 40 }}
										minimumValue={0}
										maximumValue={4}
										step={1}
										value={academicVal}
										onValueChange={(academicVal) => setacademicVal(academicVal)}
										minimumTrackTintColor="#000000"
										maximumTrackTintColor="#000000"
									/>
								</View>
								<View style={{ marginBottom: 10, alignItems: 'center' }}>
									<Text style={{ marginTop: 5 }}>{'How socially inclined are you?'}</Text>
									<Text style={{ marginTop: 5 }}>{questions[3][socialVal]}</Text>
									<Slider
										disabled
										style={{ width: 200, height: 40 }}
										minimumValue={0}
										maximumValue={4}
										step={1}
										value={socialVal}
										onValueChange={(socialVal) => setsocialVal(socialVal)}
										minimumTrackTintColor="#000000"
										maximumTrackTintColor="#000000"
									/>
								</View>
								<View style={{ marginBottom: 10, alignItems: 'center' }}>
									<Text style={{ marginTop: 5 }}>{'How often will you bring people over?'}</Text>
									<Text style={{ marginTop: 5 }}>{questions[4][peopleVal]}</Text>
									<Slider
										disabled
										style={{ width: 200, height: 40 }}
										minimumValue={0}
										maximumValue={4}
										step={1}
										value={peopleVal}
										onValueChange={(peopleVal) => setpeopleVal(peopleVal)}
										minimumTrackTintColor="#000000"
										maximumTrackTintColor="#000000"
									/>
								</View>
								<View style={{ marginBottom: 10, alignItems: 'center' }}>
									<Text style={{ marginTop: 5 }}>
										{'How often will you need to borrow items \n\t\t\tfrom your roommate?'}
									</Text>
									<Text style={{ marginTop: 5 }}>{questions[4][borrowVal]}</Text>
									<Slider
										disabled
										style={{ width: 200, height: 40 }}
										minimumValue={0}
										maximumValue={4}
										step={1}
										value={borrowVal}
										onValueChange={(borrowVal) => setborrowVal(borrowVal)}
										minimumTrackTintColor="#000000"
										maximumTrackTintColor="#000000"
									/>
								</View>
								<View style={{ marginBottom: 10, alignItems: 'center' }}>
									<Text style={{ marginTop: 5 }}>{'What is your noise tolerance level?'}</Text>
									<Text style={{ marginTop: 5 }}>{questions[5][noiseVal]}</Text>
									<Slider
										disabled
										style={{ width: 200, height: 40 }}
										minimumValue={0}
										maximumValue={4}
										step={1}
										value={noiseVal}
										onValueChange={(noiseVal) => setnoiseVal(noiseVal)}
										minimumTrackTintColor="#000000"
										maximumTrackTintColor="#000000"
									/>
								</View>
								<View style={{ marginBottom: 10, alignItems: 'center' }}>
									<Text style={{ marginTop: 5 }}>{'How neat are you?'}</Text>
									<Text style={{ marginTop: 5 }}>{questions[6][neatVal]}</Text>
									<Slider
										disabled
										style={{ width: 200, height: 40 }}
										minimumValue={0}
										maximumValue={4}
										step={1}
										value={neatVal}
										onValueChange={(neatVal) => setneatVal(neatVal)}
										minimumTrackTintColor="#000000"
										maximumTrackTintColor="#000000"
									/>
								</View>
								<View style={{ marginBottom: 10, alignItems: 'center' }}>
									<Text style={{ marginBottom: 10 }}> {'About Me'}</Text>
									<Text style={{ marginBottom: 10 }}> {para}</Text>
								</View>
							</Card>
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
	}
});
