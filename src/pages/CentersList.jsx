import { useState } from "react";
import useFetchCenters from "../hooks/useFetchCenters";
import TableSkeleton from "../components/Skeletons/TableSkeleton";
import authApiClient from "../services/auth-api-client";
import CenterForm from "../components/Dashboard/CenterForm";

const CenterTable = () => {
  const { centers, fetchCenters } = useFetchCenters()
  const [editingCenter, setEditingCenter] = useState(null)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const tableHeaders = ["Serial", "Name", "Address", "City", "Postcode", "Action"]

  if (!centers || centers.length === 0) return <TableSkeleton />

  const handleDelete = async(center_id) =>{
    try{
      setLoadingDelete(true);
      await authApiClient.delete(`/centers/${center_id}/`)
    }catch(err){console.log(err)
    }finally{
      fetchCenters()
      setLoadingDelete(false)
    }
  }

  return (
    <div className="overflow-x-auto">
      {editingCenter ? (
        <CenterForm center={editingCenter} onCancel={()=>setEditingCenter(null)}
          onSuccess={()=>{
            fetchCenters();
            setEditingCenter(null);
          }}/>
      ) : (
        <>
          {loadingDelete && (
            <div className="flex justify-center items-center mt-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
            <thead className="bg-gray-100">
              <tr>
                {tableHeaders.map((header,idx)=>(
                  <th
                    key={idx}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {centers.map((center) => (
                <tr key={center.id}
                  className="border-b even:bg-gray-50 hover:bg-gray-100 transition">
                  <td className="px-4 py-2 text-sm text-gray-700">{center.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium truncate">{center.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 truncate">{center.address}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{center.city}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{center.postcode}</td>
                  <td className="px-4 py-2 text-sm flex gap-2">
                    <button className="btn btn-sm btn-outline btn-primary"
                      onClick={() => setEditingCenter(center)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-red"
                      onClick={() => handleDelete(center.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CenterTable;
