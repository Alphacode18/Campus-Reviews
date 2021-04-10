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
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath, Icon } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';

const types = [ 'Dining', 'On-Campus Facilities', 'Classes', 'Professors' ];
const academicYears = [ 'Freshman', 'Sophomore', 'Junior', 'Senior' ];

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
