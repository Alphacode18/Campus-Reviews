import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	textarea,
	RecyclerViewBackedScrollViewComponent
} from 'react-native';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
//import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions, View } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';

const types = [ 'Dining', 'On-Campus Facilities', 'Classes', 'Professors' ];

const rateVal = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ];

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const plusIcon = (props) => <Icon {...props} name="plus" />;

const checkIcon = (props) => <Icon {...props} name="checkmark-outline" />;

const trashIcon = (props) => <Icon {...props} name="trash-2" />;

const editIcon = (props) => <Icon {...props} name="edit-outline" />;

const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

const Header = ({ props, title, user, date, rate }) => (
	<View
		style={{
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: '5%',
			marginBottom: '5%',
			justifyContent: 'space-between',
			marginHorizontal: '5%'
		}}
	>
		<View style={styles.controlContainer}>
			<Text style={styles.review} status="control">
				Review
			</Text>
		</View>
		<Text category="s1" style={styles.text}>
			{' '}
			{title}{' '}
		</Text>
		<Text category="h5" style={styles.text} status="success">
			{' '}
			({rate}/10)
		</Text>
	</View>
);

const Footer = ({
	navigation,
	props,
	title,
	user,
	rate,
	text,
	review_id,
	upvoteSet,
	downvoteSet,
	i,
	currentUser,
	reviews,
	reviewIDs,
	index
}) => {
	let upvotes = Object.keys(upvoteSet).length;
	let downvotes = Object.keys(downvoteSet).length;
	let dir = 0;

	const [ totalVotes, setTotalVotes ] = useState(upvotes - downvotes);
	let voteString = totalVotes + '';
	if (totalVotes >= 1000) {
		voteString = (totalVotes / 1000).toFixed(1) + 'k';
	}
	let currentAlias = currentUser.substr(0, currentUser.indexOf('@'));
	if (upvoteSet[currentAlias] == true) dir = 1;
	if (downvoteSet[currentAlias] == true) dir = -1;

	const upIcon = (props) => <Icon {...props} name="arrow-upward-outline" />;

	const downIcon = (props) => <Icon {...props} name="arrow-downward-outline" />;

	return user == currentUser ? (
		<React.Fragment>
			<View style={{ flexDirection: 'row', margin: 3 }}>
				<View {...props} style={{ flexDirection: 'row', flex: 0.5, margin: 3 }}>
					<Button
						size={dir > 0 ? 'small' : 'small'}
						status={dir > 0 ? 'warning' : 'basic'}
						appearance={dir > 0 ? 'outline' : 'outline'}
						accessoryLeft={upIcon}
						onPress={() => {
							delete downvoteSet[currentAlias];
							upvoteSet[currentAlias] = true;
							if (dir == 1) {
								delete upvoteSet[currentAlias];
								dir = 0;
							}
							let updates = {};
							let newTotalVotes = Object.keys(upvoteSet).length - Object.keys(downvoteSet).length;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'upvoteSet'] = upvoteSet;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'downvoteSet'] = downvoteSet;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'votes'] = newTotalVotes;
							Firebase.database().ref().update(updates);
							reviews[i].upvoteSet = upvoteSet;
							reviews[i].downvoteSet = downvoteSet;
							setTotalVotes(newTotalVotes);
						}}
					/>
					<Text style={{ marginLeft: 5, marginRight: 5, marginTop: 5 }}>{voteString}</Text>
					<Button
						size={dir > 0 ? 'small' : 'small'}
						status={dir < 0 ? 'warning' : 'basic'}
						appearance={dir > 0 ? 'outline' : 'outline'}
						accessoryLeft={downIcon}
						onPress={() => {
							delete upvoteSet[currentAlias];
							downvoteSet[currentAlias] = true;
							if (dir == -1) {
								delete downvoteSet[currentAlias];
								dir = 0;
							}
							let updates = {};
							let newTotalVotes = Object.keys(upvoteSet).length - Object.keys(downvoteSet).length;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'upvoteSet'] = upvoteSet;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'downvoteSet'] = downvoteSet;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'votes'] = newTotalVotes;
							Firebase.database().ref().update(updates);
							reviews[i].upvoteSet = upvoteSet;
							reviews[i].downvoteSet = downvoteSet;
							setTotalVotes(newTotalVotes);
						}}
					/>
				</View>
				<View {...props} style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 0.5, margin: 3 }}>
					<Button
						style={styles.footerControl}
						size="small"
						accessoryLeft={trashIcon}
						status="basic"
						onPress={() => {
							Alert.alert(
								'Confirm Deletion',
								'Are you sure you want to delete this review?',
								[
									{
										text: 'Cancel',
										onPress: () => console.log('Cancel Pressed'),
										style: 'cancel'
									},
									{
										text: 'Delete',
										onPress: () => {
											Firebase.database().ref(types[index] + ' Reviews/' + review_id).remove();
											navigation.navigate('ShowReviews');
										}
									}
								],
								{ cancelable: false }
							);
						}}
					/>
					<Button
						style={styles.footerControl}
						size="small"
						accessoryLeft={editIcon}
						onPress={() => {
							navigation.navigate('EditReview', {
								review_title: title,
								review_text: text,
								index: index,
								review_rate: rate,
								review_id: review_id
							});
						}}
					/>
				</View>
			</View>
		</React.Fragment>
	) : (
		<React.Fragment>
			<View style={{ flexDirection: 'row', margin: 3 }}>
				<View {...props} style={{ flexDirection: 'row', flex: 0.5, margin: 3 }}>
					<Button
						size={dir > 0 ? 'small' : 'small'}
						status={dir > 0 ? 'warning' : 'basic'}
						appearance={dir > 0 ? 'outline' : 'outline'}
						accessoryLeft={upIcon}
						onPress={() => {
							delete downvoteSet[currentAlias];
							upvoteSet[currentAlias] = true;
							if (dir == 1) {
								delete upvoteSet[currentAlias];
								dir = 0;
							}
							let updates = {};
							let newTotalVotes = Object.keys(upvoteSet).length - Object.keys(downvoteSet).length;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'upvoteSet'] = upvoteSet;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'downvoteSet'] = downvoteSet;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'votes'] = newTotalVotes;
							Firebase.database().ref().update(updates);
							reviews[i].upvoteSet = upvoteSet;
							reviews[i].downvoteSet = downvoteSet;
							setTotalVotes(newTotalVotes);
						}}
					/>
					<Text style={{ marginLeft: 5, marginRight: 5, marginTop: 5 }}>{voteString}</Text>
					<Button
						size={dir < 0 ? 'small' : 'small'}
						status={dir < 0 ? 'warning' : 'basic'}
						appearance={dir < 0 ? 'outline' : 'outline'}
						accessoryLeft={downIcon}
						onPress={() => {
							delete upvoteSet[currentAlias];
							downvoteSet[currentAlias] = true;
							if (dir == -1) {
								delete downvoteSet[currentAlias];
								dir = 0;
							}
							let updates = {};
							let newTotalVotes = Object.keys(upvoteSet).length - Object.keys(downvoteSet).length;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'upvoteSet'] = upvoteSet;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'downvoteSet'] = downvoteSet;
							updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'votes'] = newTotalVotes;
							Firebase.database().ref().update(updates);
							reviews[i].upvoteSet = upvoteSet;
							reviews[i].downvoteSet = downvoteSet;
							setTotalVotes(newTotalVotes);
						}}
					/>
				</View>
				<View {...props} style={{ flexDirection: 'row', flex: 0.5, justifyContent: 'flex-end', margin: 3 }}>
					<Button appearance="ghost" />
					<Button appearance="ghost" />
				</View>
			</View>
		</React.Fragment>
	);
};

export default (readReview = ({ route, navigation }) => {
	const {
		title,
		user,
		rate,
		text,
		review_id,
		date,
		index,
		currentUser,
		upvoteSet,
		downvoteSet,
		i,
		reviews,
		reviewIDs
	} = route.params;
	console.log('This is read review: ');
	console.log(index);

	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<Layout style={styles.container} level={'1'}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<Button
							title="Back"
							appearance={'ghost'}
							size={'large'}
							style={{
								justifyContent: 'center',
								marginLeft: 0.02 * screenWidth,
								marginTop: 0.05 * screenHeight,
								maxWidth: 0.1 * screenWidth,
								maxHeight: 0.1 * screenHeight
							}}
							accessoryLeft={BackIcon}
							onPress={() => {
								navigation.navigate('ShowReviews', {
									index: index,
									tempReviews: reviews,
									tempReviewIDs: reviewIDs
								});
							}}
						/>

						<Card
							style={styles.card}
							header={(props) => <Header {...props} title={title} user={user} date={date} rate={rate} />}
							footer={(props) => (
								<Footer
									{...props}
									title={title}
									user={user}
									rate={rate}
									text={text}
									review_id={review_id}
									navigation={navigation}
									index={index}
									currentUser={currentUser}
									upvoteSet={upvoteSet}
									downvoteSet={downvoteSet}
									i={i}
									reviews={reviews}
									reviewIDs={reviewIDs}
								/>
							)}
						>
							<Text style={styles.text} category="p1">
								{text}
							</Text>
						</Card>
					</ScrollView>
				</Layout>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
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
