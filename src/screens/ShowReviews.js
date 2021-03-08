import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, textarea} from 'react-native';
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { Dimensions, Alert } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';

import Firebase from '../../config/firebase';

const rateVal = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
  ];

const data = [
    'Dining',
    'On-Campus Facilities',
    'Classes',
    'Professors'
  ];


const useInputState = (initialValue = '') => {
    const [value, setValue] = React.useState(initialValue);
    return { value, onChangeText: setValue };
};

export default showReviews = ({ navigation }) => {
    const [titleText, settitleText] = useState('');
    const [reviewText, setreviewText] = useState('');
    const [selectedIndex_type, setSelectedIndex_type] = useState(new IndexPath(0));
    const [notSelected_type, setNotSelected_type] = useState(true);
    const [selectedIndex_rate, setSelectedIndex_rate] = useState(new IndexPath(0));
    const [notSelected_rate, setNotSelected_rate] = useState(true);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const displayValue = notSelected_type ? 'Type' : data[selectedIndex_type.row];
    const ratingValue = notSelected_rate ? 'Rating(#/10)' : rateVal[selectedIndex_rate.row];

    const changeSelection_type = (selectedIndex_type) => {
        setSelectedIndex_type(selectedIndex_type);
        setNotSelected_type(false);
      };

    const changeSelection_rate = (selectedIndex_rate) => {
        setSelectedIndex_rate(selectedIndex_rate);
        setNotSelected_rate(false);
    };
        
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}> 
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Layout style={styles.container} level={'1'}> 
                    <ScrollView contentContainerStyle={{flexGrow : 1, width : screenWidth, alignItems: 'center', justifyContent: 'center'}}>
                
                        <Text category='h1' style={{ padding: 20, marginTop: 0 }}> Showing all Reviews </Text>
                        
                            <Card
                            style={styles.item}
                            status='basic'
                            header={headerProps => renderItemHeader(headerProps, info)}
                            footer={renderItemFooter}>
                                <Text>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                                    a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged.
                                </Text>
                            </Card>

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

                        <Button
                            style={{ width: '50%', borderRadius: 20, marginTop: 25 }}
                            status={'success'}
                            onPress={() => {
                                if ((notSelected_type || notSelected_rate || title === '' || post === '')) {
                                    Alert.alert('Please fill in all the information for your review');
                                }
                                else {
                                    Firebase.database().ref('/' + types[selectedIndex_type.row] + ' Reviews').push({
                                        review_title: titleText,
                                        review_rate: selectedIndex_rate,
                                        review_text: reviewText,
                                        user: 'Review Tester'
                                    });
                                
                                navigation.navigate('EditReview', {review_title: titleText,
                                                                                review_text: reviewText,
                                                                                review_type: selectedIndex_type,
                                                                                review_rate: selectedIndex_rate });}}}
                        >
                            <Text style={{ color: 'white' }}>Create Review</Text>
                        </Button>
                        <TouchableOpacity
                            style={{ color: 'white', marginTop: 40 }}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text>
                                <Text style={{ textDecorationLine: 'underline' }}>Go Back</Text>
                            </Text>
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
});
