import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, textarea} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Card, Divider, Input, Select, SelectItem, IndexPath, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions, View } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';

const data = [
    'Dining',
    'On-Campus Facilities',
    'Classes',
    'Professors'
  ];

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

  const Header = ({props, title}) => (
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <View style={styles.controlContainer}>
        <Text style={styles.review} status='control'>Review</Text>
      </View>
      <Text category='h6' style={styles.text} status='danger'> {title} </Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Text category='h6' style={styles.text} category='p1'>
      <Text style={styles.text} status='info'>by: DarshDalal2001 </Text>
      {/* <Text style={styles.text} status='success'>8 comments </Text>
      <Text style={styles.text} status='danger'>1d</Text> */}
      </Text>
    </View>

    </View>
  );


export default readPost = ({ route, navigation }) => {
    const { title, post, postID, user } = route.params;

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <Layout style={styles.container} level={'1'}>

                <TopNavigation
                  title='Back'
                  accessoryLeft={renderBackAction}
                />
                    <ScrollView contentContainerStyle={{flexGrow : 1}}>
                    <Card style={styles.card} 
                    header={(props) => <Header {...props} title={title}/> }
                    footer={(props) => <Footer {...props}/> }>
                      <Text style={styles.text} category='s2'>
                        {post}
                      </Text>
                    </Card>
                    {/* <React.Fragment>
                      <View style={styles.details}>
                        <Text style={styles.title} category='h6'>Comment</Text>
                      </View>
                      <Divider/>

                    </React.Fragment>
                    <React.Fragment>
                      <View style={styles.details}>
                        <Text style={styles.title} category='h6'>Comment</Text>
                      </View>
                      <Divider/>

                    </React.Fragment>
                    <React.Fragment>
                      <View style={styles.details}>
                        <Text style={styles.title} category='h6'>Comment</Text>
                      </View>
                      <Divider/>

                    </React.Fragment>
                    <React.Fragment>
                      <View style={styles.details}>
                        <Text style={styles.title} category='h6'>Comment</Text>
                      </View>
                      <Divider/>

                    </React.Fragment> */}
                    <React.Fragment>
                      <View style={styles.details}>
                        <Text style={styles.title} category='h6'>Comment</Text>
                      </View>
                      <Divider/>

                    </React.Fragment>

                        <TouchableOpacity
                           style={{ color: 'white', marginTop: 120  }}
                           onPress={() => navigation.navigate('Home')}
                        >
                        <Button style={styles.button} size='medium'> Done viewing post </Button>
                       </TouchableOpacity>
                    </ScrollView>
                </Layout>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  review: {
    margin: 4,
    textAlign: 'center',
  },
  controlContainer: {
    borderRadius: 4,
    margin: 4,
    padding: 4,
    width: '20%',
    backgroundColor: '#3366FF',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  title: {
    marginHorizontal: 8,
  },
  installButton: {
    marginVertical: 4,
  },
});