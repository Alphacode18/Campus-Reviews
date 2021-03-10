import React, { useState, ReactDOM, useReducer } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, View, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath, Icon, Card } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import { useScrollToTop } from '@react-navigation/native';
// import Post from './Post.js';


const types = [
    'Dining',
    'On-Campus Facilities',
    'Classes',
    'Professors'
  ];

const Header = ({props, title, user}) => (
    <View {...props}>
        <Text category='h6'> {JSON.stringify(title)} </Text>
        <Text category='s1'> {JSON.stringify(user)} </Text>
    </View>
);

const Footer = ({props, title, post, postID, navigation}) => (
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
            navigation.navigate('EditPost', {
                title: title,
                post: post,
                postID: postID,
                index: 0
            });
        }}>
        Edit
        </Button>
    </View>
);

async function readData(diningPosts) {

}

export default showPosts = ({navigation}) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    let diningPosts = [];
    let fields = [];
    // readData(diningPosts);
    Firebase.database().ref('Dining Posts').on('value', (snapshot) => {
        console.log('snapshot');
        console.log(snapshot);
        snapshot.forEach(function(data) {
            // let str = JSON.stringify(data.key)
            // diningPosts.push(str.substring(2, str.length));
            console.log("data")
            console.log(data);
            diningPosts.push(data.key);
        });
    });
    
    console.log('dining posts');
    console.log(diningPosts);
    

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}> 
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Layout style={styles.container} level={'1'} > 
                    <ScrollView contentContainerStyle={{flexGrow : 1, width : screenWidth, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{marginTop: 50, marginBottom: 20, fontSize: 36}}> Dining </Text>
                    <React.Fragment>
                        {diningPosts.map(function(post, index) {
                                Firebase.database().ref('Dining Posts/' + post).on('value', (snapshot) => {
                                    console.log('Dining Posts/' + post);
                                    let i = 0;
                                    snapshot.forEach(function(data) {
                                        fields.push(data);
                                        // console.log(data);
                                        i++;
                                    });
                                    // console.log(fields[0]);
                                    
                                });

                                let user = JSON.stringify(fields[3 * index + 2]);
                                user = user.replace(/\"/g, "");  
                                let title = JSON.stringify(fields[3 * index + 1]);
                                title = title.replace(/\"/g, "");  
                                let postText = JSON.stringify(fields[3 * index]);
                                postText = postText.replace(/\"/g, "");

                                
                                return  (
                                    
                                        <Layout style={styles.container} level={'1'}> 
                                            <TouchableOpacity >
                                                <Card style={styles.card}
                                                    header={(props) => <Header {...props} title={title} user={user} /> }
                                                    footer={(props) => <Footer {...props} title={title} user={user} postID={post} post={postText} navigation={navigation}/>} onPress={() => {
                                                        navigation.navigate('ReadPost', {
                                                            title: title,
                                                            post: postText,
                                                            postId: post,
                                                        });
                                                    }}>
                                                    <Text>
                                                        {postText}
                                                    </Text>
                                                </Card>
                                            </TouchableOpacity>
                                        </Layout>   
                                    
                                )

                                // console.log(card);
                                
                                // ReactDOM.render(card, document.getElementById('root'));
    
                            })
                        }
                        {/* <Layout style={styles.container} level={'1'} > 
                            <Card style={styles.card} header={Header} footer={Footer}>
                                <Text>
                                    {JSON.stringify(fields[1])}
                                </Text>
                            </Card>
                        </Layout>    */}
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
    margin: 2,
    minWidth:'95%',
    maxWidth:'95%',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
