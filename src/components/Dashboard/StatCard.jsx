import { useEffect, useState } from "react";
import { FiUsers, FiActivity, FiStar, FiFileText, FiCreditCard } from "react-icons/fi";
import authApiClient from "../../services/auth-api-client";
// import CampaignSkeleton from "../Skeletons/CampaignSkeleton";
import useAuthContext from "../../hooks/useAuthContext";
import DashboardStatusSkeleton from "../Skeletons/DashboardSkeletons";

const StatCard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await authApiClient.get("/data/");
        console.log(res.data)
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center my-3"><DashboardStatusSkeleton /></div>
    );
  }

  if (!stats){
    return <p className="text-red-500">Failed to load dashboard stats.</p>;
  }
  const stateData = [];

  if (user.is_staff){
    stateData.push(
      { icon: FiUsers, label: "Total Users", value: stats.total_users },
      { icon: FiUsers, label: "Doctors", value: stats.total_doctors },
      { icon: FiActivity, label: "Campaigns", value: stats.total_campaigns },
      { icon: FiFileText, label: "Bookings", value: stats.total_booking },
      { icon: FiCreditCard, label: "Payments", value: `$${stats.total_payment}` }
    );
  } else if (user.role == "Doctor") {
    stateData.push(
      { icon: FiActivity, label: "Involved Campaigns", value: stats.involved_campaigns },
      { icon: FiFileText, label: "All Bookings", value: stats.all_booking },
      { icon: FiCreditCard, label: "Payments", value: `$${stats.total_payment}` }
    );
  } else if (user.role == "Patient") {
    stateData.push(
      { icon: FiActivity, label: "Campaigns", value: stats.total_campaigns },
      { icon: FiFileText, label: "Booked", value: stats.total_booked },
      { icon: FiStar, label: "Doses Taken", value: stats.total_vaccine_dose },
      { icon: FiCreditCard, label: "Payments", value: `$${stats.total_payment}` }
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stateData.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="card bg-base-100 shadow-md hover:shadow-lg transition p-4">
            <div className="flex items-center gap-2">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="text-sm font-medium">{item.label}</h3>
            </div>
            <p className="mt-2 text-2xl font-bold">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatCard;
