import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, textarea, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';

const types = [
    'Dining',
    'On-Campus Facilities',
    'Classes',
    'Professors'
  ];

export default editPost = ({ route, navigation }) => {
    const { title, post, postID, index } = route.params;
    const [newTitle, setNewTitle] = useState(title);
    const [newPost, setNewPost] = useState(post);
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(index));
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const displayValue = types[selectedIndex.row];

    const changeSelection = (selectedIndex) => {
        setSelectedIndex(selectedIndex);
      };
        
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}> 
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Layout style={styles.container} level={'1'}> 
                    <ScrollView contentContainerStyle={{flexGrow : 1, width : screenWidth, alignItems: 'center', justifyContent: 'center'}}>
                        <Text category='h1' style={{ padding: 20, marginTop: 0 }}> Edit Post </Text>
                        <Select
                            selectedIndex={selectedIndex}
                            value={displayValue}
                            onSelect={changeSelection}
                            style={{width: '90%'}} disabled>
                            <SelectItem title='Dining'/>
                            <SelectItem title='On-Campus Facilities'/>
                            <SelectItem title='Classes'/>
                            <SelectItem title='Professors'/>
                        </Select>
                        <Input
                            style={{width: '90%', paddingTop : 10}}
                            size='medium'
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />

                        <Input
                            multiline={true}
                            textStyle={{ minHeight: 256, maxHeight: 256}}
                            style={{width: '90%', paddingTop : 5}}
                            value={newPost}
                            onChangeText={setNewPost}    
                        />

                        <Button
                            style={{ width: '50%', borderRadius: 20, marginTop: 25 }}
                            status={'success'}
                            onPress={() => {
                                
                                if (!(newTitle === '' || newPost === '')) {
                                    let updates = {};
                                    const today = new Date();
                                    const time = today.getTime();
                                    updates['/' + types[index] + ' Posts/' + postID + '/' + 'post'] = newPost;
                                    updates['/' + types[index] + ' Posts/' + postID + '/' + 'title'] = newTitle;
                                    updates['/' + types[index] + ' Posts/' + postID + '/' + 'edited'] = true;
                                    updates['/' + types[index] + ' Posts/' + postID + '/' + 'editTimestamp'] = time;
                                    Firebase.database().ref().update(updates);
                                    navigation.navigate('Loading', {index : index, postType: 'Posts'});
                                } 
                                else {
                                    Alert.alert('Please fill in all the information for your post.');
                                }
                            }}
                        >
                            <Text style={{ color: 'white' }}>Edit Post</Text>
                        </Button>
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
});
