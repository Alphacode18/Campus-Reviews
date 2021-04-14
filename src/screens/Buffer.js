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

export default (buffer = (props) => {
	console.log('Buffer Index');
	console.log(props.route.params);
	console.log(props.route.params.index);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Layout style={styles.container} level={'1'}>
				<Button
					onPress={() => {
						props.navigation.navigate('ShowReviews', {
							index: props.route.params.index
						});
					}}
				>
					{' '}
					Reviews{' '}
				</Button>
				<Button
					style={{ marginTop: 20 }}
					onPress={() => {
						props.navigation.navigate('ShowPosts', {
							index: props.route.params.index
						});
					}}
				>
					{' '}
					Posts{' '}
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
