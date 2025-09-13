import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
    const[user, setUser] = useState(null)
    const[errorMsg, SetErrorMsg] = useState("")
    const[dashLoading, setDashLoading] = useState(true)

    const getToken = () =>{
        const token = localStorage.getItem('authTokens')
        return token ? JSON.parse(token) : null
    }
    const[authTokens, SetAuthTokens] = useState(getToken())
    
    useEffect(() =>{
        if(authTokens) fetchUserProfile()
        else setDashLoading(false)
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
        }catch(error){
            console.log(error)
            setUser(null);
        }finally{setDashLoading(false)}
    }

     // Update User Profile:
    const updateUserProfile = async (data) =>{
        SetErrorMsg("")
        try{
            await apiClient.put("/auth/users/me/", data, {
                headers: {Authorization: `JWT ${authTokens?.access}`}
            })
            return { success: true };
        }catch(error){
            handleAPIerrors(error, "Failed to update profile.");
            return { success: false };
        }
    } 

    // Change Password:
    const changePassword = async(data) =>{
        SetErrorMsg("")
        try{
            await apiClient.post("/auth/users/set_password/", data, {
                headers: {Authorization: `JWT ${authTokens?.access}`}
            })
            return { success: true };
        }catch(error){
            handleAPIerrors(error, "Failed to change password.");
            return { success: false };
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

    // Reset Password:
    const resetPassword = async(email) =>{
        SetErrorMsg("")
        try{
            await apiClient.post("/auth/users/reset_password/", email)
            return { success: true };
        }catch(error){handleAPIerrors(error, "Please Try Again");}
    }

    const logoutUser = async () =>{
        SetAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
    }

    return {
        registerUser, errorMsg, loginUser, user, resetPassword, logoutUser, dashLoading, updateUserProfile, changePassword
    };
};

export default useAuth;