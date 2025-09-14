// import React from 'react';

import { useState } from "react";
import { Link } from "react-router";
import authApiClient from "../../services/auth-api-client";

const PremiumCampaign = ({user, campaign_id, fee}) => {
  const[loading,setLoading] = useState(false)

  const handlePayment = async() =>{
      setLoading(true)
      try{
        const paymentDataPayLoad = {
          campaign : campaign_id,
          amount  : fee,
        }
        const response = await authApiClient.post("/payment/initiate/", paymentDataPayLoad)
        console.log(response)

        if(response.data.payment_url){
          setLoading(false)
          window.location.href = response.data.payment_url
        }else{
          alert("Payment Failed")
        }
      }catch(error){console.log(error)}
    }
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Campaign</h2>
        <p className="text-gray-700 mb-4">
          This is a premium campaign. You need to register first before booking your vaccine dose.
        </p>
        {user ? (
        <button onClick={handlePayment} disabled={loading} 
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-4 py-2">
          {loading ? "Processing..." : "Pay Now"}
        </button>) : (
          <Link to="/login"><button 
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-4 py-2">
          SignUp / LogIn For Payment</button></Link>
        )}
        </div>
    );
};

export default PremiumCampaign;