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
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath, Icon, Radio } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions, } from 'react-native';
import Slider from '@react-native-community/slider';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';

const types = [ 'Dining', 'On-Campus Facilities', 'Classes', 'Professors' ];
const academicYears = [ 'Freshman', 'Sophomore', 'Junior', 'Senior' ];

const questions = [
					['Before 11pm', '11pm-12am', '12am-1am', '1am-2am', 'After 2am' ],
					['None', '0-1hr', '1-3hrs', '3-5hrs', 'Over 5hrs' ],
					['Not at all', '0-1hr', '1-3hrs', '3-5hrs', 'Primary focus' ],
					['Not at all', '0-1hr', '1-3hrs', '3-5hrs', 'Primary focus' ],
					['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often' ],
					['Absolute silence', 'Quiet', 'A bit of noise', 'Loud', 'Very Loud' ],
					['Very messy', 'Slightly messy', 'In the middle', 'Slightly neat', 'Very neat' ],

				  ];

const ExitIcon = (props) => <Icon {...props} name="close-outline" />;

export default (roommateProfile = ({ navigation, route }) => {
	console.log('roommate profile');
	const currentUser = route.params.currentUser;
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ major, setMajor ] = useState('');
	const [ selectedIndex, setSelectedIndex ] = useState(new IndexPath(0));
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;
	const displayValue = academicYears[selectedIndex.row];
	const [bedtimeVal, setbedtimeVal] = useState(0);
	const [videogameVal, setvideogameVal] = useState(0);
	const [academicVal, setacademicVal] = useState(0);
	const [socialVal, setsocialVal] = useState(0);
	const [peopleVal, setpeopleVal] = useState(0);
	const [borrowVal, setborrowVal] = useState(0);
	const [noiseVal, setnoiseVal] = useState(0);
	const [neatVal, setneatVal] = useState(0);
	const [checked, setChecked] = React.useState(false);
	const today = new Date();
	const time = today.getTime();

	const changeAcademicYearSelection = (selectedIndex) => {
		console.log('selectedIndex');
		console.log(selectedIndex);
		setSelectedIndex(selectedIndex);
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<SafeAreaView>
					<Layout style={styles.container} level={'1'}>
						{/* <Button accessoryCenter={ExitIcon} style={{color: 'white', borderColor: 'white', position: 'absolute', top:'7%', left: '70%' }} onPress={() => navigation.navigate('Home')}> </Button>  */}

						<ScrollView
							contentContainerStyle={{
								flexGrow: 1,
								width: screenWidth,
								alignItems: 'center'
							}}
						>
							<Text
								style={{
									marginTop: 30,
									marginBottom: 20,
									fontSize: 36,
									marginHorizontal: 2
								}}
							>
								{' '}
								{'Roommate Profile'}{' '}
							</Text>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginBottom: 10,
									marginTop: 10
								}}
							>
								<Text style={{ marginTop: 5 }}>{'Name: '} </Text>
								<Input
									style={{ flex: 0.9 }}
									size="medium"
									placeholder="Name"
									value={name}
									onChangeText={(name) => setName(name)}
								/>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
								<Text style={{ marginTop: 5 }}>{'Email:  '} </Text>
								<Input
									style={{ flex: 0.9 }}
									size="medium"
									placeholder="Email"
									value={email}
									onChangeText={(email) => setEmail(email)}
								/>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
								<Text style={{ marginTop: 5 }}>{'Year:     '}</Text>
								<Select
									placeholder="Default"
									selectedIndex={selectedIndex}
									value={displayValue}
									style={{ flex: 0.9 }}
									onSelect={changeAcademicYearSelection}
								>
									<SelectItem title="Freshman" />
									<SelectItem title="Sophomore" />
									<SelectItem title="Junior" />
									<SelectItem title="Senior" />
								</Select>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
								<Text style={{ marginTop: 5 }}>{'Major:   '}</Text>
								<Input
									style={{ flex: 0.9 }}
									size="medium"
									placeholder="Major"
									value={major}
									onChangeText={(major) => setMajor(major)}
								/>
							</View>
							<View style={{ marginBottom: 10, alignItems: 'center' }}>
								<Text style={{ marginTop: 5 }}>{'How early do you go to bed?'}</Text>
								<Text style={{ marginTop: 5 }}>{questions[0][bedtimeVal]}</Text>
								<Slider
									style={{width: 200, height: 40}}
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
								<Text style={{ marginTop: 5 }}>{'How much time a day do you spend on videogames?'}</Text>
								<Text style={{ marginTop: 5 }}>{questions[1][videogameVal]}</Text>
								<Slider
									style={{width: 200, height: 40}}
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
									style={{width: 200, height: 40}}
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
									style={{width: 200, height: 40}}
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
									style={{width: 200, height: 40}}
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
								<Text style={{ marginTop: 5 }}>{'How often will you need to borrow items from your roommate?'}</Text>
								<Text style={{ marginTop: 5 }}>{questions[4][borrowVal]}</Text>
								<Slider
									style={{width: 200, height: 40}}
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
								<Text style={{ marginTop: 5 }}>{'What is your noise tolerance level'}</Text>
								<Text style={{ marginTop: 5 }}>{questions[5][noiseVal]}</Text>
								<Slider
									style={{width: 200, height: 40}}
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
								<Text style={{ marginTop: 5 }}>{'How neat are you'}</Text>
								<Text style={{ marginTop: 5 }}>{questions[6][neatVal]}</Text>
								<Slider
									style={{width: 200, height: 40}}
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
								<Text style={{ marginTop: 5 }}>{'Are you a smoker?'}</Text>
								<Radio
									checked={checked}
									onChange={nextChecked => setChecked(nextChecked)}>
									{'Click if true'}
								</Radio>
							</View>
							<Button>
                             Submit
                        	</Button>
						</ScrollView>
					</Layout>
				</SafeAreaView>
			</TouchableWithoutFeedback>
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
