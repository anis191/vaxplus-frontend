import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import TableSkeleton from "../Skeletons/TableSkeleton";

const statusColors = {
  Booked: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Canceled: "bg-red-100 text-red-800",
};

const BookingDoses = () => {
  const [loading, setLoading] = useState(false);
  const [booked_dose, setBooked_dose] = useState([]);

  useEffect(() => {
    const fetchBookingDose = async () => {
      setLoading(true);
      try {
        const response = await authApiClient.get("/booking_doses/");
        setBooked_dose(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDose();
  }, []);

  return (
    <div className="mt-6">
      <div className="card bg-base-100 shadow-lg rounded-lg">
        <div className="card-body">
          <h3 className="card-title text-xl font-bold mb-4">Recent Booking Doses</h3>

          {loading && <TableSkeleton />}

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="table w-full">
              <thead className="bg-indigo-50 text-indigo-800 uppercase text-sm font-semibold">
                <tr>
                  <th className="px-4 py-3">Booking ID</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3">Dose Center</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {booked_dose?.map((dose) => (
                  <tr key={dose.id} className="hover:bg-indigo-50 transition-colors">
                    <td className="px-4 py-3 font-medium">{dose.id.slice(0, 8)}...</td>
                    <td className="px-4 py-3">{dose.email}</td>
                    <td className="px-4 py-3">{dose.title}</td>
                    <td className="px-4 py-3">{dose.dose_center_name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColors[dose.status] || "bg-gray-100 text-gray-800"}`}
                      >
                        {dose.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {booked_dose?.map((dose) => (
              <div key={dose.id} className="shadow-md rounded-lg border border-gray-200 p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-700">{dose.email}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColors[dose.status] || "bg-gray-100 text-gray-800"}`}
                  >
                    {dose.status}
                  </span>
                </div>
                <div className="text-gray-600 text-sm space-y-1">
                  <p><strong>Booking ID:</strong> {dose.id.slice(0, 8)}...</p>
                  <p><strong>Campaign:</strong> {dose.title}</p>
                  <p><strong>Dose Center:</strong> {dose.dose_center_name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDoses;
