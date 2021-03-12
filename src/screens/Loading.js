import React, { useState, ReactDOM, useReducer } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Layout,
  Text,
  Button,
  Input,
  Select,
  SelectItem,
  IndexPath,
  Icon,
  Card,
  Spinner,
} from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import { useScrollToTop } from '@react-navigation/native';
import { render } from 'react-dom';

const types = ['Dining', 'On-Campus Facilities', 'Classes', 'Professors'];

export default loading = ({ navigation, index }) => {
  const db = Firebase.database();
  let posts = [];
  let fields = [];
  // readData(diningPosts);
db.ref(types[index] + ' Posts').on('value', (snapshot) => {
    console.log('snapshot');
    console.log(snapshot);
    snapshot.forEach(function (data) {
        console.log('data');
        console.log(data);
        posts.push(data.key);
        db.ref(types[index] + ' Posts/' + data.key).on('value', (snapshot) => {
            console.log(types[index] + ' Posts/' + data.key);
            snapshot.forEach(function (field) {
                fields.push(field);
            });
        });
    })
    navigation.navigate('ShowPosts', {
        index: index,
        posts: posts,
        fields: fields,
    });
});

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout style={styles.container} level={'1'}>
            <Spinner size='small' />
        </Layout>
    </TouchableWithoutFeedback>
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
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
    minWidth: '95%',
    maxWidth: '95%',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
