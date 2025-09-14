import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import authApiClient from "../../services/auth-api-client";

const ApplicationForm = () => {
  const [qualifications, setQualifications] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileChange = (e) => {
    setCertificate(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!qualifications || !licenseNumber || !certificate) {
      console.log("All fields are required for application!");
      return;
    }

    const formData = new FormData();
    formData.append("qualifications", qualifications);
    formData.append("license_number", licenseNumber);
    formData.append("certificate", certificate);

    try{
      setLoading(true);
      const response = await authApiClient.post("/doctors_apply/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(response.status == 201){
        setSuccessMsg(
          <p className="font-bold">
             Doctor application successful. Status is Pending{" "}
             <span className="status status-info animate-bounce ml-2"></span>
           </p>
        );
      }

      setQualifications("");
      setLicenseNumber("");
      setCertificate(null);
    }catch(err){console.log(err)} 
    finally{setLoading(false);}
  };

  return (
    <div className="w-[80%] md:w-auto p-6 bg-white mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Doctor Application</h2>

        {successMsg && (
          <div className="alert alert-success alert-soft mb-2">
            <span>{successMsg}</span>
          </div>
        )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Qualifications</label>
          <input type="text" value={qualifications} onChange={(e) => setQualifications(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" placeholder="MBBS, MD e.g." required/>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">License Number</label>
          <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" placeholder="License Number" required />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Certificate</label>
          <label className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 cursor-pointer hover:bg-gray-50">
            <FiUpload className="h-5 w-5 text-blue-500" />
            {certificate ? certificate.name : "Upload certificate"}
            <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" required />
          </label>
        </div>
        </div>

        <button type="submit" disabled={loading}
          className="btn btn-primary px-5 py-4 w-1/2">
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
