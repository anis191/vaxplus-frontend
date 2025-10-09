import { useState } from "react";
import useFetchVaccines from "../../hooks/useFetchVaccines";
import TableSkeleton from "../Skeletons/TableSkeleton";
import VaccineForm from "./VaccineForm";
import authApiClient from "../../services/auth-api-client";
import { FiActivity } from "react-icons/fi";

const VaccineTable = () => {
  const { vaccines, fetchVaccines } = useFetchVaccines();
  const [editingVaccine, setEditingVaccine] = useState(null);
  const[dtl, setDtl] = useState(false)
  
  const tableHeaders = [
    "Serial",
    "Name",
    "Total Doses",
    "Dose Gap (days)",
    "Booster Gap",
    "Age Range",
    "Manufacturer",
    "Status",
    "Action"
  ];

  if (!vaccines || vaccines.length === 0) return <TableSkeleton />;

  const handleDelete = async(vax_id) =>{
    try{
        setDtl(true)
        await authApiClient.delete(`/vaccines/${vax_id}/`)
    }catch(err){console.log(err)}
    finally{
        fetchVaccines()
        setDtl(false)
    }
  }

  return (
    <div className="overflow-x-auto">
        {editingVaccine ? (
            <VaccineForm vaccine = {editingVaccine} onCancel={()=>setEditingVaccine(null)} onSuccess={() => {fetchVaccines(); setEditingVaccine(null)}}/>
        ) : (
        <>
        {/* Header with icon */}
        <div className="flex items-center justify-center my-4">
          <FiActivity className="text-red-500 h-6 w-6 mr-2" />
          <h2 className="text-lg md:text-xl font-semibold text-gray-600">
            All Vaccines
          </h2>
        </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
        {dtl && (
          <div className="flex justify-center items-center mt-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <thead className="bg-gray-100">
          <tr>
            {tableHeaders.map((header, idx) => (
              <th key={idx} className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vaccines.map((vaccine, index) => (
            <tr key={vaccine.id} className="border-b even:bg-gray-50 hover:bg-gray-100 transition">
              <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
              <td className="px-4 py-2 text-sm text-gray-900 font-medium truncate">{vaccine.name}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{vaccine.total_doses}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{vaccine.dose_gap}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{vaccine.is_booster ? vaccine.booster_gap : "-"}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{vaccine.min_age} - {vaccine.max_age} yrs</td>
              <td className="px-4 py-2 text-sm text-gray-700 truncate">{vaccine.manufacturer}</td>
              <td className={`px-4 py-2 text-sm font-semibold ${vaccine.is_active ? "text-green-600" : "text-red-600"}`}>
                {vaccine.is_active ? "Active" : "Inactive"}
              </td>
              <td className="px-4 py-2 text-sm flex gap-2">
                <button className="btn btn-sm btn-outline btn-primary" onClick={()=>setEditingVaccine(vaccine)}>
                  Edit
                </button>
                <button onClick={()=>handleDelete(vaccine.id)} className="btn btn-sm btn-outline btn-red">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></>
    )}
    </div>
  );
};

export default VaccineTable;
