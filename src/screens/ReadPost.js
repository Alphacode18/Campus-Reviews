import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Card, Divider, List, Input, Select, SelectItem, IndexPath, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions, View } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import CommentBody from './CommentBody.js';

const types = ['Dining', 'On-Campus Facilities', 'Classes', 'Professors'];

let comments = []
let commentIDs = []

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

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const plusIcon = (props) => (
  <Icon {...props} name='plus'/>
);

const UpArrowIcon = (props) => (
  <Icon {...props} name='arrow-upward-outline'/>
);

const DownArrowIcon = (props) => (
  <Icon {...props} name='arrow-downward-outline'/>
);

const editIcon = (props) => (
  <Icon {...props} name='edit-outline'/>
);

const checkIcon = (props) => (
  <Icon {...props} name='checkmark-outline'/>
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

const Footer = ({props, user}) => (
    <View {...props} style={[styles.footerContainer]}>
        <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
            <Button size='small' accessoryLeft={UpArrowIcon}></Button>
            <Text>300</Text>
            <Button size='small' accessoryLeft={DownArrowIcon}></Button>

            <Text status='info' category='s1'>by: {user}</Text>
            <Text status='success' category='s1'>9d</Text>

        </View>
    </View>
);


export default readPost = ({ route, navigation }) => {
    const { title, post, postId, user, index } = route.params;

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [commentText, setCommentText] = useState('');
    const today = new Date();
    const time = today.getTime();

    Firebase.database()
    .ref('/' + types[index] + ' Posts/' + postId + '/Comments/')
    .on('value', (snapshot) => {
      console.log('snapshot');
      console.log(snapshot);
      let n = comments.length;
      for (let i = 0; i < n; i++) {
        comments.pop();
        commentIDs.pop();
      }
      let index = 0;
      snapshot.forEach(function (data) {
        console.log('data');
        console.log(data);
        console.log(data.toJSON().title);
        comments.push(data.toJSON());
        commentIDs.push(data.key);
        index++;
      });
      console.log(postId);
    });

    const currentUser = Firebase.auth().currentUser.providerData[0].email;

    const renderItem = (info) => {
      let i = info.index;
      let item = info.item;
      //console.log("postid");
      //console.log(item.key);
      const today = new Date();
      const curTime = today.getTime();
      const editDisplayTime = getDisplayTime(curTime, item.editTimestamp);
      const createDisplayTime = getDisplayTime(curTime, item.createTimestamp);
      let headerString = headerString = createDisplayTime;
      if (item.edited) {
        headerString += ' | ' + "(edited " + editDisplayTime + ")";
      } 
      return (
        <React.Fragment>
          <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop: 8}}>
            <Text style={styles.commentLeft} status='info' category='s1'>{item.user}</Text>
            <Text style={styles.commentRight} category='s1' status='success'>{headerString}</Text>
           </View>
          <CommentBody commentText={item.commentText} postId={postId} commentID={commentIDs[i]} index={index} navigation={navigation} title={title} user={user} post={post}/>
           <Divider/>
        </React.Fragment>

      )
    };

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
                        index: index
                      });
                    }
                      
                    }
                />

                  <Card style={styles.card}
                  header={(props) => <Header {...props} title={title}/> }
                  footer={(props) => <Footer {...props} user={user}/> }>
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
                  <TouchableOpacity>
                    <List
                      style={{maxHeight : 0.6*screenHeight}}
                      data={comments}
                      ItemSeparatorComponent={Divider}
                      // renderItem={<renderItem navigation={navigation} currentUser={currentUser} postIDs={...postIDs} index={index}/>}
                      renderItem={renderItem}
                    />
                  </TouchableOpacity>  
                  

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
