import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import { FiActivity, FiLoader } from "react-icons/fi";

export default function VaccinationHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await authApiClient.get("/vaccination_records/");
        setRecords(res.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FiLoader className="animate-spin h-8 w-8 text-primary" />
        <p className="mt-2 text-gray-500">Loading your vaccination history...</p>
      </div>
    );
  }

  if (!records.length) {
    return <p className="text-gray-500 text-center mt-6">You have no vaccination records yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      {/* Header */}
      <div className="flex items-center justify-center my-4">
        <FiActivity className="text-red-500 h-6 w-6 mr-2" />
        <h2 className="text-xl font-semibold text-gray-600">
         My Vaccination History
        </h2>
      </div>

      <table className="table w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm font-semibold">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Campaign ID</th>
            <th className="px-4 py-2">Vaccine</th>
            <th className="px-4 py-2">Dose Number</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.map((r, idx) => (
            <tr key={r.id} className="hover:bg-indigo-50 transition-colors duration-200">
              <td className="px-4 py-2 text-gray-700 font-medium">{idx + 1}</td>
              <td className="px-4 py-2 text-gray-600">{r.campaign}</td>
              <td className="px-4 py-2 text-gray-600">{r.vaccine}</td>
              <td className="px-4 py-2 text-gray-600">{r.dose_number}</td>
              <td className="px-4 py-2 text-gray-600">{r.given_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
