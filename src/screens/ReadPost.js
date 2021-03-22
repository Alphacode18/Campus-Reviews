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

const UpArrowIcon = (props) => (
  <Icon {...props} name='arrow-upward-outline'/>
);

const DownArrowIcon = (props) => (
  <Icon {...props} name='arrow-downward-outline'/>
);

const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

const Header = ({props, title}) => (
    <View style={{flexDirection:'row', alignItems:'center', marginTop: '5%', marginBottom: '5%'}}>
      <View style={styles.controlContainer}>
        <Text style={styles.review} status='control'>Review</Text>
      </View>
      <Text category='h5' style={styles.text} status='danger'> {title} </Text>
    </View>
);

const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
          <Button size='small' accessoryLeft={UpArrowIcon}></Button>
          <Text>300</Text>
          <Button size='small' accessoryLeft={DownArrowIcon}></Button>

          <Text status='info' category='s1'>by: DarshDalal2001</Text>
          <Text status='success' category='s1'>9d</Text>

      </View>
    </View>
);


export default readPost = ({ route, navigation }) => {
    const { title, post, postID } = route.params;

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
                <Button onPress={() => /* doSort() */}>sort</Button>
                <Layout style={styles.container} level='1'>
                  <Select
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}>
                    <SelectItem title='Sort oldest first'/>
                    <SelectItem title='Sort latest first'/>
                  </Select>
                </Layout>
                    <ScrollView contentContainerStyle={{flexGrow : 1}}>
                      <Card style={styles.card}
                      header={(props) => <Header {...props} title={title}/> }
                      footer={(props) => <Footer {...props}/> }>
                        <Text style={styles.text} category='p1'>
                          {post}
                        </Text>
                      </Card>

                      <React.Fragment>
                        <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop: 8}}>
                          <Text style={styles.commentLeft} status='info' category='s1'>PurdueUser44</Text>
                          <Text style={styles.commentRight} category='s1' status='success'>3h</Text>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 8}}>Agreed! I love meal swipes. Check out cosi for some real value!</Text>
                        <Divider/>
                      </React.Fragment>

                      <React.Fragment>
                        <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop: 8}}>
                          <Text style={styles.commentLeft} status='info' category='s1'>JohnDoe77</Text>
                          <Text style={styles.commentRight} category='s1' status='success'>1h</Text>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 8}}>I disagree... meal swipes SUCK!</Text>
                        <Divider/>
                      </React.Fragment>

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
  commentLeft: {
    margin: 8,
  },
  commentRight: {
    margin: 8,
  },
});
