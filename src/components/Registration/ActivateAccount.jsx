import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import apiClient from "../../services/api-client";
import { FaCheckCircle, FaSpinner, FaTimesCircle } from "react-icons/fa";

const ActivateAccount = () => {
  const {uid,token} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const activateAccount = async() => {
        setLoading(true)
        try{
          await apiClient.post("/auth/users/activation/", {uid,token})
          setMessage("Your account has been successfully activated! Redirecting to login...")
          setTimeout(() => navigate("/login"), 2000)
        }catch(err){setError(`Activation failed. The link may be invalid or expired. ${err}`)}
        finally{setLoading(false)}
    };
    activateAccount()
  },[]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-lg p-6 text-center space-y-4">
        {loading && (
          <div className="flex flex-col items-center gap-3">
            <FaSpinner className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-lg font-semibold text-gray-700">
              Activating your account...
            </p>
          </div>
        )}

        {message && (
          <div className="flex flex-col items-center gap-3 text-green-600">
            <FaCheckCircle className="h-10 w-10" />
            <p className="text-lg font-semibold">{message}</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-3 text-red-600">
            <FaTimesCircle className="h-10 w-10" />
            <p className="text-lg font-semibold">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;
