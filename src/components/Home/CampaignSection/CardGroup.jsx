import Campaign from "../../Campaigns/Campaign";
import CampaignSummary from "../../Campaigns/CampaignSummary";

const CardGroup = ({campaign, campaign_summary}) => {
    return (
        <div className="space-y-4">
            <Campaign image={campaign.image} title={campaign.title} date={campaign.date} tags={campaign.tags}/>

            {campaign_summary.map((obj, idx)=>(
                <CampaignSummary key={idx} image={obj.image} title={obj.title} date={obj.date}/>
            ))}
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out sm:w-auto text-center">
                View all
            </button>
        </div>
    );
};

export default CardGroup;