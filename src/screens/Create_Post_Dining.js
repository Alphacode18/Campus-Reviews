import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, textarea} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Input, ViewPager } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';

const useInputState = (initialValue = '') => {
    const [value, setValue] = React.useState(initialValue);
    return { value, onChangeText: setValue };
};

export default create_post_dining = ({ navigation }) => {
    const titleState = useInputState();
    const postState = useInputState();
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}> 
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Layout style={styles.container} level={'1'}> 
                    <ScrollView contentContainerStyle={{flexGrow : 1, width : screenWidth, alignItems: 'center', justifyContent: 'center'}}>
                
                        <Text category='h1' style={{ padding: 20, marginTop: 0 }}> Create Post </Text>
                        <Input
                            style={{width: '90%'}}
                            size='medium'
                            placeholder='Title'
                            {...titleState}
                        />

                        <Input
                            multiline={true}
                            textStyle={{ minHeight: 128, maxHeight: 256}}
                            style={{width: '90%', paddingTop : 5}}
                            placeholder='Enter text here...'
                            numberOfLines={5}

                            {...postState}    
                        />

                        <Button
                            style={{ width: '50%', borderRadius: 20, marginTop: 15 }}
                            status={'success'}
                            onPress={() => navigation.navigate('Home')}
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
