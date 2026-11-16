//custom axios in api file
import api from "./api";

export async function register(data){
  try {
    const res = await api.post("/auth/register", data);
    console.log("Register API response:", res.data)
    //return response/api data 
    return res.data;
  } catch (err) {
    console.error("Register API error:", err)
  }
};

export async function login(data){
  try {
    const res = await api.post("/auth/login", data);
    console.log("Login API response:", res.data)
    //return response/api data 
    return res.data;
  } catch (err) {
    console.error("Login API error response:", err)
  }
};
