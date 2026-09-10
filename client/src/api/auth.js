import { auth, googleProvider } from "../config/firebase"
// import auth method from firebase, google pop-up/redirect
//same google function for login and signup
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

export async function handleSignUp(e) {
    e.preventDefault();

    try {
      //function to create user
      //must accept auth, email, password only
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

export async function handleSignUpWithGoogle(e) {
    e.preventDefault();

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  }
