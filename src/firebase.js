import firebase from 'firebase/app';
import { firebaseConfig } from './firebaseconfig.js';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// Add your Firebase credentials
firebase.initializeApp(firebaseConfig);

export default firebase;
