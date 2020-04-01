importScripts("https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js"
);

var firebaseConfig = {
  apiKey: "AIzaSyCA3cSZU-aCeWXLOuQ3A6x2ZSSBzW0zN5g",
  authDomain: "coronariskcalculator.firebaseapp.com",
  databaseURL: "https://coronariskcalculator.firebaseio.com",
  projectId: "coronariskcalculator",
  storageBucket: "coronariskcalculator.appspot.com",
  messagingSenderId: "43323371987",
  appId: "1:43323371987:web:1d767f13e5a6cf175f3f26"
};
firebase.initializeApp(firebaseConfig);
