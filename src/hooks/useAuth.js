import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
    const[user, setUser] = useState(null)
    const[errorMsg, SetErrorMsg] = useState("")

    const getToken = () =>{
        const token = localStorage.getItem('authTokens')
        return token ? JSON.parse(token) : null
    }
    const[authTokens, SetAuthTokens] = useState(getToken())
    
    useEffect(() =>{
        if(authTokens) fetchUserProfile()
    },[authTokens])

    const handleAPIerrors = (error, defaultMessage="Something went wrong! Try again.") => {
        if(error.response && error.response.data){
                const error_msg = Object.values(error.response.data).flat().join("\n")
                SetErrorMsg(error_msg)
            }else{
                SetErrorMsg(defaultMessage)
        }
    }

    // Fetch user profile:
    const fetchUserProfile = async (accessToken = authTokens?.access) =>{
        try{
            const response = await apiClient.get('/auth/users/me', {
                headers: {Authorization: `JWT ${accessToken}`}
            })
            setUser(response.data)
            console.log(response.data)
        }catch(error){
            console.log(error)
            setUser(null);
        }
    }

    // Register Users:
    const registerUser = async (userData) =>{
        SetErrorMsg("")
        try{
            await apiClient.post("/auth/users/", userData)
            return{
                success: true
            }
        }catch(error){
            return handleAPIerrors(error, "Registration failed! Try again.")
        }
    }

    // Login User:
    const loginUser = async (userData) =>{
        try{
            SetErrorMsg("")
            const response = await apiClient.post("/auth/jwt/create/", userData)
            SetAuthTokens(response.data)
            localStorage.setItem("authTokens", JSON.stringify(response.data))
            await fetchUserProfile(response.data.access)
            return { success: true }
        }catch(error){
            SetErrorMsg(error.response.data?.detail)
            return { success: false }
        }
    }

    return {
        registerUser, errorMsg, loginUser, user
    };
};

export default useAuth;