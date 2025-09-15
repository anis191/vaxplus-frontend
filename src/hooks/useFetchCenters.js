
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchCenters = () => {
    const[centers, setCenters] = useState([])
    const[err, setError] = useState("")

    const fetchCenters = async () => {
        try{
            const response = await apiClient.get("/centers/")
            setCenters(response.data)
        }catch(err){
            setError(err)
        }
    }
    useEffect(() => {
        fetchCenters()
    },[])
    return{
        centers, err, fetchCenters
    }
};

export default useFetchCenters;