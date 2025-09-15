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
        { to: "/dashboard/vaccines", icon: FiActivity, label: "All Vaccines" },
        { to: "/dashboard/categories", icon: FiActivity, label: "All Categories" },
        { to: "/dashboard/centers", icon: FiActivity, label: "All Centers" },
        { to: "/dashboard/doctor_applications", icon: FiActivity, label: "Doctors Applications" },
        { to: "/dashboard/add/campaign", icon: FiPlusCircle, label: "Add Campaign" },
        { to: "/dashboard/add/category", icon: FiPlusCircle, label: "Add Category" },
        { to: "/dashboard/add/vaccine", icon: FiPlusCircle, label: "Add Vaccine" },
        { to: "/dashboard/add/center", icon: FiPlusCircle, label: "Add Center" },
        { to: "/dashboard/payments", icon: FiUsers, label: "All Payments" },
        { to: "/reports", icon: FiFileText, label: "Reports" },
      ]
    : user?.role === "Doctor"
    ? [
        { to: "/dashboard", icon: FiBarChart2, label: "Overview" },
        { to: "/campaigns", icon: FiActivity, label: "Your Campaigns" },
        { to: "/dashboard/add/campaign", icon: FiPlusCircle, label: "Add Campaign" },
        { to: "/dashboard/add/category", icon: FiPlusCircle, label: "Add Category" },
        { to: "/dashboard/add/vaccine", icon: FiPlusCircle, label: "Add Vaccine" },
        { to: "/dashboard/add/center", icon: FiPlusCircle, label: "Add Center" },
        { to: "/dashboard/booked_dose", icon: FiUsers, label: "Manage Your Patients" },
        { to: "/dashboard/payments", icon: FiUsers, label: "Your Payments History" },
        { to: "/reports", icon: FiFileText, label: "Reports" },
      ]
    : [
        { to: "/dashboard", icon: FiBarChart2, label: "My Dashboard" },
        { to: "/dashboard/patient_profile", icon: FiBarChart2, label: "My Patient Profile" },
        { to: "/campaigns", icon: FiActivity, label: "Campaigns" },
        { to: "/dashboard/booked_dose", icon: FiUsers, label: "My Registrations" },
        { to: "/dashboard/vaccination_history", icon: FiUsers, label: "My Vaccination History" },
        { to: "/dashboard/payments", icon: FiUsers, label: "My Payments History" },
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
