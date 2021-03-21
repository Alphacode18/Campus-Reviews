import React, { useState, ReactDOM, useReducer } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Layout,
  Text,
  Button,
  Input,
  Select,
  SelectItem,
  IndexPath,
  Icon,
  Card,
  TopNavigation,
  TopNavigationAction

} from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import { useScrollToTop } from '@react-navigation/native';
import { render } from 'react-dom';
// import Post from './Post.js';

const types = ['Dining', 'On-Campus Facilities', 'Classes', 'Professors'];

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
  <TopNavigationAction icon={BackIcon}/>
);

const Header = ({ props, title, user }) => (
  <View {...props} style={[styles.headerContainer]}>
    <Text category='h6'> {'   ' + title} </Text>
    <Text category='s1'> {'   ' + user} </Text>
  </View>
);

const Footer = ({ props, title, post, postID, navigation, index, user, currentUser }) => {
  return user == currentUser ? (
    <View {...props} style={[styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size='small'
        accessoryLeft = {trashIcon}
        status='basic' onPress={() => {
            Alert.alert(
                "Confirm Deletion",
                "Are you sure you want to delete this post?",
                [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Delete", onPress: () => {
                    Firebase.database().ref(types[index] + ' Posts/' + postID).remove();
                    navigation.navigate('ShowPosts');
                }}
                ],
                { cancelable: false }
            );
        }}>
        </Button>
        <Button
        style={styles.footerControl}
        size='small' 
        accessoryLeft= {editIcon}
        onPress= {() => {
            navigation.navigate('EditPost', {
                title: title,
                post: post,
                postID: postID,
                index: index
            });
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

const renderIcon = ({ props, navigation }) => (
  <TouchableWithoutFeedback
    onPress={() => {
      navigation.navigate('CreatePost', {
        title: title,
        post: postText,
        postId: post,
      });
    }}
  >
    <Icon {...props} name={'plus-outline'} />
  </TouchableWithoutFeedback>
);


export default showPosts = ({ navigation, route }) => {
  const index = route.params.index;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  let posts = [];
  let fields = [];
  let postSnaps = [];

  Firebase.database()
    .ref(types[index] + ' Posts/')
    .on('value', (snapshot) => {
      console.log('snapshot');
      console.log(snapshot);
      snapshot.forEach(function (data) {
        console.log('data');
        console.log(data);
        console.log(data.toJSON().title);
        posts.push(data.key);
      });
    });

  const currentUser = Firebase.auth().currentUser.providerData[0].email;
  

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout style={styles.container} level={'1'}>

          
          
        


          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              width: screenWidth,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >

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
                marginTop: 50,
                marginBottom: 20,
                fontSize: 36,
                marginHorizontal: 2,
              }}
            >
              {' '}
              {types[index]}{' '}
            </Text>
            {/* <Button
                            style={styles.button}
                            appearance='ghost'
                            accessoryARight={renderIcon}
                        /> */}
            <Button
              status='basic'
              accessoryLeft = {plusIcon}
              onPress={() => {
                navigation.navigate('CreatePost', {
                  index: index,
                  currentUser: currentUser
                });
              }}
            >
              {' '}
              Create{' '}
            </Button>

            <React.Fragment>
              {posts.map(function (post, i) {
                console.log("test");
                console.log(posts[i]);
                Firebase.database()
                  .ref(types[index] + ' Posts/' + post)
                  .on('value', (snapshot) => {
                    console.log(types[index] + ' Posts' + post);
                    let i = 0;
                    console.log(snapshot);
                    postSnaps.push(snapshot);
                    console.log("snap test");
                    console.log(snapshot.title);
                    snapshot.forEach(function (data) {
                      fields.push(data);
                      // console.log(data);
                      i++;
                    });
                    console.log(fields[0]);
                  });

                let user = JSON.stringify(fields[3 * i + 2]);
                console.log('user');
                console.log(user.replace(/\"/g, ''));
                user = user.replace(/\"/g, '');

                let title = JSON.parse(JSON.stringify(fields[3 * i + 1]));
                console.log('title');
                console.log(title);

                let postText = JSON.stringify(fields[3 * i]);
                console.log('postText');
                console.log(postText.replace(/\"/g, ''));
                postText = postText.replace(/\"/g, '');
                console.log(postText);

                return (
                  <Layout style={styles.container} level={'1'}>
                    <TouchableOpacity>
                      <Card
                        style={styles.card}
                        header={(props) => (
                          <Header {...props} title={title} user={user} />
                        )}
                        footer={(props) => (
                          <Footer
                            {...props}
                            title={title}
                            user={user}
                            postID={post}
                            post={postText}
                            navigation={navigation}
                            index={index}
                            user={user}
                            currentUser={currentUser}
                          />
                        )}
                        onPress={() => {
                          navigation.navigate('ReadPost', {
                            title: title,
                            post: postText,
                            postId: post,
                            user: user,
                            index: index
              
                          });
                        }}
                      >
                        <Text>{postText}</Text>
                      </Card>
                    </TouchableOpacity>
                  </Layout>
                );
              })}
            </React.Fragment>
            <Text style={{ marginBottom: 20 }}></Text>
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
