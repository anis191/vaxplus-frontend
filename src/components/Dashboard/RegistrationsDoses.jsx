import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import { FiLoader, FiSettings, FiUsers } from "react-icons/fi";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const statusColors = {
  Booked: "bg-blue-100 text-blue-800",
  FirstCompleted: "bg-green-100 text-green-800",
  SecondCompleted: "bg-purple-100 text-purple-800",
  Canceled: "bg-red-100 text-red-800",
};

const RegistrationsDoses = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await authApiClient.get(`/booking_doses/?search=${searchQuery}&status=${statusFilter}`);
        setBookings(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [searchQuery, statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FiLoader className="animate-spin h-8 w-8 text-primary" />
        <p className="mt-2 text-gray-500">Loading all booked doses...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mx-5 my-3">
      {/* Header */}
      <div className="flex items-center justify-center my-4">
        <FiUsers className="text-purple-500 h-6 w-6 mr-2" />
        <h2 className="text-lg md:text-xl font-semibold text-gray-600">
         {user?.role == 'Doctor' ? "Manage Your Patients" : "My Booked Doses" }
        </h2>
      </div>

      {/* Filters & Search */}
      {(user?.is_staff || user?.role === "Doctor") && (
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered input-sm md:input-md w-[40%] md:w-auto">
            <option value="">All Status</option>
            <option value="Booked">Booked</option>
            <option value="FirstCompleted">FirstCompleted</option>
            <option value="SecondCompleted">SecondCompleted</option>
            <option value="Canceled">Canceled</option>
          </select>

          <form onSubmit={handleSearch} className="join">
            <input
              type="text"
              placeholder="Search by patient email..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input input-bordered join-item focus:outline-none input-sm md:input-md"
            />
            <button type="submit" className="btn btn-soft btn-primary btn-sm md:btn-md join-item">Search</button>
          </form>
        </div>
      )}
      </div>

      {/* Table for large screens */}
      <div className="hidden md:block shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <table className="table w-full">
          <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm font-semibold">
            <tr>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Vaccine</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">First Dose</th>
              <th className="px-4 py-3">Second Dose</th>
              <th className="px-4 py-3">Booster</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((b, idx) => (
              <tr
                key={b.id}
                className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50`}
              >
                <td className="px-4 py-3 text-gray-700 font-medium">{b.email}</td>
                <td className="px-4 py-3 text-gray-600">{b.title}</td>
                <td className="px-4 py-3 text-gray-600">{b.vaccine_name}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColors[b.status] || "bg-gray-100 text-gray-800"}`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{b.first_dose_date}</td>
                <td className="px-4 py-3 text-gray-600">{b.second_dose_date || "N/A"}</td>
                <td className="px-4 py-3 text-gray-600">{b.booster_dose_date || "No booster"}</td>
                <td className="px-4 py-3">
                  <Link to={`/dashboard/booking_detail/${b.id}`}>
                    <button className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all">
                      <FiSettings className="h-4 w-4" /> Manage
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="md:hidden flex flex-col gap-4">
        {bookings.map((b) => (
          <div key={b.id} className="shadow-md rounded-lg border border-gray-200 p-4 bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-700">{b.email}</h3>
              <span className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColors[b.status] || "bg-gray-100 text-gray-800"}`}>
                {b.status}
              </span>
            </div>
            <div className="text-gray-600 text-sm space-y-1">
              <p><strong>Campaign:</strong> {b.title}</p>
              <p><strong>Vaccine:</strong> {b.vaccine_name}</p>
              <p><strong>First Dose:</strong> {b.first_dose_date}</p>
              <p><strong>Second Dose:</strong> {b.second_dose_date || "N/A"}</p>
              <p><strong>Booster:</strong> {b.booster_dose_date || "No booster"}</p>
            </div>
            <div className="mt-3">
              <Link to={`/dashboard/booking_detail/${b.id}`}>
                <button className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all w-full justify-center">
                  <FiSettings className="h-4 w-4" /> Manage
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationsDoses;
