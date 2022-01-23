// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAzQjgp9GgwaMg3swFRfNjiQQHNOsd2rfs",
    authDomain: "chatroom-react-web.firebaseapp.com",
    projectId: "chatroom-react-web",
    storageBucket: "chatroom-react-web.appspot.com",
    messagingSenderId: "558006827076",
    appId: "1:558006827076:web:978eeef6fe86beaf986411",
    measurementId: "G-EXCVP0DEHZ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;