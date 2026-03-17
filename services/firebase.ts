import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy1e7u86zgvrt3hLdHg0HT-bEWpaGPtZo",
  authDomain: "e-lawyers-8f18a.firebaseapp.com",
  projectId: "e-lawyers-8f18a",
  storageBucket: "e-lawyers-8f18a.firebasestorage.app",
  messagingSenderId: "815798983743",
  appId: "1:815798983743:web:b93fe5ba4ce8798c3cec8a",
  measurementId: "G-Y2EFG98XNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
