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
var isDining = false;


export default buffer = (props) => {
  console.log('Buffer Index');
  console.log(props.route.params);
  console.log(props.route.params.index);
  if (props.route.params.index == 0) {
    isDining = true;
    console.log("Dining selected");
  }

  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout style={styles.container} level={'1'}>
            <Button onPress={() => {
                  props.navigation.navigate('Loading', {
                    index: props.route.params.index,
                    postType: 'Reviews'
                  });
            }}> Reviews </Button>
            <Button style={
              {marginTop: 20}
            } onPress={() => {
                  props.navigation.navigate('Loading', {
                    index: props.route.params.index,
                    postType: 'Posts'
                  });
            }}> Posts </Button>

            {isDining ? <Button style={   
                {marginTop: 20}
              } onPress={() => {
                    props.navigation.navigate('rec', {
                      
                    });
              }}> Recommendations </Button> : console.log("not dining") } 
              

            
            

            

            

            
              

            

            
        </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });