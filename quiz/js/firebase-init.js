import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { firebaseConfig, firebaseConfigured } from "./firebase-config.js";

if (firebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  window.firebaseQuiz = { app, db, auth, configured: true };
  document.dispatchEvent(new CustomEvent("firebase-ready", {detail:{db,auth}}));
} else {
  window.firebaseQuiz = {configured:false};
  document.dispatchEvent(new CustomEvent("firebase-not-configured"));
}
