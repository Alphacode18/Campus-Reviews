//TODO: Integrate with the latest version of homescreen
import React, { useState } from 'react';
import { StyleSheet, ScrollView, Keyboard, TouchWithoutFeedback, TouchableOpacity, TouchableWithoutFeedback,TouchOpacity, View, Alert } from 'react-native';
import { Layout, Button, Input, Text, Spinner, Icon, Divider, List} from '@ui-kitten/components';
import { Dimensions } from 'react-native';

import Firebase from '../../config/firebase';
import firebase from 'firebase';



let ratings = [];
let userDining = [];
let finalCollab = [];

   
const renderHeader = () => (
	<Layout
		style={{
			alignItems: 'center',
			justifyContent: 'center'
		}}
	>
	</Layout>
);

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
console.log("ScreenWidth: "+ screenWidth + " screenHeight: " + screenHeight);
export default foodRec = ({route, navigation}) =>  {
    let options = null;
	const recommend = require('../../node_modules/collaborative-filter/lib/cf_api.js');


	const dataset = require('./YelpWLData.json');

	const jsonAsArray = Object.keys(dataset).map(function (key) {
		return dataset[key];
	})
	

  	let arr = [];

  	for (let idx = 0; idx < 10; idx++) {
    	arr[idx] = jsonAsArray[idx];
  	}
	  
	var user = firebase.auth().currentUser;

	let currentUser = Firebase.auth().currentUser.providerData[0].email.toString();

	/* Collaborative Filtering
	Step 1. Construct array of restaurant ID's which are reviewed favorably (7+) 
		for the current user (var user = firebase.auth().currentUser;)
	Step 2. Construct an array of 10 arrays (one for each user) which will contain
		the restaurant IDs that they reviewed favorably (7+)
	Step 3. Find the most similar user and find the highest ratings given.
	*/

	// step 1
	firebase.database().ref(`/Dining Reviews`).on("value", snapshot => {
        snapshot.forEach(function(data) {
			//console.log("Database User: " + data.toJSON().user + " CUrrent User: " + currentUser);
        	if (data.toJSON().user == currentUser) {
				if (data.toJSON().review_rate > 6) {
					userDining.push(data.toJSON().restaurant_id);
				}
			}
        })
    })
	
	let single = [];
	for(let idx = 0; idx < 150; idx++) {
		if (userDining.includes(idx)) {
			single.push(1);
		} else {
			single.push(0);
		}
	}

	finalCollab.push(single); // User 0 will be recommender
	
	// step 2
	firebase.database().ref(`/Dining Reviews`).orderByChild("user").on("value", snapshot => {
        let lastUser = "";
		let tmp_arr = [];
		snapshot.forEach(function(data) {
			console.log("User: " + data.toJSON().user);	
			if (lastUser == "") {
				// first run
				if (data.toJSON().review_rate > 6) {
					tmp_arr.push(data.toJSON().restaurant_id);
				}
				lastUser = data.toJSON().user;
			} else if (data.toJSON().user == lastUser) {
				// same user as last user, continue using tmp_arr
				if (data.toJSON().review_rate > 6) {
					tmp_arr.push(data.toJSON().restaurant_id);
				}
			} else {
				// new user, do what you want with tmp_arr and wipe it
				let tmp1 = [];
				for(let idx = 0; idx < 150; idx++) {
					if (tmp_arr.includes(idx)) {
						tmp1.push(1);
					} else {
						tmp1.push(0);
					}
				}
				if (lastUser != currentUser) {
					finalCollab.push(tmp1);
				}
				tmp_arr = [];
				if (data.toJSON().review_rate > 6) {
					tmp_arr.push(data.toJSON().restaurant_id);
				}
				lastUser = data.toJSON().user;
			}
		})
		let tmp1 = [];
		for(let idx = 0; idx < 150; idx++) {
			if (tmp_arr.includes(idx)) {
				tmp1.push(1);
			} else {
				tmp1.push(0);
			}
		}
		if (lastUser != currentUser) {
			finalCollab.push(tmp1);
		}
    })
	// step 3
	const result = recommend.cFilter(finalCollab, 0);
	console.log(a);
	let a = [];
	if (result[0] == -1) {
		console.log("there are no reviews for current user");
		a = arr;
		//arr[0].name = "You have not made any reviews. We need data to create your recommendation.";
		//arr[0].aggregatedRating = "";
	} else {
		for (let idx = 0; idx < 10; idx++) {
			a.push(jsonAsArray[result[idx]]);
		}
	}
	

  	const renderItem = (info) => {
		let i = info.index;
		let item = info.item;

		return (
			<React.Fragment>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'left',
						marginTop: 16
					}}
				>
					<Text style={styles.commentLeft} status="info" category="s1">
						{item.name}
					</Text>

				</View>
			</React.Fragment>
		);
	};
  
	return (
    		<Layout style={styles.container} level={'1'}>
            <Text style={styles.title}> Your Top 10 Custom Recommendations </Text>
            <List
								style={{ maxWidth: screenWidth, maxHeight: screenHeight,}}
								data={a}
								ItemSeparatorComponent={Divider}
								// renderItem={<renderItem navigation={navigation} currentUser={currentUser} postIDs={...postIDs} index={index}/>}
								renderItem={renderItem}
								ListHeaderComponent={renderHeader}
						/>
        </Layout>

  	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentLeft: {
    fontSize: 20,
  }, 
  commentRight: {
    fontSize: 15,
  },
  title: {
	paddingTop:50,
    fontSize: 30,
    alignItems: 'center',
  }
});