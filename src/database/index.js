import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.VUE_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID
})

export default firebase.firestore()
