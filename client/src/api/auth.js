//custom axios in api file
import api from "./api";

export async function register(data){
  try {
    const res = await api.post(
      "api/auth/register",
      data
    );
    console.log(res?.data)
    //return response/api data 
    return res.data;
  } catch (err) {
    console.error(err)
  }
};

export async function login(data){
  try {
    const res = await api.post(
      "api/auth/login",
      data
    );
    console.log(res?.data)
    //return response/api data 
    return res.data;
  } catch (err) {
    console.error(err)
  }
};
