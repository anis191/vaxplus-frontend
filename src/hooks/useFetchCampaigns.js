
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchCampaigns = (currentPage) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [campaigns, setCampaigns] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchCampaigns = async() =>{
            setLoading(true)
            const url = `/campaigns/?page=${currentPage}`
            try{
                const response = await apiClient.get(url)
                const data = response.data
                setCampaigns(data.results)
                setTotalPages(Math.ceil(data.count / 10))
            }catch(err){setError(err.message)}
            finally{setLoading(false)}
        }
        fetchCampaigns()
    },[currentPage])

    return {
        loading, error, campaigns, totalPages
    };
};

export default useFetchCampaigns;