import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Card, Divider, Input, Select, SelectItem, IndexPath, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions, View } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';

const types = ['Dining', 'On-Campus Facilities', 'Classes', 'Professors'];

const editIcon = (props) => (
  <Icon {...props} name='edit-outline'/>
);

const trashIcon = (props) => (
  <Icon {...props} name='trash-2'/>
);

const checkIcon = (props) => (
  <Icon {...props} name='checkmark-outline'/>
);

export default CommentBody = ({commentText, postId, commentID, index, navigation, title, user, post}) => {
    const [editCommentText, setEditCommentText] = useState(commentText);
    const [editing, setEditing] = useState(false);
    const screenWidth = Dimensions.get('window').width;

    return editing ? (
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

    ) : (
      <React.Fragment>
        <View style={{flexDirection:'row',justifyContent:'flex-end', marginTop: 10, marginBottom: 10}}>
          <Text style={{marginLeft: 16, marginBottom: 10, marginRight:190}}>{editCommentText}</Text>
          <Button
          style={{
            marginRight:10
          }
            
          }
          size='small' 
          accessoryLeft={editIcon}
          onPress= {() => {
              setEditing(true);
          }}>
          </Button>

          <Button
          
          size='small' 
          accessoryLeft={trashIcon}
          onPress= {() => {
            Alert.alert(
              "Confirm Deletion",
              "Are you sure you want to delete this Comment?",
              [
              {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
              },
              { text: "Delete", onPress: () => {
                  Firebase.database().ref(types[index] + ' Posts/' + postId + '/Comments/' + commentID).remove();
                  navigation.navigate('NewLoading', {
                    title: title,
                    post: post,
                    postId: postId,
                    user: user,
                    index: index
                  });
              }}
              ],
              { cancelable: false }
          );
          }}>
          
          </Button>
        </View>
      </React.Fragment>
    )
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
    footerControl: {
      marginHorizontal: 2,
    },
  });