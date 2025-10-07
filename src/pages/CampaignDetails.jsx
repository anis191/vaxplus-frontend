import { useParams } from "react-router";
import CampaignDetail from "../components/CampaignDetails/CampaignDetail"
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
// import CampaignSkeleton from "../components/Skeletons/CampaignSkeleton";
import Error from "../components/Common/Error";
import CampaignDetailsSkeleton from "../components/Skeletons/CampaignDetailsSkeleton";

const CampaignDetails = () => {
    const {campaignId} = useParams()
    const[campaign, setCampaign] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(()=>{
        setLoading(true)
            apiClient.get(`/campaigns/${campaignId}/`)
            .then((res) => setCampaign(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));     
    },[campaignId])

    if(loading) return(<div className="flex justify-center my-3"><CampaignDetailsSkeleton /></div>)
    if(error) return(<Error />)
    if(!campaign) return(<p>Campaign Not Fount</p>)

    return (
        <div>
            <CampaignDetail campaign={campaign}/>
        </div>
    );
};

export default CampaignDetails;