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

      <aside
        className="menu w-64 min-h-full p-4 text-base-content border-r border-gray-200 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #eef2ff 0%, #f9fafb 40%, #ffffff 100%)",
        }}
      >
        {/* Decorative gradient overlay for subtle depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/60 via-transparent to-indigo-50/40 pointer-events-none"></div>

        {/* Floating gradient circles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl"></div>

        {/* Brand */}
        <div className="relative flex items-center gap-2 mb-8 px-2">
          <div className="p-2 bg-indigo-500 rounded-xl text-white shadow-md">
            <FiActivity className="h-5 w-5" />
          </div>
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">
              VaxPlus
            </h1>
          </Link>
        </div>

        {/* Menu */}
        <ul className="menu menu-md gap-1 relative">
          {menuItems.map(({ to, icon, label }, idx) => (
            <li key={idx}>
              <Link
                to={to}
                className="flex items-center gap-3 rounded-xl px-3 py-2 font-medium text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-200 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                  {icon}
                </span>
                <span className="truncate">{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-auto pt-6 text-xs text-gray-600 text-center border-t border-gray-200 relative z-10">
          © 2025 <span className="font-semibold text-indigo-600">VaxPlus</span>
        </div>
      </aside>
    </div>
  );
}
