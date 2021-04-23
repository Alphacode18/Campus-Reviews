import React, { useState, ReactDOM } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	View,
	TouchableOpacity
} from 'react-native';
import {
	TopNavigationAction,
	List,
	Divider,
	Layout,
	Text,
	Button,
	Input,
	Select,
	SelectItem,
	IndexPath,
	Icon,
	Card
} from '@ui-kitten/components';
import { Dimensions, Alert } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import { useScrollToTop } from '@react-navigation/native';

const admins = new Set();

const types = [ 'Dining', 'On-Campus Facilities', 'Classes', 'Professors' ];

const rateVal = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ];

let reviews = [];
let reviewIDs = [];

const trashIcon = (props) => <Icon {...props} name="trash-2" />;

const editIcon = (props) => <Icon {...props} name="edit-outline" />;

const plusIcon = (props) => <Icon {...props} name="plus" />;

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

// const renderBackAction = () => <Icon icon={BackIcon} />;

const initializeAdmins = () => {
	admins.add('rrajash@purdue.edu');
	admins.add('seela@purdue.edu');
};

const renderHeader = () => (
	<Layout
		style={{
			padding: 10,
			alignItems: 'center',
			justifyContent: 'center'
		}}
	>
		<Input
			autoCapitalize="none"
			status="info"
			placeholder="Search"
			style={{
				borderRadius: 25,
				borderColor: '#333'
			}}
			textStyle={{ color: '#000' }}
		/>
	</Layout>
);

const showTime = (date, datetime) => {
	const timediff = Math.floor((datetime - date) / 1000);
	let retString = '';

	if (timediff < 3600) {
		retString = Math.floor(timediff / 60) + 'm';
	} else if (timediff < 24 * 3600) {
		retString = Math.floor(timediff / 3600) + 'h';
	} else if (timediff < 365 * 24 * 3600) {
		retString = Math.floor(timediff / (24 * 3600)) + 'd';
	} else {
		retString = Math.floor(timediff / (365 * 24 * 3600)) + 'y';
	}
	return retString;
};

const Header = ({ props, title, user, date, rate, edited, edited_time }) => {
	let dateString = '';
	const today = new Date();
	const datetime = today.getTime();
	if (edited) {
		dateString =
			'Created: ' + showTime(date, datetime) + ' ago (Edited: ' + showTime(edited_time, datetime) + ' ago)';
	} else {
		dateString = 'Created: ' + showTime(date, datetime);
	}
	return (
		<View {...props} style={[ styles.headerContainer ]}>
			<Text category="h6"> {title} </Text>
			<Text category="s1"> {user} </Text>
			<Text category="s3"> Rating: {rate}/10 </Text>
			<Text category="h9"> {dateString} </Text>
		</View>
	);
};

const Footer = ({
	navigation,
	props,
	title,
	user,
	rate,
	text,
	review_id,
	index,
	currentUser,
	upvoteSet,
	downvoteSet,
	i
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
	return user == currentUser || admins.has(currentUser) ? (
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
				<View
					{...props}
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-end',
						flex: 0.5,
						margin: 3
					}}
				>
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
											navigation.navigate('Loading', {
												index: index,
												postType: 'Reviews'
											});
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
						appearance={currentUser != user ? 'ghost' : null}
						accessoryLeft={currentUser == user ? editIcon : null}
						onPress={() => {
							if (currentUser == user) {
								navigation.navigate('EditReview', {
									review_title: title,
									review_text: text,
									index: index,
									review_rate: rate,
									review_id: review_id
								});
							}
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
				<View
					{...props}
					style={{
						flexDirection: 'row',
						flex: 0.5,
						justifyContent: 'flex-end',
						margin: 3
					}}
				>
					<Button appearance="ghost" />
					<Button appearance="ghost" />
				</View>
			</View>
		</React.Fragment>
	);
};

export default (showReviews = ({ navigation, route }) => {
	initializeAdmins();
	const index = route.params.index;
	let { tempReviews, tempReviewIDs } = route.params;
	if (tempReviews != undefined && tempReviews.length > 0) {
		reviews = tempReviews;
		reviewIDs = tempReviewIDs;
	}
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;
	const [ selectedIndex, setSelectedIndex ] = React.useState(new IndexPath(0));
	const [ dispVal, setDispVal ] = React.useState('Votes');
	const ref = Firebase.database().ref(types[index] + ' Reviews/');
	//Search For Me And You'll Find Me.
	const [ query, setQuery ] = useState('');
	const [ data, setData ] = useState(reviews);

	const handleSearch = () => {
		const formattedQuery = query.toLowerCase();
		if (formattedQuery === '') {
			navigation.navigate('Loading', {
				index: index,
				postType: 'Reviews'
			});
		} else {
			const filtered_data = [];
			for (let i = 0; i < data.length; i++) {
				console.log('Data' + ' ' + data[i].review_title);
				console.log(query);
				if (data[i].review_title.toLowerCase().includes(formattedQuery)) {
					filtered_data.push(data[i]);
				}
			}
			if (filtered_data.length === 0) {
				Alert.alert('No results found');
				navigation.navigate('Loading', {
					index: index,
					postType: 'Reviews'
				});
			}
			setData(filtered_data);
		}
	};

	const renderSearchIcon = (props) => (
		<TouchableWithoutFeedback onPress={handleSearch}>
			<Icon {...props} name={'search-outline'} />
		</TouchableWithoutFeedback>
	);

	let reviewIDsToReviewsMap = new Map();
	if (tempReviews != undefined && tempReviews.length > 0) {
		for (let idx = 0; idx < tempReviews.length; idx++) {
			reviewIDsToReviewsMap[reviewIDs[idx]] = reviews[idx];
		}
	} else {
		for (let idx = 0; idx < reviews.length; idx++) {
			reviewIDsToReviewsMap[reviewIDs[idx]] = reviews[idx];
		}
	}
	console.log('map');
	console.log(reviewIDsToReviewsMap);

	ref.on('value', (snapshot) => {
		let n = reviews.length;
		for (let i = 0; i < n; i++) {
			reviews.pop();
			reviewIDs.pop();
		}
		let index = 0;
		snapshot.forEach(function(data) {
			reviews.push(data.toJSON());
			reviewIDs.push(data.key);
			reviewIDsToReviewsMap[reviewIDs[index]] = reviews[index];
			index++;
		});
		setData(reviews);
	});
	ref.off();

	console.log(reviewIDsToReviewsMap[reviewIDs[0]]);
	console.log('dispVal: ');
	console.log(dispVal);

	if (dispVal === 'Recent') {
		console.log('recent clicked');
		reviewIDs.sort(function(b2, a2) {
			let b = reviewIDsToReviewsMap[b2];
			let a = reviewIDsToReviewsMap[a2];
			return a.date_time > b.date_time ? 1 : a.date_time < b.date_time ? -1 : 0;
		});

		reviews.sort(function(b, a) {
			return a.date_time > b.date_time ? 1 : a.date_time < b.date_time ? -1 : 0;
		});
	} else if (dispVal === 'Oldest') {
		reviewIDs.sort(function(b2, a2) {
			let b = reviewIDsToReviewsMap[b2];
			let a = reviewIDsToReviewsMap[a2];

			return a.date_time > b.date_time ? -1 : a.date_time < b.date_time ? 1 : 0;
		});

		reviews.sort(function(b, a) {
			return a.date_time > b.date_time ? -1 : a.date_time < b.date_time ? 1 : 0;
		});
	} else if (dispVal === 'Votes') {
		reviewIDs.sort(function(b2, a2) {
			let b = reviewIDsToReviewsMap[b2];
			let a = reviewIDsToReviewsMap[a2];
			if (a.votes == b.votes) {
				return a.date_time > b.date_time ? 1 : a.date_time < b.date_time ? -1 : 0;
			}

			return a.votes > b.votes ? 1 : -1;
		});

		reviews.sort(function(b, a) {
			if (a.votes == b.votes) {
				return a.date_time > b.date_time ? 1 : a.date_time < b.date_time ? -1 : 0;
			}

			return a.votes > b.votes ? 1 : -1;
		});
	} else {
		reviewIDs.sort(function(b2, a2) {
			let b = reviewIDsToReviewsMap[b2];
			let a = reviewIDsToReviewsMap[a2];
			if (a.votes == b.votes) {
				return a.date_time > b.date_time ? 1 : a.date_time < b.date_time ? -1 : 0;
			}

			return a.votes > b.votes ? 1 : -1;
		});

		reviews.sort(function(b, a) {
			if (a.votes == b.votes) {
				return a.date_time > b.date_time ? 1 : a.date_time < b.date_time ? -1 : 0;
			}

			return a.votes > b.votes ? 1 : -1;
		});
	}

	const currentUser = Firebase.auth().currentUser.providerData[0].email.toString();

	const renderItem = (info) => {
		let i = info.index;
		let item = info.item;
		return (
			<Card
				style={styles.card}
				header={(props) => (
					<Header
						{...props}
						title={item.review_title}
						user={item.user}
						date={item.date_time}
						rate={item.review_rate}
						edited={item.edited}
						edited_time={item.edited_time}
					/>
				)}
				footer={(props) => (
					<Footer
						{...props}
						title={item.review_title}
						user={item.user}
						rate={item.review_rate}
						text={item.review_text}
						review_id={reviewIDs[i]}
						navigation={navigation}
						index={index}
						currentUser={currentUser}
						upvoteSet={item.upvoteSet}
						downvoteSet={item.downvoteSet}
						i={i}
					/>
				)}
				onPress={() => {
					navigation.navigate('ReadReview', {
						title: item.review_title,
						user: item.user,
						rate: item.review_rate,
						text: item.review_text,
						review_id: reviewIDs[i],
						date: item.date_time,
						index: index,
						currentUser: currentUser,
						upvoteSet: reviews[i].upvoteSet,
						downvoteSet: reviews[i].downvoteSet,
						i: i,
						reviews: reviews,
						reviewIDs: reviewIDs
					});
				}}
			>
				<Text>{item.review_text}</Text>
			</Card>
		);
	};

	const ButtonFR = () => {
		if (index == 1) {
			return (
				<View style={{ flexDirection: 'row' }}>
					<Button
						title="Back"
						appearance={'ghost'}
						size={'large'}
						style={{
							justifyContent: 'left',
							marginLeft: 0.02 * screenWidth,
							marginTop: 0.1 * screenHeight,
							maxWidth: 0.1 * screenWidth,
							minHeight: 0.1 * screenHeight,
							marginRight: 0.3 * screenWidth
						}}
						accessoryLeft={BackIcon}
						onPress={() => {
							navigation.navigate('Buffer');
						}}
					/>
					<Button
						style={{
							justifyContent: 'left',
							marginLeft: 0.02 * screenWidth,
							marginTop: 0.12 * screenHeight,
							maxWidth: 0.5 * screenWidth,
							maxHeight: 0.05 * screenHeight
						}}
						onPress={() => {
							navigation.navigate('RoommateHome', {
								currentUser: currentUser
							});
						}}
					>
						{' '}
						Find Roommates{' '}
					</Button>
				</View>
			);
		} else {
			return (
				<Button
					title="Back"
					appearance={'ghost'}
					size={'large'}
					style={{
						justifyContent: 'left',
						marginLeft: 0.02 * screenWidth,
						marginTop: 0.1 * screenHeight,
						maxWidth: 0.2 * screenWidth,
						maxHeight: 0.1 * screenHeight,
						marginRight: 0.8 * screenWidth
					}}
					accessoryLeft={BackIcon}
					onPress={() => {
						navigation.navigate('Buffer');
					}}
				/>
			);
		}
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<Layout style={styles.container} level={'1'}>
					<ScrollView
						contentContainerStyle={{
							flexGrow: 1,
							width: screenWidth,
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<ButtonFR />

						<Text
							style={{
								marginBottom: 20,
								fontSize: 36,
								marginHorizontal: 2
							}}
						>
							{' '}
							{types[index]}{' '}
						</Text>
						<Button
							status="basic"
							accessoryLeft={plusIcon}
							onPress={() => {
								navigation.navigate('CreateReview', {
									index: index,
									currentUser: currentUser
								});
							}}
						/>
						<Select
							value={dispVal}
							style={{ minWidth: screenWidth, marginTop: 10, marginBottom: 10 }}
							selectedIndex={selectedIndex}
							onSelect={(setIndex) => setSelectedIndex(setIndex)}
						>
							<SelectItem
								title="Votes"
								onPress={() => {
									setDispVal('Votes');
									// navigation.navigate('Loading', {
									//   index: index,
									//   postType: 'Posts',
									//   sort: 0,
									// });
								}}
							/>
							<SelectItem
								title="Recent"
								onPress={() => {
									setDispVal('Recent');
									// navigation.navigate('Loading', {
									//   index: index,
									//   postType: 'Posts',
									//   sort: 1,
									// });
								}}
							/>
							<SelectItem
								title="Oldest"
								onPress={() => {
									setDispVal('Oldest');
									// navigation.navigate('Loading', {
									//   index: index,
									//   postType: 'Posts',
									//   sort: 2,
									// });
								}}
							/>
						</Select>
						<TouchableOpacity>
							<List
								style={{
									maxHeight: 0.6 * screenHeight,
									minWidth: 0.95 * screenWidth
								}}
								data={data}
								ItemSeparatorComponent={Divider}
								// renderItem={<renderItem navigation={navigation} currentUser={currentUser} postIDs={...postIDs} index={index}/>}
								renderItem={renderItem}
								ListHeaderComponent={
									<Layout
										style={{
											padding: 10,
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										<Input
											placeholder="Search"
											value={query}
											onChangeText={(query) => setQuery(query)}
											accessoryRight={renderSearchIcon}
										/>
									</Layout>
								}
							/>
						</TouchableOpacity>
						<Text style={{ marginBottom: 20 }} />
					</ScrollView>
				</Layout>
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
	},
	topContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	backButton: {
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	card: {
		flex: 1,
		margin: 7.5,
		minWidth: '95%',
		maxWidth: '95%'
	},
	footerContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		margin: 3
	},
	headerContainer: {
		margin: 5
	},
	footerControl: {
		marginHorizontal: 2
	}
});
