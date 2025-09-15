import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../../services/auth-api-client";

const CategoryForm = ({ category, onCancel, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
//   const [errMsg, setErrMsg] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() =>{
    if (category) reset(category);
  },[category, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try{
      if(category){
        await authApiClient.put(`/categories/${category.id}/`, data)
        setSuccessMsg("Category updated successfully!")
      }else{
        await authApiClient.post("/categories/", data)
        setSuccessMsg("Category created successfully!")
      }
      if (onSuccess) {setTimeout(() =>onSuccess(),3000)}
    }catch(err){console.log(err)
    }finally{setLoading(false)}
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl rounded-xl p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          {category ? "Edit Category" : "Create Category"}
        </h2>

        {successMsg && <div className="alert alert-success alert-soft mb-2">{successMsg}</div>}
        {/* {errMsg && <div className="alert alert-error alert-soft mb-2">{errMsg}</div>} */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Category Name</span></label>
              <input type="text" placeholder="Enter category name" {...register("name", { required: "Name is required" })}
                className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`} />
              {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Description</span></label>
              <textarea placeholder="Enter description (optional)" {...register("description")}
                className="input input-bordered w-full"/>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-4 w-full" disabled={loading}>
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                Processing...
                <span className="loading loading-dots loading-xs"></span>
              </span>
            ) : category ? "Update Category" : "Create Category"}
          </button>

          {onCancel && (
            <button type="button"
              className="btn btn-outline w-full mt-2"
              onClick={onCancel}>Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;