import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiCalendar, FiPhone, FiMapPin, FiDroplet, FiEdit2 } from "react-icons/fi";
import authApiClient from "../../../services/auth-api-client";

const PatientProfileForm = ({ patient, setPatient }) => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (patient) {
      reset({
        date_of_birth: patient.date_of_birth || "",
        blood_group: patient.blood_group || "",
      });
    }
  }, [patient, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    setErrMsg("");

    try {
      const res = await authApiClient.put(`/patients/${patient.id}/`, data);
      setSuccessMsg("Profile updated successfully!");
      setPatient(res.data);
    } catch (err) {
      console.log(err);
      setErrMsg("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex justify-center items-start pt-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Left Panel - Profile Info */}
        {patient && (
          <div className="col-span-1 bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 md:mb-4 border-4 border-indigo-300 shadow-md">
              <img
                src={patient.user.avatar || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-1 text-center">
              {patient.user.first_name} {patient.user.last_name}
            </h2>
            <p className="text-gray-500 mb-3 md:mb-4 text-sm md:text-base text-center">{patient.user.email}</p>
            <div className="w-full space-y-2 md:space-y-3 text-sm md:text-base">
              <p className="flex items-center gap-2 text-gray-700 font-medium">
                <FiCalendar className="text-indigo-500" /> Age: {patient.age}
              </p>
              <p className="flex items-center gap-2 text-gray-700 font-medium">
                <FiMapPin className="text-indigo-500" /> {patient.user.address}
              </p>
              <p className="flex items-center gap-2 text-gray-700 font-medium">
                <FiPhone className="text-indigo-500" /> {patient.user.phone_number}
              </p>
            </div>
          </div>
        )}

        {/* Right Panel - Editable Form */}
        <div className="col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">Edit Profile</h3>
            <FiEdit2 className="text-indigo-500 text-lg md:text-xl" />
          </div>

          {successMsg && <div className="alert alert-success mb-4 shadow-md">{successMsg}</div>}
          {errMsg && <div className="alert alert-error mb-4 shadow-md">{errMsg}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            {/* Date of Birth */}
            <div className="relative">
              <label className="label font-medium text-gray-700 text-sm md:text-base">Date of Birth</label>
              <div className="relative">
                <FiCalendar className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 text-base md:text-lg pointer-events-none" />
                <input
                  type="date"
                  {...register("date_of_birth", { required: "Date of birth is required" })}
                  className={`input input-bordered w-full pl-8 md:pl-10 rounded-xl focus:ring-2 focus:ring-indigo-400 transition-all ${
                    errors.date_of_birth ? "input-error" : ""
                  } text-sm md:text-base`}
                />
              </div>
              {errors.date_of_birth && <p className="text-error text-xs md:text-sm mt-1">{errors.date_of_birth.message}</p>}
            </div>

            {/* Blood Group */}
            <div className="relative">
              <label className="label font-medium text-gray-700 text-sm md:text-base">Blood Group</label>
              <div className="relative">
                <FiDroplet className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-red-400 text-base md:text-lg pointer-events-none" />
                <input
                  type="text"
                  {...register("blood_group", { required: "Blood group is required" })}
                  className={`input input-bordered w-full pl-8 md:pl-10 rounded-xl focus:ring-2 focus:ring-indigo-400 transition-all ${
                    errors.blood_group ? "input-error" : ""
                  } text-sm md:text-base`}
                />
              </div>
              {errors.blood_group && <p className="text-error text-xs md:text-sm mt-1">{errors.blood_group.message}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex justify-center items-center gap-2 text-sm md:text-base"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileForm;
