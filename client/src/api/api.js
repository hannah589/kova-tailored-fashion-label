import axios from 'axios'
import { toast } from "sonner";

const api = axios.create({
  //from env.local
  baseURL: import.meta.env.VITE_API_URL,
});

//https://axios.rest/pages/advanced/interceptors
//axios response, interceptor: allows errors to be intercepted. Don't expose the specific server error to clients
api.interceptors.response.use(null, (error) =>{
  //setting expected error range: if 400 - 500 are true, 
  const expectedError = 
    error.response &&
    error.response.status >= 400 &&
    error.response.status &&
    error.response.status < 500;

  console.log(expectedError);

  if (!expectedError) {
    //can also set up a logs for errors here
    console.log(`Interceptors - ${error}`)
    toast()
  } else {
    //send back the same error msg 
    console.log(`${error?.response.data}`);
    toast.error(`${error.response.data}`)
  }

  return Promise.reject(error);
})

//set default request headers within the token
export function setHeaderToken(){
  const token = localStorage.getItem("token");
  if(token){
    //logged in
    //bid token to bearer
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    //logged out
    delete api.defaults.headers.common["Authorization"]
  }
}
//call function everytime the header is set
setHeaderToken();

export default api;