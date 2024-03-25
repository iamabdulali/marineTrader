// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
// const firebaseConfig = {
//   apiKey: "AIzaSyAY5feK91YehnApTqiYQTY3HsbbQ5nKS5g",
//   authDomain: "marine-trader-project.firebaseapp.com",
//   projectId: "marine-trader-project",
//   storageBucket: "marine-trader-project.appspot.com",
//   messagingSenderId: "1066578120124",
//   appId: "1:1066578120124:web:ee7c85dbab58ceacedefb9",
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyCY1U7zVGllOrDRKx4N5ylI5ONFgfK0oWE",
//   authDomain: "notification-8843b.firebaseapp.com",
//   projectId: "notification-8843b",
//   storageBucket: "notification-8843b.appspot.com",
//   messagingSenderId: "926707909135",
//   appId: "1:926707909135:web:d06dcf277ba924d674d97a",
// };

const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

firebase.initializeApp(defaultConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
