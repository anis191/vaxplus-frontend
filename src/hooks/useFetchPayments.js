import { useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useFetchPayments = () => {
    const[payments, setPayments] = useState([])
    const[err, setError] = useState("")
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const fetchPayments = async() => {
            setLoading(true)
            try{
                const response = await authApiClient.get("/payments/")
                setPayments(response.data)
            }catch(err){
                setError(err)
            }finally{setLoading(false)}
        }
        fetchPayments()
    },[])

    return{
        payments, err, loading
    }
};

export default useFetchPayments;