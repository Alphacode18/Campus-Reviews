import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	Alert,
	EdgeInsetsPropType
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	Layout,
	Text,
	Button,
	Card,
	Divider,
	Input,
	Select,
	SelectItem,
	IndexPath,
	TopNavigation,
	TopNavigationAction,
	Icon
} from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions, View } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';

const admins = new Set();
const types = [ 'Dining', 'On-Campus Facilities', 'Classes', 'Professors' ];

const editIcon = (props) => <Icon {...props} name="edit-outline" />;

const trashIcon = (props) => <Icon {...props} name="trash-2" />;

const checkIcon = (props) => <Icon {...props} name="checkmark-outline" />;

const initializeAdmins = () => {
	admins.add('rrajash@purdue.edu');
	admins.add('seela@purdue.edu');
};

export default (CommentBody = ({
	commentText,
	postId,
	commentID,
	index,
	navigation,
	title,
	user,
	post,
	currentUser,
	i,
	upvoteSet,
	downvoteSet,
	posts,
	postIDs,
	commentUser
}) => {
	initializeAdmins();
	const [ editCommentText, setEditCommentText ] = useState(commentText);
	const [ editing, setEditing ] = useState(false);
	const [ deleting, setDeleting ] = useState(false);
	const screenWidth = Dimensions.get('window').width;
	console.log('users');
	console.log(commentUser);
	console.log(currentUser);

	return editing ? (
		<React.Fragment>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
				<Input
					multiline={true}
					textStyle={{
						minHeight: 32,
						maxHeight: 128,
						minWidth: 0.8 * screenWidth,
						maxWidth: 0.8 * screenWidth
					}}
					placeholder="Enter text here..."
					value={editCommentText}
					onChangeText={setEditCommentText}
				/>
				<Button
					size="medium"
					appearance={commentUser != currentUser ? 'ghost' : 'ghost'}
					accessoryLeft={commentUser == currentUser ? checkIcon : null}
					onPress={() => {
						if (currentUser == commentUser) {
							if (!(editCommentText === '')) {
								setEditing(false);
								const today = new Date();
								const datetime = today.getTime();
								let updates = {};
								updates[
									'/' +
										types[index] +
										' Posts/' +
										postId +
										'/Comments/' +
										commentID +
										'/' +
										'commentText'
								] = editCommentText;
								updates[
									'/' + types[index] + ' Posts/' + postId + '/Comments/' + commentID + '/' + 'edited'
								] = true;
								updates[
									'/' +
										types[index] +
										' Posts/' +
										postId +
										'/Comments/' +
										commentID +
										'/' +
										'editTimestamp'
								] = datetime;
								Firebase.database().ref().update(updates);
								posts[i].commentText = editCommentText;

								navigation.navigate('NewLoading', {
									title: title,
									post: post,
									postId: postId,
									user: user,
									index: index,
									currentUser: currentUser,
									i: i,
									upvoteSet: upvoteSet,
									downvoteSet: downvoteSet,
									posts: posts,
									postIDs: postIDs
								});
								setEditing(false);
							} else {
								Alert.alert('Please add text to your comment!');
							}
						}
					}}
				>
					{' '}
					Done{' '}
				</Button>
			</View>
		</React.Fragment>
	) : (
		<React.Fragment>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
				<Text style={{ marginLeft: 16, marginBottom: 8 }}>{commentText}</Text>
				<Button
					style={styles.footerControl}
					size="medium"
					appearance={commentUser != currentUser ? 'ghost' : 'ghost'}
					accessoryLeft={commentUser == currentUser ? editIcon : null}
					onPress={() => {
						if (currentUser == commentUser) setEditing(true);
					}}
				/>

				<Button
					size="medium"
					appearance={commentUser != currentUser && !admins.has(currentUser) ? 'ghost' : 'ghost'}
					accessoryLeft={commentUser == currentUser || admins.has(currentUser) ? trashIcon : null}
					onPress={() => {
						if (commentUser == currentUser || admins.has(currentUser)) {
							Alert.alert(
								'Confirm Deletion',
								'Are you sure you want to delete this Comment?',
								[
									{
										text: 'Cancel',
										onPress: () => console.log('Cancel Pressed'),
										style: 'cancel'
									},
									{
										text: 'Delete',
										onPress: () => {
											Firebase.database()
												.ref(types[index] + ' Posts/' + postId + '/Comments/' + commentID)
												.remove();
											navigation.navigate('NewLoading', {
												title: title,
												post: post,
												postId: postId,
												user: user,
												index: index,
												currentUser: currentUser,
												i: i,
												upvoteSet: upvoteSet,
												downvoteSet: downvoteSet,
												posts: posts,
												postIDs: postIDs
											});
											// setDeleting(!deleting);
										}
									}
								],
								{ cancelable: false }
							);
						}
					}}
				/>
			</View>
		</React.Fragment>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	review: {
		margin: 4,
		textAlign: 'center'
	},
	controlContainer: {
		borderRadius: 4,
		margin: 4,
		padding: 4,
		width: '20%',
		backgroundColor: '#3366FF'
	},
	commentLeft: {
		margin: 8
	},
	commentRight: {
		margin: 8
	}
});
