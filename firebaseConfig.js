// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore'
 
const firebaseConfig = {
  apiKey: "AIzaSyB_BmY4khsB-SDfhhk6S_L0oNHpwIeu5sE",
  authDomain: "startproject-4556c.firebaseapp.com",
  projectId: "startproject-4556c",
  storageBucket: "startproject-4556c.appspot.com",
  messagingSenderId: "459793009978",
  appId: "1:459793009978:web:d955598964ac59b4af1403"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);

export default app;