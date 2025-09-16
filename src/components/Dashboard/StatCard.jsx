import { useEffect, useState } from "react";
import { FiUsers, FiActivity, FiStar, FiFileText, FiCreditCard } from "react-icons/fi";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";
import DashboardStatusSkeleton from "../Skeletons/DashboardSkeletons";

const StatCard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await authApiClient.get("/data/");
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
      <div className="w-full flex justify-center items-center my-3">
        <DashboardStatusSkeleton />
      </div>
    );
  }

  if (!stats) {
    return <p className="text-red-500">Failed to load dashboard stats.</p>;
  }

  const stateData = [];

  if (user.is_staff) {
    stateData.push(
      { icon: FiUsers, label: "Total Users", value: stats.total_users, color: "bg-indigo-100 text-indigo-700" },
      { icon: FiUsers, label: "Doctors", value: stats.total_doctors, color: "bg-pink-100 text-pink-700" },
      { icon: FiActivity, label: "Campaigns", value: stats.total_campaigns, color: "bg-green-100 text-green-700" },
      { icon: FiFileText, label: "Bookings", value: stats.total_booking, color: "bg-yellow-100 text-yellow-700" },
      { icon: FiCreditCard, label: "Payments", value: `$${stats.total_payment}`, color: "bg-blue-100 text-blue-700" }
    );
  } else if (user.role === "Doctor") {
    stateData.push(
      { icon: FiActivity, label: "Involved Campaigns", value: stats.involved_campaigns, color: "bg-green-100 text-green-700" },
      { icon: FiFileText, label: "Bookings Under You", value: stats.all_booking, color: "bg-yellow-100 text-yellow-700" },
      { icon: FiCreditCard, label: "Your Campaigns Earn", value: `$${stats.total_payment}`, color: "bg-blue-100 text-blue-700" }
    );
  } else if (user.role === "Patient") {
    stateData.push(
      { icon: FiActivity, label: "Campaigns", value: stats.total_campaigns, color: "bg-green-100 text-green-700" },
      { icon: FiFileText, label: "Booked", value: stats.total_booked, color: "bg-yellow-100 text-yellow-700" },
      { icon: FiStar, label: "Doses Taken", value: stats.total_vaccine_dose, color: "bg-purple-100 text-purple-700" },
      { icon: FiCreditCard, label: "Your Payments", value: `$${stats.total_payment}`, color: "bg-blue-100 text-blue-700" }
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stateData.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className={`p-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ${item.color} flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between">
              <Icon className="h-5 w-5" />
              <h3 className="text-sm font-medium text-gray-800">{item.label}</h3>
            </div>
            <p className="mt-2 text-xl font-bold text-gray-900">{item.value}</p>
            <div className="mt-2 h-1 w-1/3 bg-gray-300 rounded-full"></div>
          </div>
        );
      })}
    </div>
  );
};

export default StatCard;
