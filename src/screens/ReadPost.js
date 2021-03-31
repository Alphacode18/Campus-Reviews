import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Card, Divider, Input, Select, SelectItem, IndexPath, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions, View } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import CommentBody from './CommentBody.js';

const types = ['Dining', 'On-Campus Facilities', 'Classes', 'Professors'];

const upIcon = (props) => (
  <Icon {...props} name='arrow-upward-outline'/>
);

const downIcon = (props) => (
  <Icon {...props} name='arrow-downward-outline'/>
);

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const plusIcon = (props) => (
  <Icon {...props} name='plus'/>
);

const checkIcon = (props) => (
  <Icon {...props} name='checkmark-outline'/>
);

const trashIcon = (props) => (
  <Icon {...props} name='trash-2'/>
);

const editIcon = (props) => (
  <Icon {...props} name='edit-outline'/>
);

const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

const Header = ({props, title}) => (
      <View style={{flexDirection:'row', alignItems:'center', marginTop: '5%', marginBottom: '5%'}}>
        <View style={styles.controlContainer}>
          <Text style={styles.review} status='control'>Post</Text>
        </View>
        <Text category='h5' style={styles.text} status='danger'> {title} </Text>
      </View>
  );

  const Footer = ({ props, title, post, postID, navigation, index, user, currentUser, upvoteSet, downvoteSet, i, posts, postIDs }) => {
    let upvotes = Object.keys(upvoteSet).length;
    let downvotes = Object.keys(downvoteSet).length;  
    let dir = 0;
    
    const [totalVotes, setTotalVotes] = useState(upvotes - downvotes);
    let voteString = totalVotes + "";
    if (totalVotes >= 1000) {
      voteString = (totalVotes/1000).toFixed(1) + "k";
    }
    let currentAlias = currentUser.substr(0, currentUser.indexOf("@"));
    if (upvoteSet[currentAlias] == true)
      dir = 1;
    if (downvoteSet[currentAlias] == true)
      dir = -1;
    
    const upIcon = (props) => (
      <Icon {...props} name='arrow-upward-outline'/>
    );
    
    const downIcon = (props) => (
      <Icon {...props} name='arrow-downward-outline'/>
    );
  
    return user == currentUser ? (
      <React.Fragment>
        <View style={{flexDirection: 'row', margin: 3,}}>
          <View {...props} style={{flexDirection: 'row', flex: 0.5, margin: 3}} >
            <Button size={dir > 0 ? 'small' : 'small'} status={dir > 0 ? 'warning' : 'basic'} appearance={dir > 0 ? 'outline' : 'outline'} accessoryLeft={upIcon} onPress={() => {
                delete downvoteSet[currentAlias];
                upvoteSet[currentAlias] = true;
                if (dir == 1) {
                  delete upvoteSet[currentAlias];
                  dir = 0;
                }
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
            <Text style={{marginLeft: 5, marginRight: 5, marginTop: 5}}>{voteString}</Text>
            <Button size={dir > 0 ? 'small' : 'small'} status={dir < 0 ? 'warning' : 'basic'} appearance={dir > 0 ? 'outline' : 'outline'} accessoryLeft={downIcon} onPress={() => {
                delete upvoteSet[currentAlias];
                downvoteSet[currentAlias] = true;
                if (dir == -1) {
                  delete downvoteSet[currentAlias];
                  dir = 0;
                }
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
          <Button size={dir > 0 ? 'small' : 'small'} status={dir > 0 ? 'warning' : 'basic'} appearance={dir > 0 ? 'outline' : 'outline'} accessoryLeft={upIcon} onPress={() => {
                delete downvoteSet[currentAlias];
                upvoteSet[currentAlias] = true;
                if (dir == 1) {
                  delete upvoteSet[currentAlias];
                  dir = 0;
                }
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
            <Text style={{marginLeft: 5, marginRight: 5, marginTop: 5}}>{voteString}</Text>
            <Button size={dir < 0 ? 'small' : 'small'} status={dir < 0 ? 'warning' : 'basic'} appearance={dir < 0 ? 'outline' : 'outline'} accessoryLeft={downIcon} onPress={() => {
                delete upvoteSet[currentAlias];
                downvoteSet[currentAlias] = true;
                if (dir == -1) {
                  delete downvoteSet[currentAlias];
                  dir = 0;
                }
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
          <View {...props} style={{flexDirection: 'row', flex: 0.5, justifyContent: 'flex-end', margin: 3, }}>
            <Button appearance='ghost'></Button>
            <Button appearance='ghost'></Button>
          </View>
        </View>
        
      </React.Fragment>
      
    )
  };


export default readPost = ({ route, navigation }) => {
    const { title, post, postId, user, index, currentUser, upvoteSet, downvoteSet, i, posts, postIDs } = route.params;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [commentText, setCommentText] = useState('');
    const today = new Date();
    const time = today.getTime();

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <Layout style={styles.container} level={'1'}>

                
                <ScrollView contentContainerStyle={{flexGrow : 1}}>
                <Button style={{

                    marginTop: 50
                    }

                    }
                    title='Back'

                    accessoryLeft={BackIcon}
                    onPress = { () => {
                      navigation.navigate('ShowPosts', {
                        index: index,
                        tempPosts: posts,
                        tempPostIDs: postIDs

                      });
                    }
                      
                    }
                />

                  <Card style={styles.card}
                  header={(props) => <Header {...props} title={title}/> }
                  footer={(props) => (
                    <Footer
                      {...props}
                      title={title}
                      user={user}
                      postID={postId}
                      post={post}
                      navigation={navigation}
                      index={index}
                      user={user}
                      currentUser={currentUser}
                      upvoteSet={upvoteSet}
                      downvoteSet={downvoteSet}
                      i={i}
                      posts={posts}
                      postIDs={postIDs}
                    />
                  )}>
                    <Text style={styles.text} category='p1'>
                      {post}
                    </Text>
                  </Card>
                  
                  <React.Fragment>
                  <View style={{flexDirection:'row',justifyContent:'space-between', marginTop: 8}}>
                    <Input
                        multiline={true}
                        textStyle={{ minHeight: 32, maxHeight: 128, minWidth: 0.8 * screenWidth, maxWidth: 0.8 * screenWidth}}
                        placeholder='Add a comment...'
                        value={commentText}
                        onChangeText={(commentText) => setCommentText(commentText)}  
                      />
                      <Button
                        status='basic'
                        accessoryLeft = {plusIcon}
                        onPress={() => {
                          if (!(commentText === '')) {
                            Firebase.database().ref('/' + types[index] + ' Posts/' + postId + '/Comments/').push({
                              commentText: commentText,
                              user: user,
                              createTimestamp: time,
                              edited: false,
                              editTimestamp: time
                            });
  
                            navigation.navigate('NewLoading', {
                              title: title,
                              post: post,
                              postId: postId,
                              user: user,
                              index: index
                            });
                          }
                          else {
                            Alert.alert('Please add text to your comment!');
                          }
                          
                        }}
                      >
                        {' '}
                        Create{' '}
                      </Button>
                  </View>
                    
                    
                  </React.Fragment>
                  <React.Fragment>
                    <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop: 8}}>
                      <Text style={styles.commentLeft} status='info' category='s1'>PurdueUser44</Text>
                      <Text style={styles.commentRight} category='s1' status='success'>3h</Text>
                    </View>
                      <CommentBody commentText={'hello test'} postId={postId} commentID={'-MWLs-jPybGMi0BpfqyB'} index={index} navigation={navigation} title={title} user={user} post={post}/>
                    <Divider/>
                  </React.Fragment>

                  <React.Fragment>
                    <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop: 8}}>
                      <Text style={styles.commentLeft} status='info' category='s1'>JohnDoe77</Text>
                      <Text style={styles.commentRight} category='s1' status='success'>1h</Text>
                    </View>
                    <Text style={{marginLeft: 16, marginBottom: 8}}>I disagree... meal swipes SUCK!</Text>
                    <Divider/>
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
  commentLeft: {
    margin: 8,
  },
  commentRight: {
    margin: 8,
  },
});
