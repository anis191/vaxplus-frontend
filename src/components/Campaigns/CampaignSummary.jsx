import {campaignDate} from "../../utils/dateUtils"
import defaultImg from "../../assets/images/vaccines-hero.png"
import { Link } from "react-router";

const CampaignSummary = ({campaign}) => {
  if (!campaign) return null;

  const date = campaignDate(campaign.status,campaign.start_date, campaign.end_date)
    return (
        <Link to={`/campaigns/${campaign.id}/`}>
        <div className="my-4 md:my-8 flex overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg">
            <img src={campaign.banner || defaultImg} alt={campaign.title || "No title"}
              className="h-20 w-20 flex-shrink-0 object-cover transition-transform duration-300 hover:scale-105 md:h-20 md:w-20 sm:h-16 sm:w-16" />
            <div className="p-3">
              <h3 className="cursor-pointer text-sm leading-snug font-semibold hover:text-blue-600">{campaign.title}</h3>
              <div className="flex justify-between items-center">
                <p className="mt-1 text-xs text-gray-500">{date}</p>
                <span className="ml-2 inline-block rounded px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700">Free</span>
              </div>
            </div>
        </div>
        </Link>
    );
};

export default CampaignSummary;