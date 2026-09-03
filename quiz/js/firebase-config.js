// Replace these placeholders with YOUR Firebase Web App configuration.
// Do not put Firebase Admin SDK/service-account credentials here.
export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_WEB_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};

export const firebaseConfigured =
  firebaseConfig.apiKey !== "YOUR_FIREBASE_WEB_API_KEY" &&
  firebaseConfig.projectId !== "YOUR_PROJECT_ID" &&
  firebaseConfig.appId !== "YOUR_FIREBASE_APP_ID";
