import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const[loading, setLoading] = useState(false)
  const { loginUser, errorMsg } = useAuthContext();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await loginUser(data);
      if (response.success){
          navigate("/dashboard")
      }
    } catch (error){console.log(error)}
    finally{setLoading(false)}
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-base-100 shadow-xl rounded-lg sm:rounded-xl p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Login</h2>

        {errorMsg && (
           <div className="alert alert-error alert-soft mb-2">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email */}
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

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className={`input input-bordered w-full input-sm sm:input-md ${errors.password ? "input-error" : ""}`}/>
              {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
                        
              {/* Forgot Password */}
              <label className="label">
                <a href="/forgot-password" className="label-text-alt link link-primary text-sm sm:text-base">
                  Forgot Password?
                </a>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4 w-full btn-sm sm:btn-md" disabled={loading}>
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  Logging In
                  <span className="loading loading-dots loading-xs"></span>
                </span>
                ) : (
                  "Login"
                )}
            </button>

          <div className="text-center mt-3 sm:mt-4 text-sm sm:text-base">
            Don’t have an account?{" "}
            <a href="/register" className="link link-primary">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
