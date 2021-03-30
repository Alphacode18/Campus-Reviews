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
  TopNavigationAction,
  List,
  Divider

} from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import { useScrollToTop } from '@react-navigation/native';
import { render } from 'react-dom';
// import Post from './Post.js';

const types = ['Dining', 'On-Campus Facilities', 'Classes', 'Professors'];
let posts = [];
let postIDs = [];


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

const upIcon = (props) => (
  <Icon {...props} name='arrow-upward-outline'/>
);

const downIcon = (props) => (
  <Icon {...props} name='arrow-downward-outline'/>
);

const renderBackAction = () => (
  <TopNavigationAction icon={BackIcon}/>
);

const getDisplayTime = (curTime, time) => {
  const diff = Math.floor((curTime - time) / 1000);
  console.log('getdisplay');
  console.log(curTime);
  console.log(time);
  console.log(diff);
  let ret = '';

  if (diff < 3600) {
    ret = Math.floor(diff/60) + 'm';
  } else if (diff < 24*3600) {
    ret = Math.floor(diff/3600) + 'h';
  } else if (diff < 365 * 24 * 3600) {
    ret = Math.floor(diff/(24*3600)) + 'd'
  } else {
    ret = Math.floor(diff/(365 * 24 * 3600)) + 'y';
  }
  console.log(ret);
  return ret;
}

const Header = ({ props, title, user, edited, editTime, createTime }) => {
  const today = new Date();
  const curTime = today.getTime();
  console.log("curTime edit time");
  console.log(curTime);
  console.log(editTime);
  const editDisplayTime = getDisplayTime(curTime, editTime);
  const createDisplayTime = getDisplayTime(curTime, createTime);
  let headerString = headerString = '   ' + user + ' | ' + createDisplayTime;
  if (edited) {
    headerString += ' | ' + "(edited " + editDisplayTime + ")";
  } 
  return (
    <View {...props} style={[styles.headerContainer]}>
      <Text category='h6'> {'   ' + title} </Text>
      <Text category='s5' style={{fontSize: 16}}> {headerString} </Text>
    </View>
  )
};

const Footer = ({ props, title, post, postID, navigation, index, user, currentUser, upvoteSet, downvoteSet, i }) => {
  let upvotes = Object.keys(upvoteSet).length;
  let downvotes = Object.keys(downvoteSet).length;  
  const [totalVotes, setTotalVotes] = useState(upvotes - downvotes);
  let currentAlias = currentUser.substr(0, currentUser.indexOf("@"));
  console.log("editing");
  console.log(postID);
  return user == currentUser ? (
    <React.Fragment>
      <View style={{flexDirection: 'row', margin: 3,}}>
        <View {...props} style={{flexDirection: 'row', flex: 0.5, margin: 3}} >
          <Button size='small' appearance='outline' accessoryLeft={upIcon} onPress={() => {
              delete downvoteSet[currentAlias];
              upvoteSet[currentAlias] = true;
              let updates = {};
              let newTotalVotes = Object.keys(upvoteSet).length - Object.keys(downvoteSet).length;
              updates['/' + types[index] + ' Posts/' + postID + '/' + 'upvoteSet'] = upvoteSet;
              updates['/' + types[index] + ' Posts/' + postID + '/' + 'downvoteSet'] = downvoteSet;
              updates['/' + types[index] + ' Posts/' + postID + '/' + 'votes'] = newTotalVotes;
              Firebase.database().ref().update(updates);
              posts[i].upvoteSet = upvoteSet;
              posts[i].downvoteSet = downvoteSet;
              setTotalVotes(newTotalVotes);
              
          }}></Button>
          <Text style={{marginLeft: 5, marginRight: 5, marginTop: 5}}>{totalVotes}</Text>
          <Button size='small' appearance='outline' accessoryLeft={downIcon} onPress={() => {
              delete upvoteSet[currentAlias];
              downvoteSet[currentAlias] = true;
              let updates = {};
              let newTotalVotes = Object.keys(upvoteSet).length - Object.keys(downvoteSet).length;
              updates['/' + types[index] + ' Posts/' + postID + '/' + 'upvoteSet'] = upvoteSet;
              updates['/' + types[index] + ' Posts/' + postID + '/' + 'downvoteSet'] = downvoteSet;
              updates['/' + types[index] + ' Posts/' + postID + '/' + 'votes'] = newTotalVotes;
              Firebase.database().ref().update(updates);
              posts[i].upvoteSet = upvoteSet;
              posts[i].downvoteSet = downvoteSet;
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
      </View>
      
    </React.Fragment>
    
  ) : (
    <React.Fragment>
      <View style={{flexDirection: 'row', margin: 3,}}>
        <View {...props} style={{flexDirection: 'row', flex: 0.5, margin: 3}} >
          <Button size='small' appearance='outline' accessoryLeft={upIcon}></Button>
          <Text style={{marginLeft: 5, marginRight: 5, marginTop: 5}}>{totalVotes}</Text>
          <Button size='small' appearance='outline' accessoryLeft={downIcon}></Button>
        </View>
        <View {...props} style={{flexDirection: 'row', flex: 0.5, justifyContent: 'flex-end', margin: 3, }}>
          <Button appearance='ghost'></Button>
          <Button appearance='ghost'></Button>
        </View>
      </View>
      
    </React.Fragment>
    
  )
};


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
  

  Firebase.database()
    .ref(types[index] + ' Posts/')
    .on('value', (snapshot) => {
      console.log('snapshot');
      console.log(snapshot);
      let n = posts.length;
      for (let i = 0; i < n; i++) {
        posts.pop();
        postIDs.pop();
      }
      let index = 0;
      snapshot.forEach(function (data) {
        console.log('data');
        console.log(data);
        console.log(data.toJSON().title);
        posts.push(data.toJSON());
        postIDs.push(data.key);
        index++;
      });
      console.log(postIDs);
  });

  const currentUser = (Firebase.auth().currentUser.providerData[0].email).toString();
  // currentUser = currentUser.substr(0, currentUser.indexOf("@"));

  const renderItem = (info) => {
    let i = info.index;
    let item = info.item;
    console.log("postid");
    console.log(item.key);
    return (
      <Card
        style={styles.card}
        header={(props) => (
          <Header {...props} title={item.title} user={item.user} edited={item.edited} createTime={item.createTimestamp} editTime={item.editTimestamp} />
        )}
        footer={(props) => (
          <Footer
            {...props}
            title={item.title}
            user={item.user}
            postID={postIDs[i]}
            post={item.post}
            navigation={navigation}
            index={index}
            user={item.user}
            currentUser={currentUser}
            upvoteSet={item.upvoteSet}
            downvoteSet={item.downvoteSet}
            i={i}
          />
        )}
        onPress={() => {
          navigation.navigate('ReadPost', {
            title: item.title,
            post: item.post,
            postId: postIDs[i],
            user: item.user,
            index: index
    
          });
        }}
      >
        <Text>{item.post}</Text>
      </Card>
    )
  };

  

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
            <TouchableOpacity>
              <List
                style={{maxHeight : 0.6*screenHeight}}
                data={posts}
                ItemSeparatorComponent={Divider}
                // renderItem={<renderItem navigation={navigation} currentUser={currentUser} postIDs={...postIDs} index={index}/>}
                renderItem={renderItem}
              />
            </TouchableOpacity>       
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
