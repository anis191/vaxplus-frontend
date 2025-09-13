import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import { FiLoader } from "react-icons/fi";

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
    return <p className="text-gray-500">You have no vaccination records yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Campaign ID</th>
            <th>Vaccine</th>
            <th>Dose Number</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr key={r.id} className="hover">
              <td>{idx + 1}</td>
              <td>{r.campaign}</td>
              <td>{r.vaccine}</td>
              <td>{r.dose_number}</td>
              <td>{r.given_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
