import React, { useState, ReactDOM } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, View, TouchableOpacity} from 'react-native';
import { TopNavigationAction, List, Divider, Layout, Text, Button, Input, Select, SelectItem, IndexPath, Icon, Card } from '@ui-kitten/components';
import { Dimensions, Alert } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import { useScrollToTop } from '@react-navigation/native';

const types = [
    'Dining',
    'On-Campus Facilities',
    'Classes',
    'Professors'
  ];

  const rateVal = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
  ];

  const reviews = [];
  const reviewIDs = [];
  
  const trashIcon = (props) => (
    <Icon {...props} name='trash-2'/>
  );
  
  const editIcon = (props) => (
    <Icon {...props} name='edit-outline'/>
  );
  
  const plusIcon = (props) => (
    <Icon {...props} name='plus'/>
  );
  
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
  );
  
  const renderBackAction = () => (
    <Icon icon={BackIcon}/>
  );

  const showTime = (date, datetime) => {
    const timediff = Math.floor((datetime - date)/1000);
    let retString = '';

    if (timediff < 3600) {
      retString = Math.floor(timediff/60) + ' mins';

    } else if (timediff < 24*3600) {
      retString = Math.floor(timediff/(3600)) + ' hrs';

    } else if (timediff < 365*24*3600) {
      retString = Math.floor(timediff/(24*3600)) + ' days';

    } else {
      retString = Math.floor(timediff/(365*24*3600)) + ' yrs';

    }
    return retString;
  }

const Header = ({props, title, user, date, rate, edited, edited_time}) => {
  let dateString = "";
  const today = new Date();
  const datetime = today.getTime();
  if (edited) {
    dateString = "Created: "+showTime(date, datetime) + "ago (Edited: "+ showTime(edited_time, datetime) + " ago)";
  }
  else {
    dateString = "Created: "+showTime(date, datetime);
  }
  return (
    <View {...props} style={[styles.headerContainer]}>
      <Text category='h6'> Topic: {title} </Text>
      <Text category='s1'> User: {user} </Text>
      <Text category='s3'> Rating(#/10): {rate} </Text>
      <Text category='h9'> {dateString} </Text>
    </View>
  )
};

const Footer = ({navigation, props, title, user, rate, text, review_id, index, currentUser, upvoteSet, downvoteSet, i}) => {
  let upvotes = Object.keys(upvoteSet).length;
  let downvotes = Object.keys(downvoteSet).length;  
  let dir = 0;
  const [totalVotes, setTotalVotes] = useState(upvotes - downvotes);
  let voteString = totalVotes + "";
  if (totalVotes >= 1000) {
    voteString = (totalVotes/1000).toFixed(1) + "k";
  }
  let currentAlias = currentUser.substr(0, currentUser.indexOf("@"));
  if (upvoteSet[currentAlias] == true)
  dir = 1;
  if (downvoteSet[currentAlias] == true)
    dir = -1;

  const upIcon = (props) => (
    <Icon {...props} name='arrow-upward-outline'/>
  );

  const downIcon = (props) => (
    <Icon {...props} name='arrow-downward-outline'/>
  );
  return user == currentUser ? (
    <React.Fragment>
      <View style={{flexDirection: 'row', margin: 3,}}>
        <View {...props} style={{flexDirection: 'row', flex: 0.5, margin: 3}} >
        <Button size={dir > 0 ? 'small' : 'small'} status={dir > 0 ? 'warning' : 'basic'} appearance={dir > 0 ? 'outline' : 'outline'} accessoryLeft={upIcon} onPress={() => {
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

          }}></Button>
          <Text style={{marginLeft: 5, marginRight: 5, marginTop: 5}}>{voteString}</Text>
          <Button size={dir > 0 ? 'small' : 'small'} status={dir < 0 ? 'warning' : 'basic'} appearance={dir > 0 ? 'outline' : 'outline'} accessoryLeft={downIcon} onPress={() => {
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
          }}></Button>
        </View>
        <View {...props} style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 0.5, margin: 3}}>
          <Button
            style={styles.footerControl}
            size='small'
            accessoryLeft = {trashIcon}
            status='basic' onPress={() => {
                Alert.alert(
                    "Confirm Deletion",
                    "Are you sure you want to delete this review?",
                    [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Delete", onPress: () => {
                        Firebase.database().ref(types[index] + ' Reviews/' + review_id).remove();
                        navigation.navigate('ShowReviews');
                    }}
                    ],
                    { cancelable: false }
                );
            }}>
          </Button>
          <Button
            style={styles.footerControl}
            size='small' 
            accessoryLeft={editIcon}
            onPress= {() => {
                navigation.navigate('EditReview', {review_title: title,
                    review_text: text,
                    index: index,
                    review_rate: rate,
                    review_id: review_id});
            }}>
            
          </Button>
        </View>
      </View>

    </React.Fragment>
    ) : (
      <React.Fragment>
      <View style={{flexDirection: 'row', margin: 3,}}>
        <View {...props} style={{flexDirection: 'row', flex: 0.5, margin: 3}} >
        <Button size={dir > 0 ? 'small' : 'small'} status={dir > 0 ? 'warning' : 'basic'} appearance={dir > 0 ? 'outline' : 'outline'} accessoryLeft={upIcon} onPress={() => {
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

          }}></Button>
          <Text style={{marginLeft: 5, marginRight: 5, marginTop: 5}}>{voteString}</Text>
          <Button size={dir < 0 ? 'small' : 'small'} status={dir < 0 ? 'warning' : 'basic'} appearance={dir < 0 ? 'outline' : 'outline'} accessoryLeft={downIcon} onPress={() => {
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
          }}></Button>
        </View>
        <View {...props} style={{flexDirection: 'row', flex: 0.5, justifyContent: 'flex-end', margin: 3, }}>
          <Button appearance='ghost'></Button>
          <Button appearance='ghost'></Button>
        </View>
      </View>

    </React.Fragment>
    )
    }

export default showReviews = ({navigation, route }) => {
    const index = route.params.index;
    let {tempReviews, tempReviewIDs} = route.params;
    if (tempReviews != undefined && tempReviews.length > 0) {
      reviews = tempReviews;
      reviewIDs = tempReviewIDs;
    }
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const ref = Firebase.database().ref(types[index] + ' Reviews/');

    let reviewIDsToReviewsMap = new Map();
    if (tempReviews != undefined && tempReviews.length > 0) {
      for (let idx = 0; idx < tempReviews.length; idx++) {
        reviewIDsToReviewsMap[reviewIDs[idx]] = reviews[idx];
      }
    }


    ref.on('value', (snapshot) => {
      let n = reviews.length;
      for (let i = 0; i < n; i++) {
        reviews.pop();
        reviewIDs.pop();
      }
      let index = 0;
      snapshot.forEach(function (data) {
        reviews.push(data.toJSON());
        reviewIDs.push(data.key);
        reviewIDsToReviewsMap[reviewIDs[index]] = reviews[index];
        index++;
      });
    });
    ref.off();

    console.log(reviewIDsToReviewsMap[reviewIDs[0]]);
    reviewIDs.sort(function(b2,a2) {
      let b = reviewIDsToReviewsMap[b2];
      let a = reviewIDsToReviewsMap[a2];
      if(a.votes == b.votes) {
        return a.createTimestamp > b.createTimestamp ? 1 : a.createTimestamp < b.createTimestamp ? -1 : 0;
      }
  
      return a.votes > b.votes ? 1 : -1;
    });;
  
    reviews.sort(function(b,a) {
      if(a.votes == b.votes) {
        return a.createTimestamp > b.createTimestamp ? 1 : a.createTimestamp < b.createTimestamp ? -1 : 0;
      }
  
      return a.votes > b.votes ? 1 : -1;
    });;

    const currentUser = (Firebase.auth().currentUser.providerData[0].email).toString();
       
    const renderItem = (info) => {
      let i = info.index;
      let item = info.item;
      return (
        <Card
          style={styles.card}
          header={(props) => <Header {...props} title={item.review_title} user={item.user} date={item.date_time} rate={item.review_rate} edited={item.edited} edited_time={item.edited_time}/> }
          footer={(props) => <Footer {...props} title={item.review_title} user={item.user} rate={item.review_rate} text={item.review_text} review_id={reviewIDs[i]} navigation={navigation} index={index} currentUser={currentUser} upvoteSet={item.upvoteSet} downvoteSet={item.downvoteSet} i={i}/>}
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
              upvoteSet: posts[i].upvoteSet,
              downvoteSet: posts[i].downvoteSet,
              i: i,
              reviews: reviews,
              reviewIDs: reviewIDs
            });
          }}
        >
          <Text>{item.review_text}</Text>
        </Card>
      )
    };




    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}> 
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Layout style={styles.container} level={'1'} > 
                    <ScrollView contentContainerStyle={{flexGrow : 1, width : screenWidth, alignItems: 'center', justifyContent: 'center'}}>

                    <Button style={{
                        marginTop: 50
                    }
                      
                    }
                        title='Back'
                        accessoryLeft={BackIcon}
                        onPress = { () => {
                            navigation.navigate('Buffer')
                        }
                        }
                    />
                    <Text
                        style={{
                            
                            marginBottom: 20,
                            fontSize: 36,
                            marginHorizontal: 2,
                        }}
                        >
                        {' '}
                        {types[index]}{' '}
                    </Text>
                    <Button
                        status='basic'
                        accessoryLeft={plusIcon}
                        onPress={() => {
                            navigation.navigate('CreateReview', {
                                index: index,
                                currentUser: currentUser
                            });
                        }}
                        >
                        
                    </Button>
                    <TouchableOpacity>
                      <List
                        style={{maxHeight : 0.6*screenHeight}}
                        data={reviews}
                        ItemSeparatorComponent={Divider}
                        renderItem={renderItem}
                      />
                    </TouchableOpacity> 
                    <Text style={{marginBottom: 20}}></Text>
                    </ScrollView>
                </Layout>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputBox: {
      width: '90%',
      margin: 0,
      padding: 15,
      fontSize: 16,
      textAlign: 'center',
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    backButton: {
        flexDirection: 'row',
        justifyContent: 'flex-start'

    },
    card: {
      flex: 1,
      margin: 7.5,
      minWidth: '95%',
      maxWidth: '95%',
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      margin: 3,
    },
    headerContainer: {
      margin: 5,
    },
    footerControl: {
      marginHorizontal: 2,
    },
  });
