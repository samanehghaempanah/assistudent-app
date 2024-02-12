importScripts('https://www.gstatic.com/firebasejs/9.6.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.5/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBkyhlB_khy2kc4DK2OUtf2HAmH9485yHg",
  authDomain: "behdadeh-university-najafabad.firebaseapp.com",
  projectId: "behdadeh-university-najafabad",
  storageBucket: "behdadeh-university-najafabad.appspot.com",
  messagingSenderId: "183402732247",
  appId: "1:183402732247:web:3d39fdacad19f15316ee92",
  measurementId: "G-G38C426ZKV",
  vapidkey:"BMhYFQdAc9gm4yV3KdsNRf89_eRmfh9AZSfEamY74t3wF6n1-q25iASsVAPfuOFG4Gomq2VFizJ2G7n5-ByHvWQ"
});

const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload){
//   const notificationTitle = 'دانشگاه من'
//   const notificationOptions = {
//     body:payload.notification.body,
//     icon:'./assets/icon/pwa/icon-128x128.png'
//   }

//   self.registration.showNotification(notificationTitle,notificationOptions);

// })
