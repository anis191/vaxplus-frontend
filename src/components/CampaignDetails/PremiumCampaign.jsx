import { useState } from "react";
import { Link } from "react-router";
import authApiClient from "../../services/auth-api-client";

const PremiumCampaign = ({ user, campaign_id, fee }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const paymentDataPayLoad = {
        campaign: campaign_id,
        amount: fee,
      };
      const response = await authApiClient.post("/payment/initiate/", paymentDataPayLoad);
      console.log(response);

      if (response.data.payment_url) {
        setLoading(false);
        window.location.href = response.data.payment_url;
      } else {
        alert("Payment Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-0 p-6 sm:p-8 bg-yellow-50 border-l-4 border-yellow-400 rounded-md shadow-md">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">
        Premium Campaign
      </h2>
      <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 text-center sm:text-left">
        This is a premium campaign. You need to register first before booking your vaccine dose.
      </p>
      <div className="flex flex-col sm:flex-row sm:justify-start gap-3">
        {user ? (
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full sm:w-auto btn bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition-all duration-200"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        ) : (
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn bg-blue-600 text-white hover:bg-blue-700 px-4 py-6 md:py-2 rounded-md transition-all duration-200">
              SignUp / LogIn For Payment
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PremiumCampaign;
