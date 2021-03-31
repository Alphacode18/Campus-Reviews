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

const Footer = ({navigation, props, title, user, rate, text, review_id, index, currentUser}) => {
    return user == currentUser ? (
        <View {...props} style={[styles.footerContainer]}>
            <Button
            style={styles.footerControl}
            size='small'
            status='basic' 
            accessoryLeft={trashIcon}
            onPress={() => {
                //createTwoButtonAlert(postID, navigation);
                Alert.alert(
                    "Confirm Deletion",
                    "Are you sure you want to delete this review?",
                    [
                    {
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Yes", onPress: () => {
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
    ) : (
      <View {...props} style={[styles.footerContainer]}>
        <Button Button appearance='ghost'>
        </Button>
        <Button appearance='ghost'>
        </Button>
      </View>
    )
    }

export default showReviews = ({navigation, route }) => {
    const index = route.params.index;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    Firebase.database()
    .ref(types[index] + ' Reviews/')
    .on('value', (snapshot) => {
      console.log('snapshot');
      console.log(snapshot);
      let n = reviews.length;
      for (let i = 0; i < n; i++) {
        reviews.pop();
        reviewIDs.pop();
      }
      let index = 0;
      snapshot.forEach(function (data) {
        console.log('data');
        reviews.push(data.toJSON());
        console.log(data);
        reviewIDs.push(data.key);
        index++;
      });
    });

    const currentUser = Firebase.auth().currentUser.providerData[0].email;
       
    const renderItem = (info) => {
      let i = info.index;
      let item = info.item;
      return (
        <Card
          style={styles.card}
          header={(props) => <Header {...props} title={item.review_title} user={item.user} date={item.date_time} rate={item.review_rate} edited={item.edited} edited_time={item.edited_time}/> }
          footer={(props) => <Footer {...props} title={item.review_title} user={item.user} rate={item.review_rate} text={item.review_text} review_id={reviewIDs[i]} navigation={navigation} index={index} currentUser={currentUser}/>}
          onPress={() => {
            navigation.navigate('ReadReview', {
              title: item.review_title,
              user: item.user,
              rate: item.review_rate,
              text: item.review_text,
              review_id: reviewIDs[i],
              date: item.date_time,
              index: index
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
