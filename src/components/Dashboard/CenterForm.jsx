import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../../services/auth-api-client";

const CenterForm = ({ center, onCancel, onSuccess }) =>{
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (center) reset(center)
  },[center, reset])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      if(center){
        await authApiClient.put(`/centers/${center.id}/`,data)
        setSuccessMsg("Center updated successfully!")
      }else{
        await authApiClient.post("/centers/",data)
        setSuccessMsg("Center created successfully!")
      }
      if(onSuccess){setTimeout(() => onSuccess(), 3000)}
    }catch(err){
        console.log(err)
    }finally{setLoading(false)}
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-3xl bg-base-100 shadow-xl rounded-xl p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          {center ? "Edit Center" : "Create Center"}
        </h2>

        {successMsg && <div className="alert alert-success alert-soft mb-2">{successMsg}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Name</span></label>
            <input
              type="text"
              placeholder="Enter center name"
              {...register("name", { required: "Name is required" })}
              className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
            />
            {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Address</span></label>
            <input
              type="text"
              placeholder="Enter address"
              {...register("address", { required: "Address is required" })}
              className={`input input-bordered w-full ${errors.address ? "input-error" : ""}`}
            />
            {errors.address && <p className="text-error text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">City</span></label>
            <input
              type="text"
              placeholder="Enter city"
              {...register("city", { required: "City is required" })}
              className={`input input-bordered w-full ${errors.city ? "input-error" : ""}`}
            />
            {errors.city && <p className="text-error text-sm mt-1">{errors.city.message}</p>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Postcode</span></label>
            <input
              type="text"
              placeholder="Enter postcode"
              {...register("postcode", { required: "Postcode is required" })}
              className={`input input-bordered w-full ${errors.postcode ? "input-error" : ""}`}
            />
            {errors.postcode && <p className="text-error text-sm mt-1">{errors.postcode.message}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-4 w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                Processing...
                <span className="loading loading-dots loading-xs"></span>
              </span>
            ) : center ? "Update Center" : "Create Center"}
          </button>

          {onCancel && (
            <button
              type="button"
              className="btn btn-outline w-full mt-2"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CenterForm;