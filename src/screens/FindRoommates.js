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
const MAX_SCORE = 144; // summation of 4n from 1 to 8
const THRESHOLD = 0.3; // determines whether score is good enough for a match

export default (FindRoommates = ({ navigation, route }) => {
	const { currentUser, userProfiles, currentUserProfile } = route.params;
	let profileMatches = [];
	const matchToScoreMap = new Map();

	const calcHeuristic = (userProfiles, currentUserProfile) => {
		for (let i = 0; i < userProfiles; i++) {
			if (userProfiles[i].isSmoker === userProfiles[i].isSmoker) {
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
			if (matchScore < THRESHOLD) {
				profileMatches.push(other);
				matchToScoreMap[other] = matchScore;
			}
		}

		return;
	};

	const RenderMatches = (profileMatches) => {};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Layout style={styles.container} level={'1'}>
				<RenderMatches profileMatches={profileMatches} />
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
