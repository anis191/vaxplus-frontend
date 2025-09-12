
import { useEffect, useState } from "react";
import Campaign from "../../Campaigns/Campaign";
import CampaignSummary from "../../Campaigns/CampaignSummary";
import CardGroup from "./CardGroup";
import apiClient from "../../../services/api-client"
import CampaignSkeleton from "../../Skeletons/CampaignSkeleton"

const CampaignList = () => {
  const [campaignsDatas, setCampaignsDatas] = useState(null)

  useEffect(()=>{
    const fetchCampaigns = async() =>{
      try{
        const response = await apiClient.get("/featured_campaigns/")
        console.log(response.data)
        setCampaignsDatas(response.data)
      }catch(err){console.log(err)}
    }
    fetchCampaigns()
  },[])

  if(!campaignsDatas)
    return(
      <div className="flex justify-center"><CampaignSkeleton /></div>
  )

  const campaignsData = [
    {
      campaign: campaignsDatas.upcoming?.[0],
      campaign_summary: [campaignsDatas.upcoming?.[1], campaignsDatas.upcoming?.[2]],
    },
    {
      campaign: campaignsDatas.ongoing?.[0],
      campaign_summary: [campaignsDatas.ongoing?.[1], campaignsDatas.ongoing?.[2]],
    },
    {
      campaign: campaignsDatas.ended?.[0],
      campaign_summary: [campaignsDatas.ended?.[1], campaignsDatas.ended?.[2]],
    },
  ];

  return (
    <div>
      <section className="mx-auto max-w-[1200px] px-4 py-5 md:py-10">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {campaignsData.map((obj, idx)=>(
          <div key={idx} className="space-y-4">
            <Campaign key={obj.campaign.id} campaign={obj.campaign} heading={true}/>
          
            {obj.campaign_summary.map((summary) => (
              <CampaignSummary key={summary.id} campaign={summary}/>
            ))}
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out sm:w-auto text-center">
              View all
            </button>
          </div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="space-y-8 md:hidden">
          {campaignsData.slice(0, 2).map((obj, idx) => (
            <CardGroup key={idx} campaign={obj.campaign} campaign_summary={obj.campaign_summary} />
          ))}
        </div>
      </section> 
    </div>
  )
};

export default CampaignList;