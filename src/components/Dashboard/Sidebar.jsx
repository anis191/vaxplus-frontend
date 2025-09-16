import {
  FiBarChart2,
  FiUsers,
  FiActivity,
  FiFileText,
  FiPlusCircle,
  FiCreditCard,
  FiUser,
  FiMapPin,
  FiTag,
} from "react-icons/fi";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

export default function Sidebar() {
  const { user } = useAuthContext();
      const menuItems = user?.is_staff
        ? [
            { to: "/dashboard", icon: <FiBarChart2 className="text-indigo-500" />, label: "Overview" },
            { to: "/campaigns", icon: <FiActivity className="text-green-500" />, label: "All Campaigns" },
            { to: "/dashboard/vaccines", icon: <FiActivity className="text-red-500" />, label: "All Vaccines" },
            { to: "/dashboard/categories", icon: <FiTag className="text-yellow-500" />, label: "All Categories" },
            { to: "/dashboard/centers", icon: <FiMapPin className="text-blue-500" />, label: "All Centers" },
            { to: "/dashboard/doctor_applications", icon: <FiUser className="text-pink-500" />, label: "Doctors Applications" },
            { to: "/dashboard/add/campaign", icon: <FiPlusCircle className="text-green-500" />, label: "Add Campaign" },
            { to: "/dashboard/add/category", icon: <FiPlusCircle className="text-yellow-500" />, label: "Add Category" },
            { to: "/dashboard/add/vaccine", icon: <FiPlusCircle className="text-red-500" />, label: "Add Vaccine" },
            { to: "/dashboard/add/center", icon: <FiPlusCircle className="text-blue-500" />, label: "Add Center" },
            { to: "/dashboard/payments", icon: <FiCreditCard className="text-indigo-500" />, label: "All Payments" },
            { to: "/reports", icon: <FiFileText className="text-gray-700" />, label: "Reports" },
          ]
        : user?.role === "Doctor"
        ? [
            { to: "/dashboard", icon: <FiBarChart2 className="text-indigo-500" />, label: "Overview" },
            { to: "/campaigns", icon: <FiActivity className="text-green-500" />, label: "Your Campaigns" },
            { to: "/dashboard/add/campaign", icon: <FiPlusCircle className="text-green-500" />, label: "Add Campaign" },
            { to: "/dashboard/add/category", icon: <FiPlusCircle className="text-yellow-500" />, label: "Add Category" },
            { to: "/dashboard/add/vaccine", icon: <FiPlusCircle className="text-red-500" />, label: "Add Vaccine" },
            { to: "/dashboard/add/center", icon: <FiPlusCircle className="text-blue-500" />, label: "Add Center" },
            { to: "/dashboard/booked_dose", icon: <FiUsers className="text-purple-500" />, label: "Manage Your Patients" },
            { to: "/dashboard/payments", icon: <FiCreditCard className="text-indigo-500" />, label: "Your Payments History" },
            { to: "/reports", icon: <FiFileText className="text-gray-700" />, label: "Reports" },
          ]
        : [
            { to: "/dashboard", icon: <FiBarChart2 className="text-indigo-500" />, label: "My Dashboard" },
            { to: "/dashboard/patient_profile", icon: <FiUser className="text-pink-500" />, label: "My Patient Profile" },
            { to: "/campaigns", icon: <FiActivity className="text-green-500" />, label: "Campaigns" },
            { to: "/dashboard/booked_dose", icon: <FiUsers className="text-purple-500" />, label: "My Registrations" },
            { to: "/dashboard/vaccination_history", icon: <FiActivity className="text-red-500" />, label: "My Vaccination History" },
            { to: "/dashboard/payments", icon: <FiCreditCard className="text-indigo-500" />, label: "My Payments History" },
          ];

  return (
    <div className="drawer-side z-10">
      <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
      <aside className="menu bg-base-200 w-64 min-h-full p-4 text-base-content">
        
        <div className="flex items-center gap-2 mb-6 px-2">
          <FiActivity className="h-6 w-6 text-primary" />
          <Link to="/">
            <h1 className="text-xl font-bold">VaxPlus</h1>
          </Link>
        </div>

        <ul className="menu menu-md gap-2">
          {menuItems.map(({ to, icon, label }, idx) => (
            <li key={idx}>
              <Link to={to}>
                {icon} {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 text-xs text-base-content/70">
          © 2025 VaxPlus
        </div>
      </aside>
    </div>
  );
}
