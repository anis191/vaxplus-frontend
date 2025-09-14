import { useState } from "react";
import useFetchCenters from "../../hooks/useFetchCenters";
import authApiClient from "../../services/auth-api-client";
import PremiumCampaign from "./PremiumCampaign";
import { useForm } from "react-hook-form";

const Appointment = ({is_premium, paid, user, vaccine_details, start_date, end_date, campaign_id, fee}) => {
  const {centers} = useFetchCenters();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const[errMsg, setErrMsg] = useState("")
  const[loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    setErrMsg("")
    try {
      const response = await authApiClient.post(`/campaigns/${campaign_id}/booked/`, data)
      console.log("Appointment booked:", response.data);
      alert("Appointment booked successfully!");
    } catch (err) {
        if (err.response && err.response.data) {
              setErrMsg(err.response.data[0]);
              setTimeout(() => {
                  setErrMsg("");
              },10000);
          }else{
              setErrMsg("Failed Vaccine Dose Booking!");
          }
    }finally{setLoading(false)}
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">

        {errMsg && (
            <div className="alert alert-error alert-soft mb-2">
            <span className="font-bold">{errMsg}</span>
            </div>
        )}

      {is_premium && !paid ? (
        <PremiumCampaign user={user} campaign_id={campaign_id} fee={fee}/>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center">
            Book Your Vaccine Campaign
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vaccine
              </label>
              <select
                {...register("vaccine", { required: "Vaccine is required" })}
                className="select select-bordered w-full">
                <option value="">Select Vaccine</option>
                {vaccine_details.map((vaccine) => (
                  <option key={vaccine.id} value={vaccine.id}>{vaccine.name}</option>
                ))}
              </select>
              {errors.vaccine && <p className="text-red-500 text-sm">{errors.vaccine.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dose Center
              </label>
              <select
                {...register("dose_center", { required: "Center is required" })}
                className="select select-bordered w-full">
                <option value="">Select Dose Center</option>
                {centers.map((center) => (
                  <option key={center.id} value={center.id}>{center.name}-{center.city}</option>
                ))}
              </select>
              {errors.center && <p className="text-red-500 text-sm">{errors.center.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                {...register("dates", { required: "Date is required" })}
                className="input input-bordered w-full"
                min={start_date}
                max={end_date}/>
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
            </div>

            {user ? (
              <button type="submit" disabled={loading}
                className="btn bg-blue-600 text-white hover:bg-blue-700">
                {loading ? "Processing..." : "Book Now"}
              </button>
            ) : (
              <button
                type="button"
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


