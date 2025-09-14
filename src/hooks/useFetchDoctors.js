import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

// const useFetchDoctors = (searchQuery) => {
const useFetchDoctors = (searchQuery = "") => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        const fetchDoctors = async() =>{
            setLoading(true)
            const url = `/doctors/?search=${searchQuery}`
            try{
                const response = await apiClient.get(url)
                setDoctors(response.data)
            }catch(err){setError(err.message)}
            finally{setLoading(false)}
        }
        fetchDoctors()
    },[searchQuery])

    return {
        loading, error, doctors
    };
};

export default useFetchDoctors;
;