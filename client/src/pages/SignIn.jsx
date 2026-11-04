import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import firebase connection. auth= email & pw, googleProvider = google login
import { auth, googleProvider } from "../config/firebase";
// import google auth function for login and
// can only use in the frontend. everything else is set up in the backend for security
import { signInWithPopup } from "firebase/auth";
import Button from "../components/common/Button";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../api/auth"

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

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      //send email and pw to api server, endpoint
      const response = await axios.post("/api/auth/login", { email, password });

      // Axios automatically parses the JSON response in javascript object
      console.log(response.data);

      //save user and jwt in auth context
      login(response.data);

      console.log("Login successful");
      // Login successful
      navigate("/profile");
    } catch (err) {
      console.error("Login failed:", err?.response);
      //To do: add form login error
      setTimeout(() => (setLoading(false), 1000));
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
              <Link className="link" to="/">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Sign In"}
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
