import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("");
  const { registerUser, errorMsg } = useAuthContext();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    delete data.confirm_password;

    setLoading(true)
    try{
      const response = await registerUser(data);
      if (response.success){
        setSuccessMsg(
          <p className="font-bold">
             Registration successful. Please check your email{" "}
             <span className="status status-info animate-bounce ml-2"></span>
           </p>
        );
      }
    }catch (error){
      console.log(error);
    }finally{setLoading(false)}
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-md sm:max-w-3xl bg-base-100 shadow-xl rounded-lg sm:rounded-xl p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          Sign Up
        </h2>

        {successMsg && (
          <div className="alert alert-success alert-soft mb-2">
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="alert alert-error alert-soft mb-2">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Left */}
            <div className="space-y-3 sm:space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("first_name", { required: "First Name is required" })}
                  className={`input input-bordered w-full input-sm sm:input-md ${errors.first_name ? "input-error" : ""}`}/>
                {errors.first_name && <p className="text-error text-sm mt-1">{errors.first_name.message}</p>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("last_name", { required: "Last Name is required" })}
                  className={`input input-bordered w-full input-sm sm:input-md ${errors.last_name ? "input-error" : ""}`}/>
                {errors.last_name && <p className="text-error text-sm mt-1">{errors.last_name.message}</p>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
                  })}
                  className={`input input-bordered w-full input-sm sm:input-md ${errors.email ? "input-error" : ""}`}/>
                {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
              </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm sm:text-base">National ID (NID)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="NID"
                    {...register("nid", { 
                      required: "NID is required",
                      pattern: { value: /^[0-9]+$/, message: "NID must be numeric" },
                      validate: (value) =>
                        [10, 13, 17].includes(value.length) || "NID must be 10, 13, or 17 digits"
                    })}
                    className={`input input-bordered w-full input-sm sm:input-md ${errors.nid ? "input-error" : ""}`}/>
                  {errors.nid && <p className="text-error text-sm mt-1">{errors.nid.message}</p>}
                </div>
            </div>

            {/* Right */}
            <div className="space-y-3 sm:space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Phone Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone_number", { required: "Phone Number is required" })}
                  className={`input input-bordered w-full input-sm sm:input-md ${errors.phone_number ? "input-error" : ""}`}/>
                {errors.phone_number && <p className="text-error text-sm mt-1">{errors.phone_number.message}</p>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address")}
                  className="input input-bordered w-full input-sm sm:input-md"/>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                  className={`input input-bordered w-full input-sm sm:input-md ${errors.password ? "input-error" : ""}`}/>
                {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirm_password", {
                    required: "Please confirm your password",
                    validate: (value) => value === watch("password") || "Passwords do not match",
                  })}
                  className={`input input-bordered w-full input-sm sm:input-md ${errors.confirm_password ? "input-error" : ""}`}/>
                {errors.confirm_password && <p className="text-error text-sm mt-1">{errors.confirm_password.message}</p>}
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4 sm:mt-6 w-full btn-sm sm:btn-md" disabled={loading}>
            {loading ? (
                <span className="flex justify-center items-center gap-2">
                  Processing
                  <span className="loading loading-dots loading-xs"></span>
                </span>
                ) : (
                  "Register"
              )}
          </button>

          <div className="text-center mt-3 sm:mt-4 text-sm sm:text-base">
            Already have an account?{" "} 
            <a href="/login" className="link link-primary">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
