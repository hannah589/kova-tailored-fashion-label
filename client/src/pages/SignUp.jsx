import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import auth firebase connection
import { auth, googleProvider } from "../config/firebase"
// import auth method from firebase, google pop-up/redirect
//same google function for login and signup
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import Button from "../components/common/Button"


function SignUp() {
  const navigate = useNavigate()

  // Create Form states for each input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  //auth can get the current signed in user's email
  //console.log(auth?.currentUser?.email);

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      //firebase function to create user
      //only accepts auth, email, password only
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignUpWithGoogle(e) {
    e.preventDefault();

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  }

  return (
   <>
      <div className="form-container">
       <div className="form-box">
        <div>
          <h1>Sign-up</h1>
        </div>
      
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              name="email"
              required 
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password"
              id="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              />
              {/*retrieve value entered into input form*/}
          </div>

           <Button type="submit">
            Sign Up
          </Button>

           <div className="divider">
            <span>OR</span>
          </div>

          <button 
            className="google-btn" 
            type="button"
            onClick={handleSignUpWithGoogle}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google Logo"
            />
            Sign up with Google
          </button>
        </form>

          <p>
            Already a member?
            <Link to="/signin" className="link">Log In</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUp
