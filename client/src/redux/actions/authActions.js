import axios from "axios"
import { REGISTER_USER,LOGIN_USER } from "../constants/ActionsTypes"
//REgister User
export const registerUser=(formData)=>async (dispatch)=>{
try{
const res =await  axios.post("/api/auth/register",formData)
dispatch({
    type:REGISTER_USER,
    payload:res.data
})
}
catch(error){
    console.log(error)
}
} 
//Login User
export const loginUser=(formData)=>async(dispatch)=>{
    try{
      const res=await axios.post("/api/auth/login",formData)
      dispatch({
          type:LOGIN_USER,
          payload:res.data
      })  
    }
    catch(error){
        console.log(error)
    }
}