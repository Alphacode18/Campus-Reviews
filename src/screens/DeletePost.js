import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, textarea} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Card, Input, Select, SelectItem, IndexPath, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
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

  const Header = (props) => (
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <TouchableOpacity
        style={{ color: 'white', marginLeft: 100 }}>
      </TouchableOpacity>
      <Text category='h6' style={styles.text} status='danger'>Delete Post Screen</Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Text category='h6' style={styles.text} category='p1'>
      <Text style={styles.text} status='info'>Posted: 3/14/21 </Text>
      <Text style={styles.text} status='success'>2 upvotes </Text>
      <Text style={styles.text} status='danger'>20 downvotes</Text>
      </Text>
    </View>
    </View>
  );


export default createPost = ({ navigation }) => {
    const [titleState, setTitleState] = useState('');
    const [postState, setPostState] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [notSelected, setNotSelected] = useState(true);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const displayValue = notSelected ? 'Type' : data[selectedIndex.row];

    const changeSelection = (selectedIndex) => {
        setSelectedIndex(selectedIndex);
        setNotSelected(false);
      };

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
                    <Card style={styles.card} header={Header} footer={Footer}>
                      <Text style={styles.text} category='s2'>
                      {'    '}This is a really bad post that we need to delete. 
                      </Text>
                    </Card>
                        <Button style={styles.button} size='small'> Cancel </Button>
                        <TouchableOpacity
                          style={{ color: 'white', marginTop: 40 }}>
                        </TouchableOpacity>
                        <Button style={styles.button} size='small'>Delete Post</Button>
                        <TouchableOpacity
                           style={{ color: 'white', marginTop: 40 }}
                           onPress={() => navigation.navigate('Home')}
                        >
                        <Text style={{ textDecorationLine: 'underline' }}>Go Back</Text>
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
});
