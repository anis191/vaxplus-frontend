// import { Link } from "react-router";
import Error from "../Common/Error";
import CampaignSkeleton from "../Skeletons/CampaignSkeleton";
import Campaign from "./Campaign";

const AllCampaign = ({campaigns, loading, error}) => {
    if(loading)
        return(
            <div className="flex justify-center min-h-[50vh]">
                <CampaignSkeleton />
            </div>
        )
    else if(error)
        return(
            <div className="flex justify-center items-center h-[50vh]">
                <Error message={error}/>
            </div>
        )
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
                <Campaign key={campaign.id} campaign={campaign}/>
            ))}
        </div>
    );
};

export default AllCampaign;