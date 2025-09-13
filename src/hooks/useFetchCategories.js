
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchCategories = () => {
    const[categories, setCategories] = useState([])
    const[err, setError] = useState("")

    useEffect(() => {
        const fetchCategory = async () => {
            try{
                const response = await apiClient.get("/categories/")
                setCategories(response.data)
            }catch(err){
                setError(err)
            }
        }
        fetchCategory()
    },[])
    return{
        categories, err
    }
};

export default useFetchCategories;