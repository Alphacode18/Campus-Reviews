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
  Divider,
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

const trashIcon = (props) => <Icon {...props} name='trash-2' />;

const editIcon = (props) => <Icon {...props} name='edit-outline' />;

const plusIcon = (props) => <Icon {...props} name='plus' />;

const BackIcon = (props) => <Icon {...props} name='arrow-back' />;

const upIcon = (props) => <Icon {...props} name='arrow-upward-outline' />;

const downIcon = (props) => <Icon {...props} name='arrow-downward-outline' />;



const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

const renderHeader = () => (
  <Layout
    style={{
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Input
      autoCapitalize='none'
      status='info'
      placeholder='Search'
      style={{
        borderRadius: 25,
        borderColor: '#333',
      }}
      textStyle={{ color: '#000' }}
    />
  </Layout>
);

const getDisplayTime = (curTime, time) => {
  const diff = Math.floor((curTime - time) / 1000);
  let ret = '';

  if (diff < 3600) {
    ret = Math.floor(diff / 60) + 'm';
  } else if (diff < 24 * 3600) {
    ret = Math.floor(diff / 3600) + 'h';
  } else if (diff < 365 * 24 * 3600) {
    ret = Math.floor(diff / (24 * 3600)) + 'd';
  } else {
    ret = Math.floor(diff / (365 * 24 * 3600)) + 'y';
  }

  return ret;
};

const Header = ({ props, title, user, edited, editTime, createTime }) => {
  const today = new Date();
  const curTime = today.getTime();

  const editDisplayTime = getDisplayTime(curTime, editTime);
  const createDisplayTime = getDisplayTime(curTime, createTime);
  let headerString = (headerString = '   ' + user + ' | ' + createDisplayTime);
  if (edited) {
    headerString += ' | ' + '(edited ' + editDisplayTime + ')';
  }
  return (
    <View {...props} style={[styles.headerContainer]}>
      <Text category='h6'> {'   ' + title} </Text>
      <Text category='s5' style={{ fontSize: 16 }}>
        {' '}
        {headerString}{' '}
      </Text>
    </View>
  );
};



const Footer = ({
  props,
  title,
  post,
  postID,
  navigation,
  index,
  user,
  currentUser,
  upvoteSet,
  downvoteSet,
  i,
}) => {
  let upvotes = Object.keys(upvoteSet).length;
  let downvotes = Object.keys(downvoteSet).length;
  let dir = 0;

  const [totalVotes, setTotalVotes] = useState(upvotes - downvotes);
  let voteString = totalVotes + '';
  if (totalVotes >= 1000) {
    voteString = (totalVotes / 1000).toFixed(1) + 'k';
  }
  let currentAlias = currentUser.substr(0, currentUser.indexOf('@'));
  if (upvoteSet[currentAlias] == true) dir = 1;
  if (downvoteSet[currentAlias] == true) dir = -1;

  const upIcon = (props) => <Icon {...props} name='arrow-upward-outline' />;

  const downIcon = (props) => <Icon {...props} name='arrow-downward-outline' />;


  return user == currentUser ? (
    
    <React.Fragment>
      <View style={{ flexDirection: 'row', margin: 3 }}>
        <View {...props} style={{ flexDirection: 'row', flex: 0.5, margin: 3 }}>
          <Button
            size={dir > 0 ? 'small' : 'small'}
            status={dir > 0 ? 'warning' : 'basic'}
            appearance={dir > 0 ? 'outline' : 'outline'}
            accessoryLeft={upIcon}
            onPress={() => {
              delete downvoteSet[currentAlias];
              upvoteSet[currentAlias] = true;
              if (dir == 1) {
                delete upvoteSet[currentAlias];
                dir = 0;
              }
              let updates = {};
              let newTotalVotes =
                Object.keys(upvoteSet).length - Object.keys(downvoteSet).length;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'upvoteSet'
              ] = upvoteSet;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'downvoteSet'
              ] = downvoteSet;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'votes'
              ] = newTotalVotes;
              Firebase.database().ref().update(updates);
              posts[i].upvoteSet = upvoteSet;
              posts[i].downvoteSet = downvoteSet;
              setTotalVotes(newTotalVotes);
            }}
          ></Button>
          <Text style={{ marginLeft: 5, marginRight: 5, marginTop: 5 }}>
            {voteString}
          </Text>
          <Button
            size={dir > 0 ? 'small' : 'small'}
            status={dir < 0 ? 'warning' : 'basic'}
            appearance={dir > 0 ? 'outline' : 'outline'}
            accessoryLeft={downIcon}
            onPress={() => {
              delete upvoteSet[currentAlias];
              downvoteSet[currentAlias] = true;
              if (dir == -1) {
                delete downvoteSet[currentAlias];
                dir = 0;
              }
              let updates = {};
              let newTotalVotes =
                Object.keys(upvoteSet).length - Object.keys(downvoteSet).length;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'upvoteSet'
              ] = upvoteSet;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'downvoteSet'
              ] = downvoteSet;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'votes'
              ] = newTotalVotes;
              Firebase.database().ref().update(updates);
              posts[i].upvoteSet = upvoteSet;
              posts[i].downvoteSet = downvoteSet;
              setTotalVotes(newTotalVotes);
            }}
          ></Button>
        </View>
        <View
          {...props}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 0.5,
            margin: 3,
          }}
        >
          <Button
            style={styles.footerControl}
            size='small'
            accessoryLeft={trashIcon}
            status='basic'
            onPress={() => {
              Alert.alert(
                'Confirm Deletion',
                'Are you sure you want to delete this post?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: () => {
                      Firebase.database()
                        .ref(types[index] + ' Posts/' + postID)
                        .remove();
                      navigation.navigate('Loading', {
                        index: index,
                        postType: 'Posts',
                      });
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          ></Button>
          <Button
            style={styles.footerControl}
            size='small'
            accessoryLeft={editIcon}
            onPress={() => {
              navigation.navigate('EditPost', {
                title: title,
                post: post,
                postID: postID,
                index: index,
              });
            }}
          ></Button>
        </View>
      </View>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <View style={{ flexDirection: 'row', margin: 3 }}>
        <View {...props} style={{ flexDirection: 'row', flex: 0.5, margin: 3 }}>
          <Button
            size={dir > 0 ? 'small' : 'small'}
            status={dir > 0 ? 'warning' : 'basic'}
            appearance={dir > 0 ? 'outline' : 'outline'}
            accessoryLeft={upIcon}
            onPress={() => {
              delete downvoteSet[currentAlias];
              upvoteSet[currentAlias] = true;
              if (dir == 1) {
                delete upvoteSet[currentAlias];
                dir = 0;
              }
              let updates = {};
              let newTotalVotes =
                Object.keys(upvoteSet).length - Object.keys(downvoteSet).length;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'upvoteSet'
              ] = upvoteSet;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'downvoteSet'
              ] = downvoteSet;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'votes'
              ] = newTotalVotes;
              Firebase.database().ref().update(updates);
              posts[i].upvoteSet = upvoteSet;
              posts[i].downvoteSet = downvoteSet;
              setTotalVotes(newTotalVotes);
            }}
          ></Button>
          <Text style={{ marginLeft: 5, marginRight: 5, marginTop: 5 }}>
            {voteString}
          </Text>
          <Button
            size={dir < 0 ? 'small' : 'small'}
            status={dir < 0 ? 'warning' : 'basic'}
            appearance={dir < 0 ? 'outline' : 'outline'}
            accessoryLeft={downIcon}
            onPress={() => {
              delete upvoteSet[currentAlias];
              downvoteSet[currentAlias] = true;
              if (dir == -1) {
                delete downvoteSet[currentAlias];
                dir = 0;
              }
              let updates = {};
              let newTotalVotes =
                Object.keys(upvoteSet).length - Object.keys(downvoteSet).length;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'upvoteSet'
              ] = upvoteSet;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'downvoteSet'
              ] = downvoteSet;
              updates[
                '/' + types[index] + ' Posts/' + postID + '/' + 'votes'
              ] = newTotalVotes;
              Firebase.database().ref().update(updates);
              posts[i].upvoteSet = upvoteSet;
              posts[i].downvoteSet = downvoteSet;
              setTotalVotes(newTotalVotes);
            }}
          ></Button>
        </View>
        <View
          {...props}
          style={{
            flexDirection: 'row',
            flex: 0.5,
            justifyContent: 'flex-end',
            margin: 3,
          }}
        >
          <Button appearance='ghost'></Button>
          <Button appearance='ghost'></Button>
        </View>
      </View>
    </React.Fragment>
  );
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
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const sort = route.params.sort;
  let { tempPosts, tempPostIDs } = route.params;
  if (tempPosts != undefined && tempPosts.length > 0) {
    posts = tempPosts;
    postIDs = tempPostIDs;
    console.log('if');
    console.log(tempPosts);
    console.log('posts');
    console.log(posts);
  }
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const ref = Firebase.database().ref(types[index] + ' Posts/');
  let postIDsToPostsMap = new Map();
  console.log('map');
  console.log(postIDsToPostsMap);
  if (tempPosts != undefined && tempPosts.length > 0) {
    for (let idx = 0; idx < tempPosts.length; idx++) {
      postIDsToPostsMap[postIDs[idx]] = posts[idx];
    }
  }

  ref.on('value', (snapshot) => {
    console.log('ref');
    let n = posts.length;
    for (let i = 0; i < n; i++) {
      posts.pop();
      postIDs.pop();
    }
    let index = 0;
    snapshot.forEach(function (data) {
      posts.push(data.toJSON());
      postIDs.push(data.key);
      postIDsToPostsMap[postIDs[index]] = posts[index];
      index++;
    });
  });
  ref.off();
  console.log('map');
  console.log(postIDsToPostsMap[postIDs[0]]);
  if (sort == 1) {
    postIDs.sort(function (b2, a2) {
      let b = postIDsToPostsMap[b2];
      let a = postIDsToPostsMap[a2];

      console.log("a:b");
      console.log(a.createTimestamp);
      console.log(b.createTimestamp);
      
      return a.createTimestamp > b.createTimestamp
        ? 1
        : a.createTimestamp < b.createTimestamp
        ? -1
        : 0;
    });

    posts.sort(function (b, a) {
      return a.createTimestamp > b.createTimestamp
        ? 1
        : a.createTimestamp < b.createTimestamp
        ? -1
        : 0;
      

    });
  } else if (sort == 2) {
    postIDs.sort(function (b2, a2) {
      let b = postIDsToPostsMap[b2];
      let a = postIDsToPostsMap[a2];
      
      console.log("a:b");
      console.log(a.createTimestamp);
      console.log(b.createTimestamp);

      return a.createTimestamp > b.createTimestamp
        ? -1
        : a.createTimestamp < b.createTimestamp
        ? 1
        : 0;
    });

    posts.sort(function (b, a) {
      return a.createTimestamp > b.createTimestamp
        ? -1
        : a.createTimestamp < b.createTimestamp
        ? 1
        : 0;
      

    });
  } else if (sort == undefined) {
    postIDs.sort(function (b2, a2) {
      let b = postIDsToPostsMap[b2];
      let a = postIDsToPostsMap[a2];
      if (a.votes == b.votes) {
        return a.createTimestamp > b.createTimestamp
          ? 1
          : a.createTimestamp < b.createTimestamp
          ? -1
          : 0;
      }

      return a.votes > b.votes ? 1 : -1;
    });

    posts.sort(function (b, a) {
      if (a.votes == b.votes) {
        return a.createTimestamp > b.createTimestamp
          ? 1
          : a.createTimestamp < b.createTimestamp
          ? -1
          : 0;
      }

      return a.votes > b.votes ? 1 : -1;
    });

  } else {
    postIDs.sort(function (b2, a2) {
      let b = postIDsToPostsMap[b2];
      let a = postIDsToPostsMap[a2];
      if (a.votes == b.votes) {
        return a.createTimestamp > b.createTimestamp
          ? 1
          : a.createTimestamp < b.createTimestamp
          ? -1
          : 0;
      }

      return a.votes > b.votes ? 1 : -1;
    });

    posts.sort(function (b, a) {
      if (a.votes == b.votes) {
        return a.createTimestamp > b.createTimestamp
          ? 1
          : a.createTimestamp < b.createTimestamp
          ? -1
          : 0;
      }

      return a.votes > b.votes ? 1 : -1;
    });


  }

  const currentUser = Firebase.auth().currentUser.providerData[0].email.toString();

  const renderItem = (info) => {
    let i = info.index;
    let item = info.item;

    return (
      <Card
        style={styles.card}
        header={(props) => (
          <Header
            {...props}
            title={item.title}
            user={item.user}
            edited={item.edited}
            createTime={item.createTimestamp}
            editTime={item.editTimestamp}
          />
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
            index: index,
            currentUser: currentUser,
            upvoteSet: posts[i].upvoteSet,
            downvoteSet: posts[i].downvoteSet,
            i: i,
            posts: posts,
            postIDs: postIDs,
          });
        }}
      >
        <Text>{item.post}</Text>
      </Card>
    );
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
            <Button
              style={{
                marginTop: 50,
              }}
              title='Back'
              accessoryLeft={BackIcon}
              onPress={() => {
                navigation.navigate('Buffer');
              }}
            />

            <Select style= {
              {minWidth: screenWidth}

            }
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}>
              <SelectItem title='Most Recent'/>
              <SelectItem title='Oldest'/>
              <SelectItem title='None'/>
            </Select>

            <Button
              style={{
                marginTop: 50,
              }}
              title='Back'
              accessoryLeft={upIcon}
              onPress={() => {
                navigation.navigate('Loading', {
                  index: index,
                  postType: 'Posts',
                  sort: 1,
                });
              }}
            />

            <Button
              style={{
                marginTop: 50,
              }}
              title='Back'
              accessoryLeft={downIcon}
              onPress={() => {
                navigation.navigate('Loading', {
                  index: index,
                  postType: 'Posts',
                  sort: 2,
                });
              }}
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
              accessoryLeft={plusIcon}
              onPress={() => {
                navigation.navigate('CreatePost', {
                  index: index,
                  currentUser: currentUser,
                });
              }}
            >
              {' '}
              Create{' '}
            </Button>
            <TouchableOpacity>
              <List
                style={{ maxHeight: 0.6 * screenHeight }}
                data={posts}
                ItemSeparatorComponent={Divider}
                // renderItem={<renderItem navigation={navigation} currentUser={currentUser} postIDs={...postIDs} index={index}/>}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
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
