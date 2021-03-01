import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, textarea} from 'react-native';
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';

const data = [
    'Dining',
    'On-Campus Facilities',
    'Classes',
    'Professors'
  ];

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

const useInputState = (initialValue = '') => {
    const [value, setValue] = React.useState(initialValue);
    return { value, onChangeText: setValue };
};

export default createReview = ({ navigation }) => {
    const titleState = useInputState();
    const reviewState = useInputState();
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
                
                        <Text category='h1' style={{ padding: 20, marginTop: 0 }}> Create Review </Text>
                        <Select
                            placeholder='Default'
                            selectedIndex_type={selectedIndex_type}
                            value={displayValue}
                            onSelect={changeSelection_type}
                            style={{width: '90%'}}>
                            <SelectItem title='Dining' style={{}}/>
                            <SelectItem title='On-Campus Facilities'/>
                            <SelectItem title='Classes'/>
                            <SelectItem title='Professors'/>
                        </Select>
                        <Input
                            style={{width: '90%', paddingTop : 10}}
                            size='medium'
                            placeholder='Title'
                            {...titleState}
                        />
                        <Select
                            placeholder='Default'
                            selectedIndex_rate={selectedIndex_rate}
                            value={ratingValue}
                            onSelect={changeSelection_rate}
                            style={{width: '90%'}}>
                            <SelectItem title='1' style={{}}/>
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

                            {...reviewState}    
                        />

                        <Button
                            style={{ width: '50%', borderRadius: 20, marginTop: 25 }}
                            status={'success'}
                            onPress={() => navigation.navigate('Home')}
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
