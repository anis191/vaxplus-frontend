import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import apiClient from "../../services/api-client";

const VaccineDetailsModal = ({vaccine_id}) => {
    const[vaccine, setVaccine] = useState({})

    useEffect(()=>{
        const fetchVaccineDetail = async()=>{
            try{
                const response = await apiClient.get(`/vaccines/${vaccine_id}/`)
                setVaccine(response.data)
            }catch(err){console.log(err)}
        }
        fetchVaccineDetail()
    },[vaccine_id])

  const openModal = () =>
    document.getElementById(`vaccine_modal_${vaccine.id}`).showModal();

  return (
    <>
    <div onClick={openModal} className="mt-4 flex justify-end">
        <button className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none">
        <FiEye className="text-base" /> View Details
        </button>
    </div>
    {vaccine.id && (
      <dialog id={`vaccine_modal_${vaccine.id}`}
        className="modal modal-middle sm:modal-middle">
        <div className="modal-box p-6 sm:p-8 max-w-md w-full rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
            {vaccine.name}
          </h2>

          {vaccine.description ? (<p className="text-gray-700 mb-4">{vaccine.description}</p>) : (<p className="text-gray-400 italic mb-4">No description provided.</p>)}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Total Doses:</span>
              <span>{vaccine.total_doses}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Dose Gap:</span>
              <span>{vaccine.dose_gap} days</span>
            </div>
            {vaccine.is_booster && (
              <div className="flex justify-between text-yellow-600">
                <span className="font-medium">Booster Gap:</span>
                <span>{vaccine.booster_gap} days</span>
              </div>)}
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Age Range:</span>
              <span>{vaccine.min_age}-{vaccine.max_age} yrs</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Manufacturer:</span>
              <span>{vaccine.manufacturer}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Approved Date:</span>
              <span>{vaccine.approved_date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Status:</span>
              <span
                className={`font-semibold ${vaccine.is_active ? "text-green-600" : "text-red-600"}`}>
                {vaccine.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <form method="dialog" className="mt-6 text-right">
            <button className="btn btn-sm btn-outline btn-gray hover:bg-gray-100">
              Close
            </button>
          </form>
        </div>
      </dialog>)}
    </>
  );
};

export default VaccineDetailsModal;
