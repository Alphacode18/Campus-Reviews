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
    
  }
}
