import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import apiClient from "../../services/api-client";

const ResetPasswordConfirm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {uid, token} = useParams()
    const navigate = useNavigate();
    const {handleAPIerrors, errorMsg} = useAuthContext()
    const[successMsg, setSuccessMsg] = useState("")
    const[showPassword, setShowPassword] = useState(false)
    const[loading, setLoading] = useState(false)

    const onSubmit = async (data) =>{
        const resetPasswordPayload = {
            uid: uid,
            token: token,
            new_password: data.password
        }
        setLoading(true)
        try{
            await apiClient.post("/auth/users/reset_password_confirm/", resetPasswordPayload)
            setSuccessMsg("Your password has been reset! Redirecting to login...")
            setTimeout(() => navigate("/login"), 3000);
        }catch(error){handleAPIerrors(error)}
        finally{setLoading(false)}
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
          <div className="card w-full max-w-md bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold">Reset Password</h2>

                {errorMsg && <span className="text-error font-bold mx-auto">{errorMsg}</span>}
                {successMsg && (
                    <div role="alert" className="alert alert-success alert-soft">
                      <span>{successMsg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div className="form-control">
                        <label className="label" htmlFor="password">
                          <span className="label-text">Password</span>
                        </label>
                        <input
                          id="password"
                          type={showPassword ? "string" : "password"}
                          {...register("password", { required: true, minLength:{
                            value: 8,
                            message: "Password must be at least 8 characters!",
                          } })}
                          className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                        />
                        {errors.password && (<p className="text-error">{errors.password.message}</p>)}
                    </div>
                    <div className="form-control">
                        <label className="label" htmlFor="confirm_password">
                          <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                          id="confirm_password"
                          type={showPassword ? "string" : "password"}
                          {...register("confirm_password", { required: true, validate: (value) => value === watch("password") || "Password is not match" })}
                          className={`input input-bordered w-full ${errors.confirm_password ? "input-error" : ""}`}
                        />
                        {errors.confirm_password && (<p className="text-error">{errors.confirm_password.message}</p>)}
                    </div>
                    <div className="form-control py-2">
                        <label htmlFor="showPass" className="label cursor-pointer">
                            <span className="label-text">Show Password</span>
                            <input type="checkbox" className="toggle showPass" checked={showPassword} onChange={()=>setShowPassword(!showPassword)}/>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                      <span className="flex justify-center items-center gap-2">{loading ? "Submiting..." : "Submit"}</span>
                    </button>
                </form>
              </div>
            </div>
        </div>
    );
};

export default ResetPasswordConfirm;