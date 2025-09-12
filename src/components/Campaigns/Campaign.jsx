import { IoMdPricetag } from "react-icons/io";
import {campaignDate} from "../../utils/dateUtils"
import defaultImg from "../../assets/images/vaccines-hero.png"
import { Link } from "react-router";

const Campaign = ({campaign, heading}) => {
   if (!campaign) return null;


  const date = campaignDate(campaign.status, campaign.start_date, campaign.end_date)

  const statusClasse = campaign.status === "Ongoing" ? "bg-green-600 text-white" : campaign.status === "Upcoming" ? "bg-blue-600 text-white" : "bg-gray-600 text-white";

    return (
      <div>
      {heading && (
      <div>
        <h2 className="relative mb-6 text-2xl md:text-3xl font-bold text-gray-900 inline-block pb-4">
          <span className="relative z-10">{campaign.status}</span>
          <span className="relative z-10 ml-2">Campaigns</span>
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-blue-400"></span>
          <span className="absolute left-0 bottom-0 h-[4px] w-[110px] bg-blue-600"></span>
        </h2>
      </div>)}
      
        <Link to={`/campaigns/${campaign.id}/`}>
        <div className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg">
            <img src={campaign.banner || defaultImg} alt={campaign.title || "No title"}
              className="h-52 w-full object-cover transition-transform duration-300 hover:scale-105"/>
            
            <span className={`ml-4 mt-1 inline-flex items-center rounded px-2 py-0.5 text-sm font-semibold ${statusClasse}`}>
              <IoMdPricetag className="mr-1 h-4 w-4" /> {campaign.status}
            </span>

            <div className="px-4 pb-4 pt-2">
              <h2 className="cursor-pointer text-lg font-semibold hover:text-blue-600">{campaign.title}</h2>
              
              <div className="flex justify-between items-center">
                <p className="mt-1 text-sm text-gray-500">{date}</p>
                <span className={`ml-2 inline-block rounded px-3 py-0.5 text-sm font-semibold ${campaign.is_premium ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>{campaign.is_premium ? "Premium" : "Free"}</span>
              </div>
              
              {campaign.vaccine_details && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {campaign.vaccine_details.map((vaccine) => (
                    <span key={vaccine.id} className="rounded bg-gray-200 px-2 py-1 text-xs hover:bg-blue-100 hover:text-blue-600">{vaccine.name}</span>
                  ))}
                </div>
              )}
            </div>
        </div></Link>
      </div>
    );
};

export default Campaign;