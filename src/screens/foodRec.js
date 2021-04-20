//TODO: Integrate with the latest version of homescreen
import React, { useState } from 'react';
import { StyleSheet, ScrollView, Keyboard, TouchWithoutFeedback, TouchableOpacity, TouchableWithoutFeedback,TouchOpacity, View, Alert } from 'react-native';
import { Layout, Button, Input, Text, Spinner, Icon, Divider, List} from '@ui-kitten/components';
import { Dimensions } from 'react-native';

import Firebase from '../../config/firebase';

const dataset = require('./dataset.json');
let names = [];
let ratings = [];

const renderHeader = () => (
	<Layout
		style={{
			padding: 10,
			alignItems: 'center',
			justifyContent: 'center'
		}}
	>
	</Layout>
);

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
console.log("ScreenWidth: "+ screenWidth + " screenHeight: " + screenHeight);
export default foodRec = ({navigation}) =>  {

  const jsonAsArray = Object.keys(dataset).map(function (key) {
    return dataset[key];
  })
  .sort(function (itemA, itemB) {
    return itemA.aggregatedRating < itemB.aggregatedRating;
  });
  
  let arr = [];
  for (let idx = 0; idx < 5; idx++) {
    arr[idx] = jsonAsArray[idx];
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
					<Text style={styles.commentRight} category="s1" status="success">
						{item.aggregatedRating}
					</Text>

				</View>
			</React.Fragment>
		);
	};
  
	return (
    		<Layout style={styles.container} level={'1'}>
            <Text style={styles.title}> Your Top 5 Custom Recommendations </Text>
            <List
								style={{ maxWidth: screenWidth, maxHeight: screenHeight,}}
								data={arr}
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
    top: 50
  },
  commentLeft: {
    fontSize: 20,
  }, 
  commentRight: {
    fontSize: 15,
  },
  title: {
    fontSize: 30,
    alignItems: 'center',
  }
});
