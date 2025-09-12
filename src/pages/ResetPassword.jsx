// import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

const ResetPassword = () => {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const {resetPassword, errorMsg} = useAuthContext()
    const[successMsg, setSuccessMsg] = useState("")
    const[loading, setLoading] = useState(false)

    const onSubmit = async (data)=>{
      setLoading(true)
        try{
            const response = await resetPassword(data)
            if(response.success){
                setSuccessMsg(
                    <p className="font-bold"> Please check your email <span className="status status-info animate-bounce ml-2"></span>
                    </p>
                )
            }
        }catch(error){console.log(error)}
        finally{setLoading(false)}
    }

    return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title text-2xl font-bold">Enter Your Email</h2>

            {errorMsg && <span className="text-error font-bold mx-auto">{errorMsg}</span>}
            {successMsg && (
                <div role="alert" className="alert alert-success alert-soft">
                <span>{successMsg}</span>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                    {...register("email", {required:true})}
                  />
                  {errors.email?.type === 'required' && <p role="alert" className="label-text-alt text-error">Email is required</p>}
                </div>
                <button type="submit" className="btn btn-primary mt-2 sm:mt-4 w-full btn-sm sm:btn-md" disabled={loading}>
                  {loading ? (
                      <span className="flex justify-center items-center gap-2">
                           Sending reset link
                        <span className="loading loading-dots loading-xs"></span>
                      </span>
                      ) : (
                        "Submit"
                    )}
                </button>
            </form>
                <p className="text-sm text-gray-500 mt-2">
                  Can’t get email?{" "}
                    Try again
                </p>
          </div>
        </div>
    </div>
    );
};
// Sending reset link...
export default ResetPassword;