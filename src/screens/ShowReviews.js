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

const Header = ({props, title, user, date, rate}) => (
    <View {...props}>
        <Text category='h6'> Topic: {title} </Text>
        <Text category='s1'> User: {user} </Text>
        <Text category='s3'> Rating(#/10): {rate} </Text>
        <Text category='h9'> Date: {date} </Text>
    </View>
);

const Footer = ({navigation, props, title, user, rate, text, review_id}) => (
    <View {...props} style={[styles.footerContainer]}>
        <Button
        style={styles.footerControl}
        size='small'
        status='basic' onPress={() => {
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
                    Firebase.database().ref('Classes Reviews/' + review_id).remove();
                    navigation.navigate('ShowReviews');
                }}
                ],
                { cancelable: false }
            );
        }}>
        Delete Review
        </Button>
        <Button
        style={styles.footerControl}
        size='small' onPress= {() => {
            navigation.navigate('EditReview', {review_title: title,
                review_text: text,
                review_type: 2,
                review_rate: rate,
                review_id: review_id});
        }}>
        Edit Review
        </Button>
    </View>
);

export default showReviews = ({navigation}) => {
    const index = 2;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    let classReviews = [];
    let fields = [];

    Firebase.database().ref('Classes Reviews').on('value', (snapshot) => {
        snapshot.forEach(function(data) {
            classReviews.push(data.key);
        });

        console.log(classReviews);
        console.log(classReviews[0]);
    });
       
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}> 
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Layout style={styles.container} level={'1'} > 
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
                        onPress={() => {
                            navigation.navigate('CreateReview', {
                                index: index,
                            });
                        }}
                        >
                        {' '}
                        Create{' '}
                    </Button>
                    <React.Fragment>
                        {classReviews.map(function(review_id, index) {
                                Firebase.database().ref('Classes Reviews/' + review_id).on('value', (snapshot) => {
                                    console.log('Classes Reviews/' + review_id);
                                    let i = 0;
                                    snapshot.forEach(function(data) {
                                        fields.push(data);
                                        // console.log(data);
                                        i++;
                                    });
                                    // console.log(fields[0]);
                                    
                                });

                                let title = JSON.stringify(fields[5 * index + 3]);
                                title = title.replace(/\"/g, "");  
                                let user = JSON.stringify(fields[5 * index + 4]);
                                user = user.replace(/\"/g, "");  
                                let date = JSON.stringify(fields[5 * index]);
                                date = date.replace(/\"/g, "");
                                let rate = JSON.stringify(fields[5 * index + 1]);
                                rate = rate.replace(/\"/g, "");
                                let text = JSON.stringify(fields[5 * index + 2]);
                                text = text.replace(/\"/g, "");
                                
                                return  (
                                    <Layout style={styles.container} level={'1'} > 
                                        <TouchableOpacity>
                                            <Card style={styles.card}
                                            header={(props) => <Header {...props} title={title} user={user} date={date} rate={rate}/> }
                                            footer={(props) => <Footer {...props} title={title} user={user} rate={rate} text={text} review_id={review_id} navigation={navigation}/>}
                                            onPress={() => {
                                                navigation.navigate('ReadReview', {
                                                  title: title,
                                                  user: user,
                                                  rate: rate,
                                                  text: text,
                                                  review_id: review_id,
                                                  date: date
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
  card: {
      flex: 1,
      margin: 2,
      minWidth: '95%',
      maxWidth: '95%',
  },
  inputBox: {
    width: '90%',
    margin: 0,
    padding: 15,
    fontSize: 16,
    textAlign: 'center',
  },
});