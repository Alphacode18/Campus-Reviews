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
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath, Icon, Card, Spinner } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import { useScrollToTop } from '@react-navigation/native';
import { render } from 'react-dom';

const types = [ 'Dining', 'On-Campus Facilities', 'Classes', 'Professors' ];
const MAX_SCORE = 576; // summation of 4*4n from 1 to 8
const THRESHOLD = 0.25; // determines whether score is good enough for a match
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export default (FindRoommates = ({ navigation, route }) => {
	const { currentUser, userProfiles, currentUserProfile } = route.params;
	const matchToScoreMap = new Map();
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;

	console.log('in find roommates');

	const calcHeuristic = () => {
		console.log('userProfiles');
		//console.log(userProfiles.length);
		let profileMatches = [];
		for (let i = 0; i < userProfiles.length; i++) {
			console.log('in the loop');
			console.log(currentUserProfile);
			if (userProfiles[i].isSmoker != currentUserProfile.isSmoker) {
				console.log('in the smoker if');
				console.log(userProfiles[i].isSmoker);
				console.log(currentUserProfile.isSmoker);

				continue;
			}
			let other = userProfiles[i];
			let scoreUser = 0;
			let scoreOther = 0;

			scoreUser +=
				Math.abs(currentUserProfile.academicVal[0] - other.academicVal[0]) *
				4 *
				(9 - currentUserProfile.academicVal[1]);
			scoreOther +=
				Math.abs(currentUserProfile.academicVal[0] - other.academicVal[0]) * 4 * (9 - other.academicVal[1]);

			scoreUser +=
				Math.abs(currentUserProfile.bedtimeVal[0] - other.bedtimeVal[0]) *
				4 *
				(9 - currentUserProfile.bedtimeVal[1]);
			scoreOther +=
				Math.abs(currentUserProfile.bedtimeVal[0] - other.bedtimeVal[0]) * 4 * (9 - other.bedtimeVal[1]);

			scoreUser +=
				Math.abs(currentUserProfile.borrowVal[0] - other.borrowVal[0]) *
				4 *
				(9 - currentUserProfile.borrowVal[1]);
			scoreOther += Math.abs(currentUserProfile.borrowVal[0] - other.borrowVal[0]) * 4 * (9 - other.borrowVal[1]);

			scoreUser +=
				Math.abs(currentUserProfile.neatVal[0] - other.neatVal[0]) * 4 * (9 - currentUserProfile.neatVal[1]);
			scoreOther += Math.abs(currentUserProfile.neatVal[0] - other.neatVal[0]) * 4 * (9 - other.neatVal[1]);

			scoreUser +=
				Math.abs(currentUserProfile.noiseVal[0] - other.noiseVal[0]) * 4 * (9 - currentUserProfile.noiseVal[1]);
			scoreOther += Math.abs(currentUserProfile.noiseVal[0] - other.noiseVal[0]) * 4 * (9 - other.noiseVal[1]);

			scoreUser +=
				Math.abs(currentUserProfile.peopleVal[0] - other.peopleVal[0]) *
				4 *
				(9 - currentUserProfile.peopleVal[1]);
			scoreOther += Math.abs(currentUserProfile.peopleVal[0] - other.peopleVal[0]) * 4 * (9 - other.peopleVal[1]);

			scoreUser +=
				Math.abs(currentUserProfile.socialVal[0] - other.socialVal[0]) *
				4 *
				(9 - currentUserProfile.socialVal[1]);
			scoreOther += Math.abs(currentUserProfile.socialVal[0] - other.socialVal[0]) * 4 * (9 - other.socialVal[1]);

			scoreUser +=
				Math.abs(currentUserProfile.videogameVal[0] - other.videogameVal[0]) *
				4 *
				(9 - currentUserProfile.videogameVal[1]);
			scoreOther +=
				Math.abs(currentUserProfile.videogameVal[0] - other.videogameVal[0]) * 4 * (9 - other.videogameVal[1]);

			// Minimize "distance" between individuals. Higher score means worse match.
			let matchScore = (scoreUser + scoreOther) / 2 / MAX_SCORE;
			console.log('matchScore');
			console.log(matchScore);
			if (matchScore <= THRESHOLD) {
				console.log('matchScore');
				console.log(matchScore);
				profileMatches.push(other);
				matchToScoreMap[other] = matchScore;
			}
		}

		return profileMatches;
	};

	const RenderMatches = () => {
		let profileMatches = calcHeuristic();
		console.log('plength');
		console.log(profileMatches.length);

		profileMatches.sort(function(a, b) {
			return matchToScoreMap[b] - matchToScoreMap[a];
		});

		return profileMatches.length > 0 ? (
			<React.Fragment>
				{profileMatches.map(function(profileMatch, i) {
					return (
						<Layout style={styles.container} level={'1'}>
							<Card
								style={{ minWidth: 0.95 * screenWidth }}
								onPress={() => {
									navigation.navigate('ReadRoommateProfile', {
										profileMatch: profileMatch,
										matchToScoreMap: matchToScoreMap
									});
								}}
							>
								<View
									style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}
								>
									<Text>{profileMatch.name}</Text>
									<Text>
										{'Similarity: ' + (100 - Math.floor(100 * matchToScoreMap[profileMatch])) + '%'}
									</Text>
								</View>
								<Text>{profileMatch.email}</Text>
							</Card>
							<Card style={{ minWidth: 0.95 * screenWidth }}>
								<Text>{profileMatch.name}</Text>
								<Text>{profileMatch.email}</Text>
							</Card>
							<Card style={{ minWidth: 0.95 * screenWidth }}>
								<Text>{profileMatch.name}</Text>
								<Text>{profileMatch.email}</Text>
							</Card>
						</Layout>
					);
				})}
			</React.Fragment>
		) : (
			<Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} level={'1'}>
				<React.Fragment>
					<Text>{'NO MATCHES! :('}</Text>
				</React.Fragment>
			</Layout>
		);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Layout style={styles.container} level={'1'}>
				<SafeAreaView>
					<Button
						title="Back"
						appearance={'ghost'}
						size={'large'}
						style={{
							maxHeight: 0.1 * screenHeight,
							marginRight: 0.8 * screenWidth
						}}
						accessoryLeft={BackIcon}
						onPress={() => {
							navigation.navigate('RoommateHome', {
								currentUser: currentUser
							});
						}}
					/>

					<Text
						style={{
							marginTop: 50,
							marginBottom: 20,
							fontSize: 36,
							marginHorizontal: 2
						}}
					>
						{'   '}
						Find Roommates{' '}
					</Text>
					<RenderMatches />
				</SafeAreaView>
			</Layout>
		</TouchableWithoutFeedback>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start'
	}
});
