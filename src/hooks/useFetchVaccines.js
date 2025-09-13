
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchVaccines = () => {
    const[vaccines, setVaccines] = useState([])
    const[err, setError] = useState("")

    useEffect(() => {
        const fetchVaccines = async () => {
            try{
                const response = await apiClient.get("/vaccines/")
                setVaccines(response.data)
            }catch(err){
                setError(err)
            }
        }
        fetchVaccines()
    },[])
    return{
        vaccines, err
    }
};

export default useFetchVaccines;