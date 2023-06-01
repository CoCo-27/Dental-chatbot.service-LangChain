import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCtWYhKfmeF5OTeJVeKmE3z4ZhKTOKiobg",
  authDomain: "dental-assistant-2a850.firebaseapp.com",
  projectId: "dental-assistant-2a850",
  storageBucket: "dental-assistant-2a850.appspot.com",
  messagingSenderId: "535812746608",
  appId: "1:535812746608:web:27a777f1e99a830f98b3b5",
  measurementId: "G-44JN96LKQY"
};

firebase.initializeApp(firebaseConfig);
const auth = getAuth();

export default auth;
