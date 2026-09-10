// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// getAuth = authenticate email/password, Google login
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDM4xHNn2OyV2x9h7Z1rN5bw0WD2-ZThz0",
authDomain: "ecommerce-4eb13.firebaseapp.com",
projectId: "ecommerce-4eb13",
storageBucket: "ecommerce-4eb13.firebasestorage.app",
messagingSenderId: "529163882169",
appId: "1:529163882169:web:b0ebe6277fdb2ab51b9568",
measurementId: "G-795Z73ZHH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()