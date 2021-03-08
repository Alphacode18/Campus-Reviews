//TODO: Integrate with the latest version of homescreen
import React, { useState } from 'react';
import { StyleSheet, Keyboard, TouchWithoutFeedback, TouchOpacity, Alert } from 'react-native';
import { Layout, Button, Input, Text, Spinner, Icon } from '@ui-kitten/components';

import Firebase from '../../config/firebase';

export default editUsername = ({navigation}) =>  {
  //const [userName, setUsername] = useState('');
  //const [confirmUsername , setConfirmUsername] = useState('');

 // const handleEditUsername = () => {

//};

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Layout style={styles.container} level={'1'}>
        <Text category='h1' style={{ padding: 20, marginTop: 50 }}>
          FAQS
        </Text>
          <Text>
            FREQUENTLY ASKED QUESTIONS:\n                          //TODO: The list is not complete, and phrasing is to be revised
            1.What does the credibility rating mean?\n
            Ans: Your credibility rating is a representation of how reliable other users found your answers and posts to be \n
            2. How can I improve my credibility rating?\n
            Ans: We recommend only answering about things you are sure about, ensuring that your answers are more likely to help people, rather than harm them.\n
            3. Can I change my usewname?\n
            Ans: Yes! You should be able to find the Edit Username screen at\n //TODO:add location, or possibly even a link to the page 
            4. Can I change my account email ID?\n
            Ans: Yes, you can change your email using the _. You will have to verify once again that it is a Purdue email.\n // TODO: [insert location]
          </Text>
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

