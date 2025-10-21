import { useEffect, useState } from "react";
import { FiUser, FiCheck, FiX } from "react-icons/fi";
import authApiClient from "../services/auth-api-client";
import { Link } from "react-router";
import TableSkeleton from "../components/Skeletons/TableSkeleton";

const DoctorApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try{
        const res = await authApiClient.get("/doctors_apply/")
        setApplications(res.data);
      }catch(err){console.error(err);}
      finally{setLoading(false);}
    };
    fetchApplications();
  }, []);

  const handleStatusChange = async(id,newStatus) =>{
    setStatusUpdating(id);
    try{
      const res = await authApiClient.patch(`/doctors_apply/${id}/`,{status: newStatus,})
      setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status:newStatus } : app)))
      console.log(res.data);
    }catch(err){console.log(err)}
    finally{setStatusUpdating(null)}
  };

  if (loading)
    return (
        <div>
        <p className="text-gray-500 text-center my-5">Loading applications.....</p>
        <TableSkeleton /></div>
    )

  if (!applications.length)
    return <p className="text-gray-500 text-center mt-10">No doctor applications yet.</p>

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white mt-1">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Doctor Applications
      </h2>

      {/* Responsive table kept as a single layout. Uses data-label for mobile. */}
      <div className="overflow-x-auto">
        <table className="responsive-table w-full table-auto text-sm">
          <thead className="bg-gray-100 uppercase text-gray-600 text-left">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Qualifications</th>
              <th className="px-4 py-3">License</th>
              <th className="px-4 py-3">Certificate</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applied At</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors align-top">
                <td data-label="User" className="px-4 py-3 flex items-center gap-2 text-gray-700 whitespace-normal">
                  <FiUser className="text-gray-400" />
                  <span className="break-words">{app.user}</span>
                </td>
                <td data-label="Qualifications" className="px-4 py-3 text-gray-700 whitespace-normal">{app.qualifications}</td>
                <td data-label="License" className="px-4 py-3 text-gray-700 whitespace-normal">{app.license_number}</td>
                <td data-label="Certificate" className="px-4 py-3 text-blue-600 whitespace-normal">
                  {app.certificate ? (
                    <Link to={app.certificate} target="_blank" rel="noopener noreferrer"
                      className="underline hover:text-blue-800"> View </Link>) : ("No image")}
                </td>
                <td data-label="Status" className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      app.status === "Approved"
                        ? "bg-green-600"
                        : app.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-gray-500"
                    }`}>
                    {app.status}
                  </span>
                </td>
                <td data-label="Applied At" className="px-4 py-3 text-gray-700 whitespace-normal">
                  {new Date(app.applied_at).toLocaleString()}
                </td>
                <td data-label="Action" className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleStatusChange(app.id, "Approved")}
                    disabled={statusUpdating === app.id}
                    className="w-full sm:w-auto flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition-colors">
                    <FiCheck className="w-4 h-4" /> Approve
                  </button>
                {app.status === 'Pending' &&
                  <button onClick={() => handleStatusChange(app.id, "Rejected")} disabled={statusUpdating === app.id}
                    className="w-full sm:w-auto flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors">
                    <FiX className="w-4 h-4" /> Reject
                  </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorApplications;



