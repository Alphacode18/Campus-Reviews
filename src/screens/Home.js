import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';

export default register = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Layout style={styles.container} level={'1'}>
        <Text category='h1' style={{ padding: 20, marginTop: 50 }}>
          Campus Reviews
        </Text>
        <Button
          style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
          status={'success'}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={{ color: 'white' }}>Sign Up</Text>
        </Button>
        <Button
          style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
          appearance='filled'
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ color: 'white' }}>Login</Text>
        </Button>
        <Button
          style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
          appearance='filled'
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Text style={{ color: 'white' }}>Create Post</Text>
        </Button>
        <Button
          style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
          appearance='filled'
          onPress={() => navigation.navigate('CreateReview')}
        >
          <Text style={{ color: 'white' }}>Create Review</Text>
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
