import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { FiMail, FiPhone, FiArrowLeft, FiMapPin, FiClock, FiUser } from "react-icons/fi";
import apiClient from "../services/api-client";
import CampaignSkeleton from "../components/Skeletons/CampaignSkeleton";
import useAuthContext from "../hooks/useAuthContext";
import UpdateDoctorProfile from "../pages/UpdateDoctorProfile"

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const {user} = useAuthContext()
  const [isEdit, setIsEdit] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await apiClient.get(`/doctors/${doctorId}/`)
        if(user && response.data.bio.id === user.id){setIsEdit(true)}
        setDoctor(response.data);
      } catch (error) {
        console.error("Failed to fetch doctor:", error)
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor()
  }, [doctorId])

  if(loading){
    return (
      <div className="w-full flex justify-center my-5">
        <CampaignSkeleton />
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="text-center text-red-600 font-semibold py-10">
        Doctor not found.
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Link to="/doctors" className="btn btn-link mb-6 flex items-center gap-2">
        <FiArrowLeft /> Back to Doctors
      </Link>

        {isUpdate ? (<UpdateDoctorProfile doctor={doctor} setIsUpdate={setIsUpdate}/>) : (
      <div className="bg-white shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/3">
          <img
            src={doctor.profile_picture}
            alt={`${doctor.bio.first_name} ${doctor.bio.last_name}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
            <h2 className="text-3xl font-bold mb-2">
              {doctor.bio.first_name} {doctor.bio.last_name}
            </h2>
            {isEdit && (
            <button onClick={()=>setIsUpdate(true)} className="btn btn-primary px-4 py-2">Edit Profile</button>)}
            </div>
            <p className="text-xl text-blue-600 font-semibold mb-4">
              {doctor.specialization}
            </p>

            <div className="space-y-2 text-gray-700 text-lg">
              <p className="flex items-center gap-2">
                <FiMail /> {doctor.contact}
              </p>
              <p className="flex items-center gap-2">
                <FiPhone /> {doctor.bio.phone_number}
              </p>
              {doctor.bio.address && (
                <p className="flex items-center gap-2">
                  <FiMapPin /> {doctor.bio.address}
                </p>
              )}
            </div>

            <div className="mt-6 space-y-3 text-gray-700">
              <p className="flex items-center gap-2">
                <FiUser /> Experience: <span className="font-medium">10+ years</span>
              </p>
              <p className="flex items-center gap-2">
                <FiClock /> Availability: <span className="font-medium">Mon - Fri (9 AM - 6 PM)</span>
              </p>
              <p>
                <strong>Dr. {doctor.bio.last_name}</strong> is a highly dedicated specialist known for 
                patient care and excellence in treatment. They focus on providing 
                personalized healthcare and building trust with patients.
              </p>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default DoctorDetail;
