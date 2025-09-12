
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchCampaigns = (currentPage,selectedCategory,isPremium,startDateGt,startDateLt,selectedStatus,orderingQuery,searchQuery) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [campaigns, setCampaigns] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchCampaigns = async() =>{
            setLoading(true)
            // const url = `/campaigns/?page=${currentPage}`
            const url = `/campaigns/?category_id=${selectedCategory}&is_premium=${isPremium}&page=${currentPage}&start_date__gt=${startDateGt}&start_date__lt=${startDateLt}&status=${selectedStatus}&search=${searchQuery}&ordering=${orderingQuery}`
            try{
                const response = await apiClient.get(url)
                const data = response.data
                setCampaigns(data.results)
                setTotalPages(Math.ceil(data.count / 6))
            }catch(err){setError(err.message)}
            finally{setLoading(false)}
        }
        fetchCampaigns()
    },[currentPage,selectedCategory,isPremium,startDateGt,startDateLt,selectedStatus,searchQuery,orderingQuery])

    return {
        loading, error, campaigns, totalPages
    };
};

export default useFetchCampaigns;