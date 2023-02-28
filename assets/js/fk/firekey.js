const firebaseApp = firebase.initializeApp({ 
  apiKey: "AIzaSyBXRvEg1efB1WibILFiqSbArdE4Dff8HuQ",
    authDomain: "tt-benderkoppitzbd.firebaseapp.com",
    projectId: "tt-benderkoppitzbd",
    storageBucket: "tt-benderkoppitzbd.appspot.com",
    messagingSenderId: "949918861716",
    appId: "1:949918861716:web:1bc5967d9d12c8a0a26781"
});
const db = firebaseApp.firestore();
const defaultStorage = firebaseApp.storage();