import React, { useState, ReactDOM } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, View, TouchableOpacity} from 'react-native';
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath, Icon, Card } from '@ui-kitten/components';
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

  const showTime = ({date, datetime}) => {
    let diff = Math.floor((datetime - date)/1000);
    let ret = '';

    if (diff < 3600) {
      ret = Math.floor(diff/60) + ' mins';
    } else if (diff < 24*3600) {
      ret = Math.floor(diff/(3600)) + ' hrs';
    } else if (diff < 365*24*3600) {
      ret = Math.floor(diff/(24*3600)) + ' days';
    } else {
      ret = Math.floor(diff/(365*24*3600)) + ' yrs';
    }
    return ret;
  }

const Header = ({props, title, user, date, rate, edited, edited_time}) => {
  let dateString = "";
  const today = new Date();
  const datetime = today.getTime();
  if (edited) {
    dateString = showTime(date, datetime) + " (edited: "+ showTime(edited_time, datetime) + ")";
  }
  else {
    dateString = showTime(date, datetime);
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
    let reviews = [];
    let reviewIDs = [];

    Firebase.database()
    .ref(types[index] + ' Reviews/')
    .on('value', (snapshot) => {
      console.log('snapshot');
      console.log(snapshot);
      snapshot.forEach(function (data) {
        console.log('data');
        reviews.push(data.toJSON());
        console.log(data);
        reviewIDs.push(data.key);
      });
    });

    const currentUser = Firebase.auth().currentUser.providerData[0].email;
       
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
                    <React.Fragment>
                        {reviews.map(function(review, i) {

                          let title = review.review_title;
                          let user = review.user;
                          let date = review.date_time;
                          let rate = review.review_rate;
                          let text = review.review_text;
                          let edited = review.edited;
                          let edited_time = review.edited_time;
                                
                                return  (
                                    <Layout style={styles.container} level={'1'} > 
                                        <TouchableOpacity>
                                            <Card style={styles.card}
                                            header={(props) => <Header {...props} title={title} user={user} date={date} rate={rate} edited={edited} edited_time={edited_time}/> }
                                            footer={(props) => <Footer {...props} title={title} user={user} rate={rate} text={text} review_id={reviewIDs[i]} navigation={navigation} index={index} currentUser={currentUser}/>}
                                            onPress={() => {
                                                navigation.navigate('ReadReview', {
                                                  title: title,
                                                  user: user,
                                                  rate: rate,
                                                  text: text,
                                                  review_id: reviewIDs[i],
                                                  date: date,
                                                  index: index
                                                });
                                              }}
                                            >
                                                <Text>
                                                    {text}
                                                </Text>
                                            </Card>
                                        </TouchableOpacity>
                                    </Layout> 
                                )
                                
                                // ReactDOM.render(card, document.getElementById('root'));
    
                            })
                        }
                    </React.Fragment>
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