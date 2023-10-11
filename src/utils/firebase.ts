// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApQv59346AOnHwvRlRsnUBNkHNfLO707I",
  authDomain: "climate-quiz.firebaseapp.com",
  projectId: "climate-quiz",
  storageBucket: "climate-quiz.appspot.com",
  messagingSenderId: "941341482024",
  appId: "1:941341482024:web:08697c0410f1df3125691d",
  measurementId: "G-79WX22T2SM"
};

var app;
var analytics;
var db;

// Initialize Firebase
export default function initFirebase(){
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
//   db = getDatabase(app);
}

export {app, analytics, db};