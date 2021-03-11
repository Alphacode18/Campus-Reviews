import React, { useState } from 'react';
import { Layout, Text, Button, Spinner } from '@ui-kitten/components';
import firebase from '../../../config/firebase';
import { Alert } from 'react-native';

export default ProfileScreen = ({ navigation }) => {
  const user = firebase.auth().currentUser;
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setLoading(true);
      })
      .catch((error) => {
        Alert.alert('Something went wrong');
      });
  };
  const handleDelete = () => {
    user
      .delete()
      .then(() => {
        setLoading(true);
      })
      .catch(function (error) {
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
      <Button
        onPress={handleDelete}
        style={{ width: '50%', borderRadius: 5, marginTop: 25 }}
        appearance='outline'
      >
        {loading === false ? (
          <Text>Delete Account</Text>
        ) : (
          <Spinner size='small' />
        )}
      </Button>
    </Layout>
  );
};
