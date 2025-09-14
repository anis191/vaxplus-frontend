import { useEffect, useState } from "react";
import TabsNavber from "./TabsNavber";
import CampaignInfo from "./CampaignInfo";
import VaccinesInfo from "./VaccinesInfo";
import DoctorsInfo from "./DoctorsInfo";
import Appointment from "./Appointment";
import Reviews from "./Reviews";
import defaultImg from "../../assets/images/vaccines-hero.png"
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";

const CampaignDetailsTabs = ({campaign}) => {
  const [activeTab, setActiveTab] = useState("info");
  const[paid, setPaid] = useState(false)
  const {user} = useAuthContext()
  console.log(campaign)

  useEffect(()=>{
    if (!campaign?.is_premium) return;
    const checkPaid = async() => {
      try{
        const response = await authApiClient.get(`/campaigns/has_paid/${campaign.id}/`)
        setPaid(response.data.hasPaid)
      }catch(err){console.log(err)}
    }
    checkPaid()
  },[])

  return (
    <section className="min-h-screen">
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-10">

        {/* Tabs */}
        <TabsNavber activeTab={activeTab} setActiveTab={setActiveTab}/>

        {/* Card */}
        <div className="lg:flex mt-1">          
          <div className="flex flex-col p-6 sm:p-10 lg:w-1/2">
            <div className="flex-auto">
              {activeTab === "info" && ( <CampaignInfo campaign={campaign} paid={paid}/> )}
              {activeTab === "vaccines" && ( <VaccinesInfo campaign={campaign}/> )}
              {activeTab === "doctors" && ( <DoctorsInfo campaign={campaign} /> )}
              {activeTab === "Appointment" && ( <Appointment paid={paid} is_premium={campaign.is_premium} user={user} vaccine_details={campaign.vaccine_details} start_date={campaign.start_date} end_date={campaign.end_date} campaign_id={campaign.id} fee={campaign.registration_fee}/> )}
              {activeTab === "reviews" && ( <Reviews /> )}
            </div>
          </div>

          {/* Banner */}
          <div className="mx-3 my-6 lg:w-1/2 hidden sm:block overflow-hidden rounded-sm">
            <img className="object-cover w-full max-h-96" src={campaign.banner || defaultImg} alt={campaign.title || "No title"}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignDetailsTabs;
