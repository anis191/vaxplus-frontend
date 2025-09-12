import { useState } from "react";
import useFetchCampaigns from "../../hooks/useFetchCampaigns";
import Pagination from "../Common/Pagination";
import AllCampaign from "./AllCampaigns";
import FilterSection from "./FilterSection"
//
const CampaignPage = () => {
    const[currentPage, setCurrentPage] = useState(1)
    const[searchQuery, setSearchQuery] = useState("")
    const[selectedCategory, setSelectedCategory] = useState("")
    const [isPremium, setIsPremium] = useState("");
    const [startDateGt, setStartDateGt] = useState("");
    const [startDateLt, setStartDateLt] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [orderingQuery, setOrderingQuery] = useState("");

    const {campaigns, totalPages, loading, error} = useFetchCampaigns(currentPage,selectedCategory,isPremium,startDateGt,startDateLt,selectedStatus,orderingQuery,searchQuery)


    return (
        <div className="container mx-auto px-4 py-6">
            <FilterSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} isPremium={isPremium} setIsPremium={setIsPremium} startDateGt={startDateGt} setStartDateGt={setStartDateGt} startDateLt={startDateLt} setStartDateLt={setStartDateLt} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} orderingQuery={orderingQuery} setOrderingQuery={setOrderingQuery} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

            <hr className="my-2 border-t-2 border-gray-200" />
            <AllCampaign campaigns={campaigns} loading={loading} error={error}/>
            {!loading && (
            <Pagination totalPages={totalPages} currentPage={currentPage} handleChange={setCurrentPage}/> )}
        </div>
    );
};

export default CampaignPage;