var firebaseConfig = {
    apiKey: "AIzaSyA-Iz9UcK7pgcQ9-kJob7qOuU7bOXET57E",
    authDomain: "taskify-4e4f4.firebaseapp.com",
    projectId: "taskify-4e4f4",
    storageBucket: "taskify-4e4f4.appspot.com",
    messagingSenderId: "568253585529",
    appId: "1:568253585529:web:d146cc79f16eb7f6055ca8",
    measurementId: "G-4GW4L40XEN"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();