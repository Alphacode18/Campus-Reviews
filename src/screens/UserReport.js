
import React, { useState } from 'react';
import { StyleSheet, Keyboard, TouchWithoutFeedback, TouchOpacity, Alert } from 'react-native';
import { Layout, Button, Input, Text, Spinner, Icon } from '@ui-kitten/components';

import Firebase from '../../config/firebase';

export default userReport = ({navigation}) =>  {
  const [userName, setUsername] = useState('');
  const [reason , setReason] = useState('');

  //TODO: Add implementationa and integrate with Firebase
  const handleUserReport = () => {

  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Layout style={styles.container} level={'1'}>
        <Text category='h1' style={{ padding: 20, marginTop: 50 }}>
          Report a User
        </Text>
        <Input
          style={styles.inputBox}
          placeholder='The user you would like to report'
          value={userName}
          onChangeText={(userName) => setUsername(userName)}
        />
        <Input
          style={styles.inputBox}
          placeholder='The reason for your report.'
          value={reason}
          onChangeText={(reason) => setReason(reason)}
        />
        <Button
          onPress={handleUserReport}
          style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
          appearance='outline'
        >
          <Text>
            Submit User Report
          </Text>
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
    top: 20
  },
  inputBox: {
    width: '85%',
    margin: 0,
    padding: 15,
    fontSize: 16,
    textAlign: 'center',
  },
});

