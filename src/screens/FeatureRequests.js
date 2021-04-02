
import React, { useState } from 'react';
import { StyleSheet, Keyboard, TouchWithoutFeedback, TouchOpacity, Alert } from 'react-native';
import { Layout, Button, Input, Text, Spinner, Icon } from '@ui-kitten/components';
import nodemailer from 'nodemailer';

import Firebase from '../../config/firebase';

export default userReport = ({navigation}) =>  {
  const [featureName, setFeaturename] = useState('');
  const [description , setDescription] = useState('');

  //TODO: Add implementationa and integrate with Firebase
  const handleFeatureRequest = () => {
    mail(description , featureName);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Layout style={styles.container} level={'1'}>
        <Text category='h1' style={{ padding: 20, marginTop: 50 }}>
          Request a Feature
        </Text>
        <Input
          style={styles.inputBox}
          placeholder='The name of the feature'
          value={featureName}
          onChangeText={(featureName) => setFeaturename(featureName)}
        />
        <Input
          style={styles.inputBox}
          placeholder='The description of this feature'
          value={description}
          onChangeText={(description) => setDescription(description)}
        />
        <Button
          onPress={handleFeatureRequest}
          style={{ width: '50%', borderRadius: 20, marginTop: 20 }}
          appearance='outline'
        >
          <Text>
            Submit Feature Request
          </Text>
        </Button>
      </Layout>
    </TouchableWithoutFeedback>
  );
};
export async function mail(text: string , subject: string) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'Campus.Reviews.fb@gmail.com',
      pass:'TurkstraTeam16()' ,
    },
  });

/*  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: './views',
      defaultLayout: false,
    },
    viewPath: './views',
    extName: '.handlebars',
  };*/

  //transporter.use('compile', hbs(handlebarOptions));

  let mailOptions = {
    from: '"Campus Reviews" <Campus.Reviews.fb@gmail.com>',
    to: "Campus.Reviews.fb@gmail.com",
    subject: subject,
    text: text,
  };
  await transporter.sendMail(mailOptions);
  Alert.alert('Feature succesfully requested');


 /* let info = await transporter.sendMail(mailOptions);

  const log_string = `\n--------------------------\nDate : ${new Date()}\nID: ${
    info.messageId
  }\nReciever: ${reciever}\n--------------------------`;
  fs.appendFileSync('log/mail_log.txt', log_string);
  console.log('Message sent: %s', info.messageId);*/
}


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
