import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import { FiLoader, FiSettings } from "react-icons/fi";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const RegistrationsDoses =()=> {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const[searchQuery, setSearchQuery] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [statusFilter, setStatusFilter] = useState("");
  const {user} = useAuthContext()


  useEffect(() => {
    const fetchBookings = async () => {
        setLoading(true)
      try {
        const res = await authApiClient.get(`/booking_doses/?search=${searchQuery}&status=${statusFilter}`);
        setBookings(res.data);
        // console.log(res.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [searchQuery, statusFilter]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FiLoader className="animate-spin h-8 w-8 text-primary" />
        <p className="mt-2 text-gray-500">Loading all booked doses...</p>
      </div>
    );
  }

  // if (!bookings.length) {
    // return <p className="text-gray-500">You have no booked vaccine dose yet.</p>;
  // }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };


  return (
    <div className="overflow-x-auto">
      {(user?.is_staff || user?.role === 'Doctor') && (
        // <div className="flex justify-center items-center gap-3">
         <div className="flex flex-col sm:flex-row justify-center items-center gap-3 my-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select select-bordered w-52">
              <option value="">All Statuses</option>
              <option value="Booked">Booked</option>
              <option value="FirstCompleted">FirstCompleted</option>
              <option value="SecondCompleted">SecondCompleted</option>
              <option value="Canceled ">Canceled </option>
            </select>
          <form onSubmit={handleSearch} className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search by patient email..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input input-bordered w-80"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
        </div>
      )}
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            {/* <th>Booking ID</th> */}
            <th>Patient</th>
            <th>Campaign</th>
            <th>Vaccine</th>
            <th>Status</th>
            <th>First Dose Date</th>
            <th>Second Dose Date</th>
            <th>Booster Date</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="hover">
              {/* <td>{b.id.slice(0, 8)}</td>  */}
              <td>{b.email}</td> 
              <td>{b.title}</td>
              <td>{b.vaccine_name}</td>
              <td>{b.status}</td>
              <td>{b.first_dose_date}</td>
              <td>{b.second_dose_date || "N/A"}</td>
              <td>{b.booster_dose_date || "No booster dose"}</td>
              <td>
                <Link to={`/dashboard/booking_detail/${b.id}`}>
                <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  <FiSettings className="h-4 w-4" />
                  Manage
                </button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistrationsDoses;
