import React, { useState, ReactDOM } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, View} from 'react-native';
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath, Icon, Card } from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import { useScrollToTop } from '@react-navigation/native';

const typeVal = [
    'Dining',
    'On-Campus Facilities',
    'Classes',
    'Professors'
  ];

  const rateVal = [
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
        <Text category='h6'> Topic: {JSON.stringify(title)} </Text>
        <Text category='s1'> User: {JSON.stringify(user)} </Text>
        <Text category='s3'> Rating(#/10): {JSON.stringify(rate)} </Text>
        <Text category='h9'> Date: {JSON.stringify(date)} </Text>
    </View>
);

const Footer = ({navigation, props, title, user, rate, text}) => (
    <View {...props} style={[styles.footerContainer]}>
        <Button
        style={styles.footerControl}
        size='small'
        status='basic'>
        Delete
        </Button>
        <Button
        style={styles.footerControl}
        size='small' onPress= {() => {
            navigation.navigate('EditReview', {review_title: title,
                review_text: text,
                review_type: 2,
                review_rate: rate});
        }}>
        Edit Review
        </Button>
    </View>
);

export default showReviews = ({navigation}) => {
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
                    <React.Fragment>
                        {classReviews.map(function(review_text, index) {
                                Firebase.database().ref('Classes Reviews/' + review_text).on('value', (snapshot) => {
                                    console.log('Classes Reviews/' + review_text);
                                    let i = 0;
                                    snapshot.forEach(function(data) {
                                        fields.push(data);
                                        // console.log(data);
                                        i++;
                                    });
                                    // console.log(fields[0]);
                                    
                                });
                                
                                return  (
                                    <Layout style={styles.container} level={'1'} > 
                                        <Card style={styles.card}
                                         header={(props) => <Header {...props} title={JSON.stringify(fields[5 * index + 3])} user={JSON.stringify(fields[5 * index + 4])} date={JSON.stringify(fields[5 * index])} rate={JSON.stringify(fields[5 * index + 1])}/> }
                                         footer={(props) => <Footer {...props} title={JSON.stringify(fields[5 * index + 3])} user={JSON.stringify(fields[5 * index + 4])} rate={JSON.stringify(fields[5 * index + 1])} text={JSON.stringify(fields[5 * index + 2])} navigation={navigation}/>}>
                                            <Text>
                                                {JSON.stringify(fields[5 * index + 2])}
                                            </Text>
                                        </Card>
                                    </Layout> 
                                )

                                // console.log(card);
                                
                                // ReactDOM.render(card, document.getElementById('root'));
    
                            })
                        }
                        <Layout style={styles.container} level={'1'} > 
                            <Card style={styles.card} header={Header} footer={Footer}>
                                <Text>
                                    {JSON.stringify(fields[1])}
                                </Text>
                            </Card>
                        </Layout>   
                    </React.Fragment>
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