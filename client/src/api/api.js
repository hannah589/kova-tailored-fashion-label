import axios from 'axios';
import { toast } from 'sonner';

//create custom axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// AXIOS RESPONSE (INTERCEPTOR): Allows errors to be intercepted globally and displays messages with React Toast
api.interceptors.response.use(null, (error) => {
  // Setting Expected Error Range: If it is a error from 400 - 500
  const expectedError =
    error.response && error.response.status >= 400 &&
    error.response.status < 500;
  console.log(expectedError);

  if (!expectedError) {
    // NOTE: We could also implement a logging system for errors here
    console.log(`Interceptors - ${error}`);
    toast.error("Unexpected error. Please try again.");
  } else {
    // STANDARDISED: By creating uniform error responses, like our backend, we can standardise our errors on the front end
    console.log(error.response.data);
    // Only show toast for non-validation client errors.
    if (error.response.status !== 400) {
      toast.warning(
        error.response.data?.message || "Request failed. Please try again."
      );
    }
  }

  // Function Return: As we a intercepting an ERROR we want to make sure we return a rejected promise
  return Promise.reject(error); 
});

// AXIOS DEFAULT CONFIGS: Set default header with each axios REQUEST for auth token
export function setHeaderToken() {
  const token = localStorage.getItem("token");
  if(token) {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}
//set header when api loads
setHeaderToken();

// EXPORT METHODS: Need to access modified axios instance & its CRUD methods, via api.js
export default api;