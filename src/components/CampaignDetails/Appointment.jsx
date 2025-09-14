import useFetchCenters from "../../hooks/useFetchCenters";
import PremiumCampaign from "./PremiumCampaign";

const Appointment = ({is_premium, paid, user, vaccine_details, start_date, end_date, campaign_id, fee}) => {
  const {centers} = useFetchCenters()

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">

      {is_premium && !paid ? (
        <PremiumCampaign user={user} campaign_id={campaign_id} fee={fee}/>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center">
            Book Your Vaccine Campaign
          </h2>

          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vaccine
              </label>
              <select className="select select-bordered w-full" required>
                <option value="">Select Vaccine</option>
                {vaccine_details.map((vaccine) => (
                  <option key={vaccine.id} value={vaccine.id}>{vaccine.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dose Center
              </label>
              <select className="select select-bordered w-full" required>
                <option value="">Select Dose Center</option>
                {centers.map((center) => (
                  <option key={center.id} value={center.id}>{center.name}-{center.city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input type="date" className="input input-bordered w-full" min={start_date} max={end_date} required />
            </div>

            {user ? (
            <button type="submit"
              className="btn bg-blue-600 text-white hover:bg-blue-700">
              Book Now
            </button>) : (
              <button
              className="btn bg-blue-500 text-white hover:bg-blue-600">
                Register/Log In For Appointment
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Appointment;

