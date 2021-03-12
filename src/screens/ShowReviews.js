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

const Header = ({props, title, user, date, rate}) => (
    <View {...props} style={[styles.headerContainer]}>
        <Text category='h6'> Topic: {title} </Text>
        <Text category='s1'> User: {user} </Text>
        <Text category='s3'> Rating(#/10): {rate} </Text>
        {/* <Text category='h9'> Date: {date} </Text> */}
    </View>
);

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
    let fields = [];

    Firebase.database()
    .ref(types[index] + ' Reviews/')
    .on('value', (snapshot) => {
      console.log('snapshot');
      console.log(snapshot);
      snapshot.forEach(function (data) {
        console.log('data');
        console.log(data);
        reviews.push(data.key);
      });
    });

    const currentUser = Firebase.auth().currentUser.providerData[0].email;
       
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}> 
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <Layout style={styles.container} level={'1'} > 


                    <Button
                        title='Back'
                        accessoryLeft={BackIcon}
                        onPress = { () => {
                            navigation.navigate('Buffer')
                        }
                            
                        }
                    />
                    <ScrollView contentContainerStyle={{flexGrow : 1, width : screenWidth, alignItems: 'center', justifyContent: 'center'}}>
                    <Text
                        style={{
                            marginTop: 50,
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
                        {reviews.map(function(review_id, i) {
                                Firebase.database().ref(types[index] + ' Reviews/' + review_id).on('value', (snapshot) => {
                                    console.log(types[index] + ' Reviews/' + review_id);
                                    let i = 0;
                                    snapshot.forEach(function(data) {
                                        fields.push(data);
                                        // console.log(data);
                                        i++;
                                    });
                                    // console.log(fields[0]);
                                    
                                });

                                let title = JSON.parse(JSON.stringify(fields[5 * i + 3]));
                                let user = JSON.parse(JSON.stringify(fields[5 * i + 4]));
                                let date = JSON.parse(JSON.stringify(fields[5 * i]));
                                let rate = JSON.parse(JSON.stringify(fields[5 * i + 1]));
                                let text = JSON.parse(JSON.stringify(fields[5 * i + 2]));
                                
                                return  (
                                    <Layout style={styles.container} level={'1'} > 
                                        <TouchableOpacity>
                                            <Card style={styles.card}
                                            header={(props) => <Header {...props} title={title} user={user} date={date} rate={rate}/> }
                                            footer={(props) => <Footer {...props} title={title} user={user} rate={rate} text={text} review_id={review_id} navigation={navigation} index={index} currentUser={currentUser}/>}
                                            onPress={() => {
                                                navigation.navigate('ReadReview', {
                                                  title: title,
                                                  user: user,
                                                  rate: rate,
                                                  text: text,
                                                  review_id: review_id,
                                                  date: date,
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