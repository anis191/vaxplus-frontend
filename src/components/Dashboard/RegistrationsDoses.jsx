import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import { FiLoader } from "react-icons/fi";

const RegistrationsDoses =()=> {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
        setLoading(true)
      try {
        const res = await authApiClient.get("/booking_doses/");
        setBookings(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FiLoader className="animate-spin h-8 w-8 text-primary" />
        <p className="mt-2 text-gray-500">Loading all booked doses...</p>
      </div>
    );
  }

  if (!bookings.length) {
    return <p className="text-gray-500">You have no booked vaccine dose yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Campaign</th>
            <th>Vaccine</th>
            <th>Dose</th>
            <th>Center</th>
            <th>Status</th>
            <th>First Dose Date</th>
            <th>Second Dose Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, idx) => (
            <tr key={b.id} className="hover">
              <td>{idx + 1}</td>
              <td>{b.campaign.title}</td>
              <td>{b.vaccine.name}</td>
              <td>{b.dose_number || "N/A"}</td>
              <td>{b.dose_center?.name || "N/A"}</td>
              <td>{b.status}</td>
              <td>{b.first_dose_date}</td>
              <td>{b.second_dose_date || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistrationsDoses;
