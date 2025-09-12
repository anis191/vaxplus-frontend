import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import TableSkeleton from "../Skeletons/TableSkeleton";
import doctorAvatar from "../../assets/images/doctorAvatar.jpg";

const DoctorsInfo = ({ campaign }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try{
        const response = await apiClient.get(`/campaigns/${campaign.id}/doctors/`);
        setDoctors(response.data);
      }catch (err){console.log(err);
      }finally{setLoading(false);}
    };
    fetchDoctors();
  }, [campaign.id]);

  return (
    <div className="mx-auto max-w-screen-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Doctors List</h2>
          <span className="text-sm text-gray-500">
            View details of registered doctors
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <TableSkeleton />
        ) : (
          <table className="table w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-blue-600 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-1 sm:px-2 py-1 sm:py-2">Doctor Name</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2">Specialization</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="border-b border-gray-200 bg-white px-1 sm:px-2 py-1 sm:py-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                        <img className="h-full w-full rounded-full" src={doctor.image || doctorAvatar} alt={doctor.name}/>
                      </div>
                      <div className="ml-1 sm:ml-2">
                        <p className="whitespace-nowrap">{doctor.name}</p>
                      </div>
                    </div>
                  </td>

                  <td className="border-b border-gray-200 bg-white px-1 sm:px-2 py-1 sm:py-2 text-xs sm:text-sm">
                    {doctor.specialization}
                  </td>

                  <td className="border-b border-gray-200 bg-white px-1 sm:px-2 py-1 sm:py-2 text-center">
                    <button className="rounded-md bg-blue-600 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white transition duration-150 hover:bg-blue-700 focus:outline-none">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorsInfo;
