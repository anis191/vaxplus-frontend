import { useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useFetchPayments = () => {
    const[payments, setPayments] = useState([])
    const[err, setError] = useState("")

    useEffect(() => {
        const fetchPayments = async() => {
            try{
                const response = await authApiClient.get("/payments/")
                setPayments(response.data)
            }catch(err){
                setError(err)
            }
        }
        fetchPayments()
    },[])

    return{
        payments, err
    }
};

export default useFetchPayments;