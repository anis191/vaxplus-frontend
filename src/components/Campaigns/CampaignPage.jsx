import { useState } from "react";
import useFetchCampaigns from "../../hooks/useFetchCampaigns";
import Pagination from "../Common/Pagination";
import AllCampaign from "./AllCampaigns";
import FilterSection from "./FilterSection"

const CampaignPage = () => {
    const[currentPage, setCurrentPage] = useState(1)
    const {campaigns, totalPages, loading, error} = useFetchCampaigns(currentPage)

    return (
        <div className="container mx-auto px-4 py-6">
            <FilterSection />
            <hr className="my-2 border-t-2 border-gray-200" />
            <AllCampaign campaigns={campaigns} loading={loading} error={error}/>
            {!loading && (
            <Pagination totalPages={totalPages} currentPage={currentPage} handleChange={setCurrentPage}/> )}
        </div>
    );
};

export default CampaignPage;