import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore = firebase.firestore();
const analytics = firebase.analytics();
