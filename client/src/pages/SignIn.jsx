import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import firebase connection. auth= email & pw, googleProvider = google login 
import { auth, googleProvider } from "../config/firebase"
// import auth method from firebase, google pop-up/redirect
//same google function for login and signup
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

function SignIn() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  async function handleLogin(e) {
    e.preventDefault();

    try {
      //function for user to sign in 
      //must accept auth, email, password only
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in!");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLoginWithGoogle(e) {
    e.preventDefault();

    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User logged in with Google!");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignOut(e) {
    e.preventDefault();

    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }

    navigate('/');
  }

  return (
    <>
      <div className="form-container">
       <div className="form-box">
        <div>
          <img
            src="https://store.manutd.com/img/logo-trident.svg"
            alt="logo"
            className="form-logo"
          />
          <h1>Log-in</h1>
        </div>
      
        <form onSubmit={handleLogin}>
          <button 
            className="google-btn" type="button"
            onClick={handleLoginWithGoogle}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google Logo"
            />
            Continue with Google
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              id="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/*retrieve value entered into input form*/}
            <Link to="/">Forgot password?</Link>
          </div>

          <button className="login-btn" type="submit">
            Log in
          </button>
        </form>

        <p className="register">
          Not a member?
          <Link to="/signup">Sign Up</Link>
        </p>

    
        <button onClick={handleSignOut}>Logout</button>
      </div>
      </div>
    </>
  )
}

export default SignIn
