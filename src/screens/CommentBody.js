import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Card, Divider, Input, Select, SelectItem, IndexPath, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions, View } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';

export default CommentBody = ({commentText, postId, commentID, navigation}) => {
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