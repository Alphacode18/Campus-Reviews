import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, textarea} from 'react-native';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Card, Divider, Input, Select, SelectItem, IndexPath, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
//import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions, View } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';

const typeVal = [
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

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

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


export default readReview = ({ route, navigation }) => {
    const { title, user, rate, text, review_id, date } = route.params;

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <Layout style={styles.container} level={'1'}>

                <TopNavigation
                  title='Back'
                  accessoryLeft={renderBackAction}
                />
                    <ScrollView contentContainerStyle={{flexGrow : 1}}>
                    <Card style={styles.card} 
                    header={(props) => <Header {...props} title={title} user={user} date={date} rate={rate}/> }
                    footer={(props) => <Footer {...props} title={title} user={user} rate={rate} text={text} review_id={review_id} navigation={navigation}/>}>
                      <Text style={styles.text} category='s2'>
                        {text}
                      </Text>
                    </Card>
                    {/* <React.Fragment>
                      <View style={styles.details}>
                        <Text style={styles.title} category='h6'>Comment</Text>
                      </View>
                      <Divider/>
                    </React.Fragment>
                    <React.Fragment>
                      <View style={styles.details}>
                        <Text style={styles.title} category='h6'>Comment</Text>
                      </View>
                      <Divider/>
                    </React.Fragment>
                    <React.Fragment>
                      <View style={styles.details}>
                        <Text style={styles.title} category='h6'>Comment</Text>
                      </View>
                      <Divider/>
                    </React.Fragment>
                    <React.Fragment>
                      <View style={styles.details}>
                        <Text style={styles.title} category='h6'>Comment</Text>
                      </View>
                      <Divider/>
                    </React.Fragment> */}
                    <React.Fragment>
                      <View style={styles.details}>
                        <Text style={{marginBottom: 50}}></Text>
                        <Text style={styles.title} category='h6'>Example Comment</Text>
                        <Card style={styles.card}>
                        </Card>
                        <Text style={{marginBottom: 50}}></Text>
                      </View>
                      <Divider/>

                    </React.Fragment>

                    <Button
                        style={styles.footerControl}
                        size='medium' onPress= {() => {
                            navigation.navigate('ShowReviews');
                        }}>
                        Done viewing review
                    </Button>

                        {/*<TouchableOpacity
                           style={{ color: 'white', marginTop: 120  }}
                           onPress={() => navigation.navigate('ShowReviews')}
                        >
                        <Button style={styles.button} size='medium'> Done viewing review </Button>
                        </TouchableOpacity>*/}
                    </ScrollView>
                </Layout>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  review: {
    margin: 4,
    textAlign: 'center',
  },
  controlContainer: {
    borderRadius: 4,
    margin: 4,
    padding: 4,
    width: '20%',
    backgroundColor: '#3366FF',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  title: {
    marginHorizontal: 8,
  },
  installButton: {
    marginVertical: 4,
  },
});