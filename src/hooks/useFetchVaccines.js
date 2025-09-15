
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchVaccines = () => {
    const[vaccines, setVaccines] = useState([])
    const[err, setError] = useState("")

    const fetchVaccines = async () => {
        try{
            const response = await apiClient.get("/vaccines/")
            setVaccines(response.data)
        }catch(err){
            setError(err)
        }
    }

    useEffect(() => {
        fetchVaccines()
    },[])
    
    return{
        vaccines, err, fetchVaccines
    }
};

export default useFetchVaccines;