import { Link, useNavigate} from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import {formatDate} from "../../utils/dateUtils"
import authApiClient from "../../services/auth-api-client";
import { IoMdPricetag } from "react-icons/io";

const CampaignInfo = ({ campaign, paid }) => {
  const {user} = useAuthContext()
  const navigate = useNavigate();

    const statusClasse = paid === true ? "bg-green-600 text-white" : "bg-gray-600 text-white";


  const handleDelete = async() =>{
    console.log("Deleting campaign:", campaign);
    try{
      const res = await authApiClient.delete(`/campaigns/${campaign.id}/`)
      if(res.status == 204){
      alert("Delete campaign successful!")
       navigate("/campaigns")}
    }catch(err){console.log(err)}
  }

  return (
    <div className="">
      {/* Title & Description */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          {campaign.title}
        </h2>
        <p className="mt-3 text-gray-600 text-base">
          {campaign.description}
        </p>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="font-medium">Status</p>
          <p className={`mt-1 ${campaign.status === "Ongoing" ? "text-green-600" : campaign.status === "Upcoming" ? "text-blue-600" : "text-red-600"}`}>
            {campaign.status}
          </p>
        </div>
        <div>
          <p className="font-medium">Start Date</p>
          <p className="mt-1">{formatDate(campaign.start_date)}</p>
        </div>
        <div>
          <p className="font-medium">End Date</p>
          <p className="mt-1">{formatDate(campaign.end_date)}</p>
        </div>
        <div>
          <p className="font-medium">Registration Fee</p>
          <p className="mt-1">{campaign.is_premium ? campaign.registration_fee : "0.00"}$ Tk</p>
        </div>
        <div className="flex justify-between">
          <div>
            <span className={`mt-1 font-medium ${campaign.is_premium ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700" } px-4 py-1 rounded-lg`}>{campaign.is_premium ? "Premium" : "Free"}</span>
          </div>
            {user && (
            <span className={`ml-4 mt-1 inline-flex items-center rounded px-2 py-0.5 text-sm font-semibold ${statusClasse}`}>
                <IoMdPricetag className="mr-1 h-4 w-4" /> {paid ? "Paid" : "Not Paid"}
            </span>)}
          </div>
      </div>
      {(user?.is_staff || user?.role === 'Doctor') && (
        <div className="mt-6 flex gap-4">
        <Link to={`/dashboard/campaign/${campaign.id}/update`}><button
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Edit
        </button></Link>
        <button onClick={handleDelete}
          className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
          Delete
        </button>
        </div>)}
    </div>
  );
};

export default CampaignInfo;
