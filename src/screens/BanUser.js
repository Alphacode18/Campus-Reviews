import React, { useState } from 'react';
import { StyleSheet, Keyboard, TouchWithoutFeedback, TouchOpacity, Alert } from 'react-native';
import { Layout, Button, Input, Text, Spinner, Icon } from '@ui-kitten/components';

import Firebase from '../../config/firebase';

export default editUsername = ({navigation}) =>  {
  const [userName, setUsername] = useState('');
  const [confirmUsername , setConfirmUsername] = useState('');

  //TODO: Add implementationa and integrate with Firebase
  const handleEditUsername = () => {

  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Layout style={styles.container} level={'1'}>
        <Text category='h1' style={{ padding: 20, marginTop: 50 }}>
          Edit your User Name
        </Text>
        <Input
          style={styles.inputBox}
          placeholder='New User Name'
          value={userName}
          onChangeText={(userName) => setUsername(userName)}
        />
        <Input
          style={styles.inputBox}
          placeholder='Confirm User Name'
          value={confirmUsername}
          onChangeText={(confirmUserName) => setConfirmUsername(confirmUsername)}
        />
        <Button
          onPress={handleEditUsername}
          style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
          appearance='outline'
        >
          <Text>
            Change User Name
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

