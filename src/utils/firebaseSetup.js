import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";

// export const firebaseConfig = {
//   apiKey: "AIzaSyAY5feK91YehnApTqiYQTY3HsbbQ5nKS5g",
//   authDomain: "marine-trader-project.firebaseapp.com",
//   projectId: "marine-trader-project",
//   storageBucket: "marine-trader-project.appspot.com",
//   messagingSenderId: "1066578120124",
//   appId: "1:1066578120124:web:ee7c85dbab58ceacedefb9",
// };

export const firebaseConfig = {
  apiKey: "AIzaSyCY1U7zVGllOrDRKx4N5ylI5ONFgfK0oWE",
  authDomain: "notification-8843b.firebaseapp.com",
  projectId: "notification-8843b",
  storageBucket: "notification-8843b.appspot.com",
  messagingSenderId: "926707909135",
  appId: "1:926707909135:web:d06dcf277ba924d674d97a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);
