import React, { useState } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import firebase from '../../../config/firebase';
import { Alert } from 'react-native';

export default ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        Alert.alert('Something went wrong');
      });
  };
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onPress={handleLogout}
        style={{ width: '50%', borderRadius: 5 }}
        appearance='outline'
      >
        {loading === false ? <Text>Logout</Text> : <Spinner size='small' />}
      </Button>
    </Layout>
  );
};
