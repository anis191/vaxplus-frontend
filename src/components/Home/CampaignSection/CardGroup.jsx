import Campaign from "../../Campaigns/Campaign";
import CampaignSummary from "../../Campaigns/CampaignSummary";

const CardGroup = ({campaign, campaign_summary}) => {
    return (
        <div className="space-y-4">
            <Campaign image={campaign.banner} title={campaign.title} start_date={campaign.start_date} end_date={campaign.end_date} is_premium={campaign.is_premium} tags={campaign.vaccine_details.map(vax=>vax.name)} status={campaign.status} heading={true}/>

            {campaign_summary.map((obj)=>(
                <CampaignSummary key={obj.id} image={obj.banner} title={obj.title} start_date={obj.start_date} end_date={obj.end_date} status={obj.status}/>
            ))}
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out sm:w-auto text-center">
                View all
            </button>
        </div>
    );
};

export default CardGroup;