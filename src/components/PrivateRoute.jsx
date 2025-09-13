import { Navigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import CampaignSkeleton from "./Skeletons/CampaignSkeleton";

const PrivateRoute = ({ children }) => {
  const { user, dashLoading } = useAuthContext();

  if (dashLoading){
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="text-gray-700 font-medium">Loading dashboard...</span>
        </div>
        <CampaignSkeleton />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
