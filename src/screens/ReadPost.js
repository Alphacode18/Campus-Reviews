import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Card, Divider, Input, Select, SelectItem, IndexPath, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions, View } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';

const types = ['Dining', 'On-Campus Facilities', 'Classes', 'Professors'];

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

const CommentBody = ({commentText, postId, commentID, navigation}) => {
    const [editCommentText, setEditCommentText] = useState(commentText);
    const [editing, setEditing] = useState(false);
    if (editing) {
      <React.Fragment>
        <View style={{flexDirection:'row',justifyContent:'space-between', marginTop: 8}}>
          <Input
            multiline={true}
            textStyle={{ minHeight: 32, maxHeight: 128, minWidth: 0.8 * screenWidth, maxWidth: 0.8 * screenWidth}}
            placeholder='Enter text here...'
            value={editCommentText}
            onChangeText={setEditCommentText}
          />
          <Button
            status='basic'
            accessoryLeft = {checkIcon}
            onPress={() => {
              if (!(editCommentText === '')) {
                setEditing(false);
                const today = new Date();
                const datetime = today.getTime();
                let updates = {};
                updates['/' + types[index] + ' Posts/' + postId + '/Comments/' + commentID + '/' + 'commentText'] = editCommentText;
                updates['/' + types[index] + ' Posts/' + postId + '/Comments/' + commentID + '/' + 'edited'] = true;
                updates['/'+ types[index] + ' Posts/' + postId + '/Comments/' + commentID + '/' + 'editTimestamp'] = datetime;
                Firebase.database().ref().update(updates);
                
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
            Done{' '}
          </Button>
        </View>
      </React.Fragment>

    }
    else {
      <React.Fragment>
        <View style={{flexDirection:'row',justifyContent:'space-between', marginTop: 8}}>
          <Text style={{marginLeft: 16, marginBottom: 8}}>{editCommentText}</Text>
          <Button
          style={styles.footerControl}
          size='small' 
          accessoryLeft={editIcon}
          onPress= {() => {
              setEditing(true);
          }}>
          
          </Button>
        </View>
      </React.Fragment>
    }
  };

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
                  <React.Fragment>
                    <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop: 8}}>
                      <Text style={styles.commentLeft} status='info' category='s1'>PurdueUser44</Text>
                      <Text style={styles.commentRight} category='s1' status='success'>3h</Text>
                    </View>
                      <CommentBody commentText={'hello test'} postId={postId} commentID={-MWLs-jPybGMi0BpfqyB} navigation={navigation}/>
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
