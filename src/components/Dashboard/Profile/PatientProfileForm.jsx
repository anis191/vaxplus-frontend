import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../../../services/auth-api-client";

const PatientProfileForm = ({ patient, setPatient }) =>{
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { register, handleSubmit, reset, formState: {errors} } = useForm();

  useEffect(() => {
    if (patient) {
      reset({
        date_of_birth: patient.date_of_birth || "",
        blood_group: patient.blood_group || "",
      })
    }
  },[patient, reset])

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    setErrMsg("");

    try{
      const res = await authApiClient.put(`/patients/${patient.id}/`,data)
      setSuccessMsg("Profile updated successfully!")
      setPatient(res.data)
    }catch(err){console.log(err)
      setErrMsg("Failed to update profile!");
    }finally{setLoading(false)}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Patient Profile</h2>

        {patient && (
          <div className="mb-4 p-3 border rounded bg-gray-50">
            <p><strong>Name:</strong> {patient.user.first_name} {patient.user.last_name}</p>
            <p><strong>Email:</strong> {patient.user.email}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Address:</strong> {patient.user.address}</p>
            <p><strong>Phone:</strong> {patient.user.phone_number}</p>
          </div>
        )}

        {successMsg && <div className="alert alert-success mb-2">{successMsg}</div>}
        {errMsg && <div className="alert alert-error mb-2">{errMsg}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input type="date"{...register("date_of_birth",{ required: "Date of birth is required" })}
              className={`input input-bordered w-full ${errors.date_of_birth ? "input-error" : ""}`}/>
            {errors.date_of_birth && <p className="text-error text-sm mt-1">{errors.date_of_birth.message}</p>}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <input type="text" {...register("blood_group", { required: "Blood group is required" })}
              className={`input input-bordered w-full ${errors.blood_group ? "input-error" : ""}`}/>
            {errors.blood_group && <p className="text-error text-sm mt-1">{errors.blood_group.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Processing..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientProfileForm;
