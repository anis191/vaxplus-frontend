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
            {campaigns.map((campaign, idx) => (
                <Campaign key={idx} image={campaign.banner} title={campaign.title} start_date={campaign.start_date} end_date={campaign.end_date} tags={campaign.vaccine_details.map(vax => vax.name) || []} is_premium={campaign.is_premium} status={campaign.status}/>
            ))}
        </div>
    );
};

export default AllCampaign;