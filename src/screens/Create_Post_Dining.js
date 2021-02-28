import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Input } from '@ui-kitten/components';

const useInputState = (initialValue = '') => {
    const [value, setValue] = React.useState(initialValue);
    return { value, onChangeText: setValue };
};

export default create_post_dining = ({ navigation }) => {
    const titleState = useInputState();
    const postState = useInputState();

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Layout style={styles.container} level={'1'}> 
                <Text category='h1' style={{ padding: 0, marginTop: 0 }}>
                    Create Post
                </Text>
                
                    <Input
                        multiline={true}
                        textStyle={{ minHeight: 256 }}
                        placeholder='Write text here...'
                        {...postState}
                    />
                <Button
                    style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
                    status={'success'}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={{ color: 'white' }}>Create Post</Text>
                </Button>
            </Layout>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 0,
    padding: 15,
    fontSize: 16,
    textAlign: 'center',
  },
});
