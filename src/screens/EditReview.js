import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, textarea} from 'react-native';
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { Dimensions, Alert } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';


const types = [
    'Dining',
    'On-Campus Facilities',
    'Classes',
    'Professors'
  ];

  const rateVal = [
    '0',
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

const useInputState = (initialValue = '') => {
    const [value, setValue] = React.useState(initialValue);
    return { value, onChangeText: setValue };
};

export default editReview = ({ route, navigation }) => {
    const { review_title, review_text, index, review_rate, review_id} = route.params;
    const [titleText, settitleText] = useState(review_title);
    const [reviewText, setreviewText] = useState(review_text);
    //const [datetime, setdatetime] = useState(date_time);
    const [selectedIndex_type, setSelectedIndex_type] = useState(new IndexPath(index));
    //const [notSelected_type, setNotSelected_type] = useState(true);
    const [selectedIndex_rate, setSelectedIndex_rate] = useState(new IndexPath(review_rate));
    const [notSelected_rate, setNotSelected_rate] = useState(true);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const displayValue = types[selectedIndex_type.row];
    const ratingValue = rateVal[selectedIndex_rate.row];

    const changeSelection_type = (selectedIndex_type) => {
        setSelectedIndex_type(selectedIndex_type);
        //setNotSelected_type(false);
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
                
                        <Text category='h1' style={{ padding: 20, marginTop: 0 }}> Edit Review </Text>
                        <Select
                            selectedIndex_type={selectedIndex_type}
                            value={displayValue}
                            onSelect={changeSelection_type}
                            style={{width: '90%'}} disabled >
                            <SelectItem title='Dining' style={{}}/>
                            <SelectItem title='On-Campus Facilities'/>
                            <SelectItem title='Classes'/>
                            <SelectItem title='Professors'/>
                        </Select>
                        <Input
                            style={{width: '90%', paddingTop : 10}}
                            size='medium'
                            placeholder='Title'
                            value={titleText}
                            onChangeText={settitleText}
                        />
                        <Select
                            placeholder='Default'
                            selectedIndex_rate={selectedIndex_rate}
                            value={ratingValue}
                            onSelect={changeSelection_rate}
                            style={{width: '90%'}}>
                            <SelectItem title='0' style={{}}/>
                            <SelectItem title='1'/>
                            <SelectItem title='2'/>
                            <SelectItem title='3'/>
                            <SelectItem title='4'/>
                            <SelectItem title='5'/>
                            <SelectItem title='6'/>
                            <SelectItem title='7'/>
                            <SelectItem title='8'/>
                            <SelectItem title='9'/>
                            <SelectItem title='10'/>
                        </Select>

                        <Input
                            multiline={true}
                            textStyle={{ minHeight: 256, maxHeight: 256}}
                            style={{width: '90%', paddingTop : 5}}
                            placeholder='Enter text here...'
                            numberOfLines={5}
                            value={reviewText}
                            onChangeText={setreviewText}
                        />

                        <Button
                            style={{ width: '50%', borderRadius: 20, marginTop: 25 }}
                            status={'success'}
                            onPress={() => {

                                if ((review_title === '' || review_text === '')) {
                                    Alert.alert('Please fill in all the information for your review');
                                }
                                
                                else {
                                    const today = new Date();
                                    const datetime = today.getTime();
                                    let updates = {};
                                    updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'edited_time'] = datetime;
                                    updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'edited'] = true;
                                    updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'review_rate'] = selectedIndex_rate.row;
                                    updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'review_text'] = reviewText;
                                    updates['/' + types[index] + ' Reviews/' + review_id + '/' + 'review_title'] = titleText;
                                    Firebase.database().ref().update(updates);
                                    navigation.navigate('Loading', {index : index, postType: 'Reviews'});
                                } 
                            }}
                        >
                            <Text style={{ color: 'white' }}>Done Editing</Text>
                        </Button>
                        <TouchableOpacity
                            style={{ color: 'white', marginTop: 40 }}
                            onPress={() => navigation.navigate('ShowReviews')}
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
