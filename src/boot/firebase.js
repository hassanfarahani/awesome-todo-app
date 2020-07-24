import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAeCMuDqHpFZglodijyu8SEJOJg1O3C-l4",
  authDomain: "awesome-todo-adada.firebaseapp.com",
  databaseURL: "https://awesome-todo-adada.firebaseio.com",
  projectId: "awesome-todo-adada",
  storageBucket: "awesome-todo-adada.appspot.com",
  messagingSenderId: "825870141147",
  appId: "1:825870141147:web:0aef012daba70b26ddaefe",
  measurementId: "G-Z5TTS18TS0"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb }
