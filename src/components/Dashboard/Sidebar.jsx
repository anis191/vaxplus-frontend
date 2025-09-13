import {
  FiBarChart2,
  FiUsers,
  FiActivity,
  FiFileText,
  FiPlusCircle,
} from "react-icons/fi";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

export default function Sidebar() {
  const { user } = useAuthContext();

  const menuItems = user?.is_staff
    ? [
        { to: "/dashboard", icon: FiBarChart2, label: "Overview" },
        { to: "/campaigns", icon: FiActivity, label: "All Campaigns" },
        { to: "/doctor-applications", icon: FiActivity, label: "Doctors Applications" },
        { to: "/campaigns/add", icon: FiPlusCircle, label: "Add Campaign" },
        { to: "/category/add", icon: FiPlusCircle, label: "Add Category" },
        { to: "/vaccine/add", icon: FiPlusCircle, label: "Add Vaccine" },
        { to: "/participants", icon: FiUsers, label: "All Participants" },
        { to: "/reports", icon: FiFileText, label: "Reports" },
      ]
    : user?.role === "Doctor"
    ? [
        { to: "/dashboard", icon: FiBarChart2, label: "Overview" },
        { to: "/campaigns", icon: FiActivity, label: "Your Campaigns" },
        { to: "/dashboard/add/campaign", icon: FiPlusCircle, label: "Add Campaign" },
        { to: "/category/add", icon: FiPlusCircle, label: "Add Category" },
        { to: "/vaccine/add", icon: FiPlusCircle, label: "Add Vaccine" },
        { to: "/participants", icon: FiUsers, label: "Manage Your Patients" },
        { to: "/reports", icon: FiFileText, label: "Reports" },
      ]
    : [
        { to: "/dashboard", icon: FiBarChart2, label: "My Dashboard" },
        { to: "/campaigns", icon: FiActivity, label: "Campaigns" },
        { to: "/dashboard/booked_dose", icon: FiUsers, label: "My Registrations" },
        { to: "/dashboard/vaccination_history", icon: FiUsers, label: "My Vaccination History" },
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
          {menuItems.map(({ to, icon: Icon, label }, idx) => (
            <li key={idx}>
              <Link to={to}>
                <Icon className="h-4 w-4" /> {label}
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
