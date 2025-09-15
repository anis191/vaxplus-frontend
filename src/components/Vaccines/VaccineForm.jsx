import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import authApiClient from "../../services/auth-api-client";

const VaccineForm = ({vaccine, onCancel, onSuccess}) => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit, watch, reset,control, formState: { errors } } = useForm();

  const isBooster = watch("is_booster");

  useEffect(() => {
    if(vaccine){reset(vaccine);}
  },[vaccine, reset])

  const onSubmit = async (data) =>{
    console.log("Data: ", data)
    setLoading(true);
    try {
        if(vaccine){
            await authApiClient.put(`/vaccines/${vaccine.id}/`,{...data,is_active: true})
            setSuccessMsg("Vaccine update successfully!")
        }else{
            const res = await authApiClient.post("/vaccines/", {...data,is_active: true})
            setSuccessMsg("Vaccine created successfully!");
            console.log("Response: ",res)}
        
        if(onSuccess){
            setTimeout(() => {
            onSuccess();
            }, 5000);
        }

        }catch(err){
             if (err.response && err.response.data && err.response.data.booster_gap){
                setErrMsg(err.response.data.booster_gap[0])
             }
        }finally {setLoading(false)}
    }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-3xl bg-base-100 shadow-xl rounded-xl p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          Create New Vaccine
        </h2>

        {successMsg && (
          <div className="alert alert-success alert-soft mb-2">
            <span>{successMsg}</span>
          </div>
        )}

        {errMsg && (
          <div className="alert alert-error alert-soft mb-2">
            <span>{errMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Vaccine Name</span>
                </label>
                <input type="text" placeholder="Enter vaccine name" {...register("name", { required: "Name is required" })} className={`input input-bordered w-full input-sm sm:input-md ${errors.name ? "input-error" : ""}`}/>
                {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Description</span>
                </label>
                <textarea placeholder="Enter description (optional)" {...register("description")}
                  className="input input-bordered w-full input-sm sm:input-md"/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Total Doses</span>
                </label>
                <input type="number" placeholder="Enter total doses" min={1} max={2} {...register("total_doses", { required: true, min: 1 })} className={`input input-bordered w-full input-sm sm:input-md ${errors.total_doses ? "input-error" : ""}`}/>
                {errors.total_doses && <p className="text-error text-sm mt-1">{errors.total_doses.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Dose Gap (days)</span>
                </label>
                <input type="number" placeholder="Enter gap between doses" {...register("dose_gap", { required: true, min: 0 })} className={`input input-bordered w-full input-sm sm:input-md ${errors.dose_gap ? "input-error" : ""}`}/>
                {errors.dose_gap && <p className="text-error text-sm mt-1">{errors.dose_gap.message}</p>}
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="form-control flex items-center space-x-2 mt-2">
                <input type="checkbox" {...register("is_booster")} id="is_booster" className="checkbox checkbox-sm sm:checkbox-md"/>
                <label htmlFor="is_booster" className="text-sm sm:text-base font-medium">Is Booster?</label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Booster Gap (days)</span>
                </label>
                <Controller control={control} name="booster_gap" render={({ field }) => (
                    <input type="number" {...field} disabled={!isBooster} placeholder="Enter booster gap"className="input input-bordered w-full input-sm sm:input-md bg-white disabled:bg-gray-100"/>)}/>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Min Age</span>
                </label>
                <input type="number" placeholder="Enter minimum age" min={0} max={150} {...register("min_age", { required: true, min: 0 })}
                  className={`input input-bordered w-full input-sm sm:input-md ${errors.min_age ? "input-error" : ""}`}/>
                {errors.min_age && <p className="text-error text-sm mt-1">{errors.min_age.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Max Age</span>
                </label>
                <input type="number" placeholder="Enter maximum age" min={0} max={150} {...register("max_age", { required: true, min: 1 })}
                  className={`input input-bordered w-full input-sm sm:input-md ${errors.max_age ? "input-error" : ""}`} />
                {errors.max_age && <p className="text-error text-sm mt-1">{errors.max_age.message}</p>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base">Manufacturer</span>
              </label>
              <input type="text" placeholder="Enter manufacturer name"
                {...register("manufacturer", { required: "Manufacturer is required" })}
                className={`input input-bordered w-full input-sm sm:input-md ${errors.manufacturer ? "input-error" : ""}`} />
              {errors.manufacturer && <p className="text-error text-sm mt-1">{errors.manufacturer.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base">Approved Date</span>
              </label>
              <input type="date" placeholder="Select approved date"
                {...register("approved_date", { required: "Approved date is required" })}
                className={`input input-bordered w-full input-sm sm:input-md ${errors.approved_date ? "input-error" : ""}`} />
              {errors.approved_date && <p className="text-error text-sm mt-1">{errors.approved_date.message}</p>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4 sm:mt-6 w-full btn-sm sm:btn-md" disabled={loading}>
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                Processing...
                <span className="loading loading-dots loading-xs"></span>
              </span>
            ) : (
              "Create Vaccine"
            )}
          </button>
          {onCancel && (
              <button type="button" className="btn btn-outline w-full btn-sm sm:btn-md"
                onClick={onCancel}>
                Cancel
              </button>
            )}
        </form>
      </div>
    </div>
  );
};

export default VaccineForm;
