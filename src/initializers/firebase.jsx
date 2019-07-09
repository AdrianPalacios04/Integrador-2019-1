import firebase from 'firebase'

  // Initialize Firebase
  // const config = {
  //   apiKey: "AIzaSyBSFwJlzIiATPx0qf4L0vP-bKB0tOo77E0",
  //   authDomain: "react-taller.firebaseapp.com",
  //   databaseURL: "https://react-taller.firebaseio.com",
  //   projectId: "react-taller",
  //   storageBucket: "react-taller.appspot.com",
  //   messagingSenderId: "924337957682"
  // };

  const config ={
    apiKey: "AIzaSyB3drWQDdnW8En9vOMlb-5qX3fS1kVImK0",
    authDomain: "saywithpics.firebaseapp.com",
    databaseURL: "https://saywithpics.firebaseio.com",
    projectId: "saywithpics",
    storageBucket: "saywithpics.appspot.com",
    messagingSenderId: "323760486919",
    //appId: "1:323760486919:web:8b76606766356477"
  };

  firebase.initializeApp(config);


  export const ref = firebase.database().ref()
  export const firebaseAuth = firebase.auth
  export default firebase