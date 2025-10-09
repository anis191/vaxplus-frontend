import { useEffect, useState } from "react";
// import useAuthContext from "../hooks/useAuthContext";
import authApiClient from "../services/auth-api-client";
import PatientProfileForm from "../components/Dashboard/Profile/PatientProfileForm";
import { FiLoader } from "react-icons/fi";

const PatientProfilePage = () => {
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const fetchPatientProfile = async() => {
        setLoading(true)
        try{
            const res = await authApiClient.get("/patients/")
            // setPatient(res.data)
            setPatient(res.data[0] || null);
            console.log(res)
        }catch(err){console.log(err)}
        finally{setLoading(false)}
    }
    fetchPatientProfile()
  },[])

  if (loading) return(
    <div className="flex flex-col items-center justify-center h-64">
      <FiLoader className="animate-spin h-8 w-8 text-primary" />
      <p className="mt-2 text-gray-500">Loading your patient info...</p>
    </div>
  )
  if (!patient) return <p className="text-center mt-10">No patient profile found.</p>;

  // return <PatientProfileForm patient={patient} setPatient={setPatient} />
  return(
    <>
    <div className="p-5">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        Patient Profile
      </h2>
      <p className="text-sm text-gray-500">
        Manage your Date of Birth and Blood Group.
      </p>
    </div>
    <PatientProfileForm patient={patient} setPatient={setPatient} />
  </>
  )
};

export default PatientProfilePage;
