import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, textarea, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath, Icon } from '@ui-kitten/components';
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

const ExitIcon = (props) => <Icon {...props} name='close-outline' />;

export default createPost = ({ navigation, route }) => {
    const index = route.params.index;
    const currentUser = route.params.currentUser;
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(index));
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const displayValue = types[selectedIndex.row];
    const today = new Date();
    const time = today.getTime();
        
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}> 
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Layout style={styles.container} level={'1'} > 
                {/* <Button accessoryCenter={ExitIcon} style={{color: 'white', borderColor: 'white', position: 'absolute', top:'7%', left: '70%' }} onPress={() => navigation.navigate('Home')}> </Button>  */}
                
                    <ScrollView contentContainerStyle={{flexGrow : 1, width : screenWidth, alignItems: 'center', justifyContent: 'center'}}>
                    <Button status='basic' onPress={() => navigation.navigate('ShowPosts')}> Back </Button>
                        <Text category='h1' style={{ padding: 20, marginTop: 0 }}> Create Post </Text>
                        <Select
                            placeholder='Default'
                            selectedIndex={selectedIndex}
                            value={displayValue}
                            style={{width: '90%'}} disabled>
                            <SelectItem title='Dining' style={{}}/>
                            <SelectItem title='On-Campus Facilities'/>
                            <SelectItem title='Classes'/>
                            <SelectItem title='Professors'/>
                        </Select>
                        <Input
                            style={{width: '90%', paddingTop : 10}}
                            size='medium'
                            placeholder='Title'
                            value={title}
                            onChangeText={(title) => setTitle(title)}
                        />

                        <Input
                            multiline={true}
                            textStyle={{ minHeight: 256, maxHeight: 256}}
                            style={{width: '90%', paddingTop : 5}}
                            placeholder='Enter text here...'
                            value={post}
                            onChangeText={(post) => setPost(post)}  
                        />

                        <Button
                            style={{ width: '50%', borderRadius: 20, marginTop: 25 }}
                            status={'success'}
                            onPress={() => {
                                if (!(title === '' || post === '')) {
                                    Firebase.database().ref('/' + types[selectedIndex.row] + ' Posts').push({
                                        title: title,
                                        post: post,
                                        user: currentUser,
                                        createTimestamp: time,
                                        edited: false,
                                        editTimestamp: time,
                                        votes: 0,
                                        upvoteSet: {temp: true},
                                        downvoteSet: {temp: true}
                                    });
                                    
                                    navigation.navigate('Loading', {
                                        index: index,
                                        postType: 'Posts'
                                    });
                                } else {
                                    Alert.alert('Please fill in all the information for your post.');
                                }
                            }}
                        >
                            <Text style={{ color: 'white' }}>Create Post</Text>
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
