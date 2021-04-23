import firebase from 'firebase';
import 'firebase/firestore';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  STORAGE_BUCKET,
  APP_ID,
} from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
};

const Firebase = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

// avoid deprecated warnings
db.settings({
  timestampsInSnapshots: true,
});

export default Firebase;
