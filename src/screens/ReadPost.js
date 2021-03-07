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
      <View style={styles.controlContainer}>
        <Text style={styles.review} status='control'>Review</Text>
      </View>
      <Text category='h6' style={styles.text} status='danger'>Title: Turkstra Is The BEST</Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Text category='h6' style={styles.text} category='p1'>
      <Text style={styles.text} status='info'>by: DarshDalal2001 </Text>
      <Text style={styles.text} status='success'>8 comments </Text>
      <Text style={styles.text} status='danger'>1d</Text>
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
                      {'    '}Proin quis viverra risus. Vestibulum condimentum et lectus porta maximus. Quisque elementum, diam quis efficitur hendrerit, ligula lacus cursus justo, in interdum ipsum orci eu nibh. Praesent viverra risus vitae augue dapibus, id pulvinar lorem vehicula. Cras ante ante, sagittis nec sem eu, elementum pharetra erat. Nam lacus diam, aliquam non dolor non, dapibus suscipit augue. Donec sollicitudin at elit tincidunt maximus. Suspendisse potenti. Integer sit amet nibh non nisi.
                      {"\n"}
                      {'    '}sollicitudin sagittis. Vestibulum nec risus id nibh sagittis facilisis. Mauris sed ipsum sapien. Nulla pretium ornare cursus.
                      Mauris mauris dui, tempus et ullamcorper in, vestibulum et mi. Nullam efficitur laoreet risus. Sed id enim libero. Phasellus varius massa vel ornare fermentum. Aliquam molestie leo ut vehicula sodales.
                      {"\n"}
                      {'    '}Fusce pharetra libero venenatis lorem interdum, sed ultricies justo varius. Aenean eu velit ipsum. Maecenas tempor, nibh quis mollis aliquet, libero odio elementum odio, ac eleifend magna diam vitae dui. Suspendisse potenti. Nam vel odio at felis malesuada semper. Pellentesque ipsum justo, scelerisque molestie vehicula a, hendrerit at ligula. Vestibulum pellentesque nulla vitae ante rutrum laoreet. Nulla fringilla sodales facilisis.

                      </Text>
                    </Card>
                        <Button style={styles.button} size='medium'> Done viewing post </Button>
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
