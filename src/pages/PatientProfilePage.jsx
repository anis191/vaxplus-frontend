import { useEffect, useState } from "react";
// import useAuthContext from "../hooks/useAuthContext";
import authApiClient from "../services/auth-api-client";
import PatientProfileForm from "../components/Dashboard/Profile/PatientProfileForm";

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

  if (loading) return <p>Loading...</p>
  if (!patient) return <p className="text-center mt-10">No patient profile found.</p>;

  return <PatientProfileForm patient={patient} setPatient={setPatient} />
};

export default PatientProfilePage;
