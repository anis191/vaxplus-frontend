import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import TableSkeleton from "../Skeletons/TableSkeleton";

const BookingDoses = () => {
    const[loading, setLoading] = useState(false)
    const[booked_dose, setBooked_dose] = useState([])

    useEffect(()=>{
        const fetchBookingDose = async() => {
            setLoading(true)
            try{
                const response = await authApiClient.get("/booking_doses/")
                setBooked_dose(response.data)
            }catch(err){console.log(err)}
            finally{setLoading(false)}
        }
        fetchBookingDose()
    },[])

  const getStatusColor = (status) => {
    switch (status) {
      case "Booked":
        return "badge-info";
      case "Completed":
        return "badge-success";
      case "Canceled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="mt-6 card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg">Recent Booking Doses</h3>
        {loading && (<TableSkeleton />)}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Email</th>
                <th>Campaign</th>
                <th>Dose Center</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {booked_dose?.map((dose) => (
                <tr key={dose.id}>
                  <td className="whitespace-nowrap">{dose.id.slice(0, 8)}...</td>
                  <td className="whitespace-nowrap">{dose.email}</td>
                  <td className="whitespace-nowrap">{dose.title}</td>
                  <td className="whitespace-nowrap">{dose.dose_center_name}</td>
                  <td>
                    <div
                      className={`badge ${getStatusColor(dose.status)}`}
                    >
                      {dose.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingDoses;
