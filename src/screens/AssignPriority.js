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
		para
	} = route.params;
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;
	const [ t1, setT1 ] = useState('');
	const [ t2, setT2 ] = useState('');
	const [ t3, setT3 ] = useState('');
	const [ t4, setT4 ] = useState('');
	const [ t5, setT5 ] = useState('');
	const [ t6, setT6 ] = useState('');
	const [ t7, setT7 ] = useState('');
	const [ t8, setT8 ] = useState('');

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
							<View style={{ justifyContent: 'center' }}>
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
								<Button appearance="outline"> Done </Button>
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
