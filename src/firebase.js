// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/storage"
import "firebase/compat/firestore"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1lZjc-FLGrgRvyPdIli9pcuWovtv3q0c",
  authDomain: "my-reels-app-749fc.firebaseapp.com",
  projectId: "my-reels-app-749fc",
  storageBucket: "my-reels-app-749fc.appspot.com",
  messagingSenderId: "735914057994",
  appId: "1:735914057994:web:af7a078a10dcf3c73a1af3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth() ;

const firestore = firebase.firestore() ;
export const database = {
    users : firestore.collection('users'), 
    posts : firestore.collection('posts'),
    comments : firestore.collection('comments'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage() ;