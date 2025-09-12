import {formatDate} from "../../utils/dateUtils"

const CampaignInfo = ({ campaign }) => {

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
        <div>
          <span className={`mt-1 font-medium ${campaign.is_premium ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700" } px-4 py-1 rounded-lg`}>{campaign.is_premium ? "Premium" : "Free"}</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfo;
