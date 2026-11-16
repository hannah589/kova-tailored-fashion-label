import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import firebase connection. auth= email & pw, googleProvider = google login
import { auth, googleProvider } from "../config/firebase";
// import google auth function for login and
// can only use in the frontend. everything else is set up in the backend for security
import { signInWithPopup } from "firebase/auth";
import Button from "../components/common/Button";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../api/auth";

function SignIn() {
  const navigate = useNavigate();

  //get login function from useContext
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const { email, password } = formData;


  // update form input values
  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,

      errors: {
        ...prev.errors,
        [e.target.name]: "",
        form: "",
      },
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      //send email and pw to api server, endpoint
      const response = await login({ email, password });
      //save user and jwt in auth context
      login(response.data);
      // Login successful, navigate to user profile
      navigate("/profile");
    } catch (err) {
      console.log(err);
    } 
  }

  //google login
  async function handleLoginWithGoogle(e) {
    e.preventDefault();

    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User logged in with Google!");
    } catch (error) {
      console.error(error);
    }

    navigate("/");
  }

  return (
    <>
      <div className="form-container">
        <div className="form-box">
          <div>
            <h1>Log in</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                name="email"
                onChange={onChange}
                value={email}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={onChange}
              />
              <Link className="link" to="/forgotPassword">
                Forgot password?
              </Link>
            </div>

            <Button type="submit">
              Submit
            </Button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button
              className="google-btn"
              type="button"
              onClick={handleLoginWithGoogle}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google Logo"
              />
              Continue with Google
            </button>
          </form>

          <p>
            Not a member?
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
