import { useState } from "react";
import { FiUpload, FiSave } from "react-icons/fi";
import authApiClient from "../services/auth-api-client";

const DoctorProfileUpdateForm = ({ doctor, setIsUpdate }) => {
  const [specialization, setSpecialization] = useState(doctor.specialization || "")
  const [contact, setContact] = useState(doctor.contact || "")
  const [profilePicture, setProfilePicture] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e)=>{
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const formData = new FormData()
    formData.append("specialization", specialization)
    formData.append("contact", contact)
    if (profilePicture) formData.append("profile_picture", profilePicture)

    try{
      setLoading(true)
      const response = await authApiClient.put(`/doctors/${doctor.id}/`,formData,
        {headers: { "Content-Type": "multipart/form-data" }})
      console.log("Profile updated:", response.data);
      alert("Profile updated successfully!");
    }catch(err){
      console.error("Failed to update profile:", err);
      alert("Failed to update profile. Please try again.");
    }finally{setLoading(false);}
  };

  return (
    <div className="w-full md:w-[50%] mx-auto p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Specialization</label>
          <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" placeholder="e.g. Cardiologist"/>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Contact</label>
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" placeholder="Email or phone"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Profile Picture</label>
          <label className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 cursor-pointer hover:bg-gray-50">
            <FiUpload className="h-5 w-5 text-blue-500" />
            {profilePicture ? profilePicture.name : "Upload profile picture"}
            <input type="file" onChange={handleFileChange} className="hidden"
              accept="image/*"/>
          </label>
        </div>

        <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          <FiSave className="h-4 w-4" />
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
      <button onClick={()=>setIsUpdate(false)} className="text-blue-900 underline mt-2 text-lg text-center cursor-pointer">Cancel</button>
    </div>
  );
};

export default DoctorProfileUpdateForm;
