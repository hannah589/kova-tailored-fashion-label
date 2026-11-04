import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import auth firebase connection
import { auth, googleProvider } from "../config/firebase";
// import auth method from firebase, google pop-up/redirect
import { signInWithPopup } from "firebase/auth";
import { isValidPassword } from "../utils/validation";
//import { useAuthStore } from "../store/useAuthStore";
//components
import Button from "../components/common/Button";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { register } from "../api/auth"

function SignUp() {
  const navigate = useNavigate();

  //destructure the login function from useAuth Context
  const { login } = useAuth();

  //form state for each input
  //Connects to name="", in input
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
  });

  // deconstruct form data state
  const { firstName, lastName, email, password, confirmPassword, errors } =
    formData;

  const [loading, setLoading] = useState(false);

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

  async function handleSignUp(e) {
    //prevent form for refreshing
    e.preventDefault();
    setLoading(true);

    //create an empty object to store validation errors
    const errors = {};

    //validate password
    if (!isValidPassword(password)) {
      errors.password =
        "Password must be 8–64 characters and include uppercase, lowercase, number and special character.";
    }

    // Check passwords match
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      console.error("Passwords do not match");
    }

    //If validation errors exist, update state and stop
    if (Object.keys(errors).length > 0) {
      setFormData((prev) => ({
        ...prev,
        errors,
      }));

      return;
    }

    setLoading(true);

    try {
      //api call: send signup form data to backend
      const response = await register(
        "api/auth/register",
        formData
      );

      // Axios automatically parses the JSON response in javascript object
      console.log(response.data);

      //save user and jwt in auth context
      login(response.data);

      // success toast notification
      toast.success("Account created!");

      console.log("Account created successfully");

      // Navigate home
      navigate("/");
    } catch (err) {
      // Get backend validation errors
      const backendErrors = err.response?.data?.errors;

      if (backendErrors && Array.isArray(backendErrors)) {
        const fieldErrors = {};

        backendErrors.forEach((error) => {
          fieldErrors[error.field] = error.message;
        });

        setFormData((prev) => ({
          ...prev,
          errors: fieldErrors,
        }));
      } else {
        // Handle other errors (e.g. email already exists)
        setFormData((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            form:
              err.response?.data?.message ||
              "Account creation failed. Please try again.",
          },
        }));
      }
    } finally {
      // Always stop loading, whether successful or unsuccessful
      setLoading(false);
    }
  }

  //Google Sign up
  async function handleSignUpWithGoogle(e) {
    e.preventDefault();

    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google sign up successful!");
      navigate("/");
    } catch (error) {
      console.error("Google sign up error:", error);

      setFormData((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          form: "Google sign up failed. Please try again.",
        },
      }));
    }
  }

  return (
    <>
      <div className="form-container">
        <div className="form-box">
          <div>
            <h1>Sign-up</h1>
          </div>

          <form onSubmit={handleSignUp} noValidate>
            <div className="input-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                placeholder="John"
                required
                name="firstName"
                onChange={onChange}
                value={firstName}
                className={errors.firstName ? "invalid" : ""}
                aria-invalid={Boolean(errors.firstName)}
              />
              {/*retrieve "value" entered into input form. Shows up in input, as written*/}
              {errors.firstName && (
                <div className="invalid-feedback" role="alert">
                  {errors.firstName}
                </div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                placeholder="Smith"
                required
                name="lastName"
                onChange={onChange}
                value={lastName}
                className={errors.lastName ? "invalid" : ""}
                aria-invalid={Boolean(errors.lastName)}
              />
              {errors.lastName && (
                <div className="invalid-feedback" role="alert">
                  {errors.lastName}
                </div>
              )}
            </div>

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
                className={errors.email ? "invalid" : ""}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <div className="invalid-feedback" role="alert">
                  {errors.email}
                </div>
              )}
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
                className={errors.password ? "invalid" : ""}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && (
                <div className="invalid-feedback" role="alert">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="password_confirm">Confirm password:</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                onChange={onChange}
                value={confirmPassword}
                className={errors.confirmPassword ? "invalid" : ""}
                aria-invalid={Boolean(errors.confirmPassword)}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback" role="alert">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {errors.form && (
              <div className="invalid-feedback" role="alert">
                {errors.form}
              </div>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
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
            <Link to="/signin" className="link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;

/*

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
      await createUserWithEmailAndPassword(auth,email, password);
    } catch (error) {
      console.error(error);
    }
    navigate('/');
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
            <label htmlFor="firstName">First Name:</label>
            <input 
              type="text" 
              id="firstName"
              name="firstName"
              required 
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name:</label>
            <input 
              type="text" 
              id="lastName"
              name="lastName"
              required 
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

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
*/
