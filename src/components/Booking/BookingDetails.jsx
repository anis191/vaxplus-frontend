import { useEffect, useState } from "react";
import { FiCalendar, FiMapPin, FiUser, FiActivity, FiInfo } from "react-icons/fi";
import { useParams } from "react-router";
import authApiClient from "../../services/auth-api-client";
import CampaignSkeleton from "../Skeletons/CampaignSkeleton";
import BookingCard from "./BookingCard";

const BookingDetails = () => {
    const {uuid} = useParams()
    const [booking, setBooking] = useState()
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("");
    const[errMsg, setErrMsg] = useState("")

    useEffect(()=>{
        const fetchBookingData = async()=>{
            setLoading(true)
            try{
                const response = await authApiClient.get(`/booking_doses/${uuid}/`)
                // console.log(response.data)
                setBooking(response.data)
                setStatus(response.data.status)
            }catch(err){console.log(err)}
            finally{setLoading(false)}
        }
        fetchBookingData()
    },[uuid])

    if(loading) 
        return (
            <div className="w-full flex justify-center my-5">
                <CampaignSkeleton />
            </div>
        )

    if (!booking) 
        return <p className="text-gray-500 text-center mt-10">No booking details available.</p>;

    const bookingFields = [
        { label: "Booking ID", value:booking.id, icon: FiInfo, color: "text-blue-500" },
        { label: "Patient Email", value:booking.email, icon: FiUser, color: "text-green-500" },
        { label: "Campaign", value: booking.title, icon: FiActivity, color: "text-purple-500" },
        { label: "Vaccine", value:booking.vaccine_name, icon: FiInfo, color: "text-pink-500" },
        { label: "Dose Center", value:booking.dose_center_name || "", icon: FiMapPin, color: "text-red-500" },
        { label: "First Dose", value:booking.first_dose_date, icon: FiCalendar, color: "text-yellow-500" },
        { label: "Second Dose", value:booking.second_dose_date || "", icon: FiCalendar, color: "text-orange-500" },
        { label: "Booster Dose", value:booking.booster_dose_date || "No booster dose", icon: FiCalendar, color: "text-indigo-500" },
      ];

      const statusColors = {
        Booked: "bg-blue-500",
        FirstCompleted: "bg-yellow-500",
        SecondCompleted: "bg-orange-500",
        Completed: "bg-green-600",
        Canceled: "bg-red-500"
    };

    const handleStatusChange = async (newStatus) => {
        setStatus(newStatus);
        setErrMsg("")
        try{
          const response = await authApiClient.put(`/booking_doses/${uuid}/`,{status:newStatus})
          console.log(response)
        }catch (err) {
            console.log(err)
             if (err.response && err.response.data && err.response.data.status) {
                setErrMsg(err.response.data.status[0]);
                setTimeout(() => {
                    setErrMsg("");
                },5000);
            }else{
                setErrMsg("Failed to update status!");
            }
          setStatus(booking.status)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Booking Details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-20">
        {bookingFields.map((field, index) => (
          <BookingCard key={index} icon={field.icon} label={field.label} value={field.value} iconColor={field.color}/>))}

            <div className="flex flex-col">
            {errMsg && (
                <div className="alert alert-error alert-soft mb-2">
                <span className="font-bold">{errMsg}</span>
                </div>
            )}
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded border border-gray-200 text-sm">
            <FiInfo className="text-gray-500 h-5 w-5" />
              <div className="flex justify-between w-full items-center">
                <span className="text-gray-600 font-medium">Status</span>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className={`px-2 py-0.5 rounded-full font-semibold text-white text-xs cursor-pointer ${statusColors[status]}`}>
                  {Object.keys(statusColors).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
            </div></div>
      </div>
    </div>
    );
};

export default BookingDetails;
