import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

export default function Navbar({ sidebarOpen, toggleSidebar }) {
  const { logoutUser } = useAuthContext();

  return (
    <div className="navbar bg-base-100 border-b shadow-sm">
      <div className="flex-none lg:hidden">
        <button onClick={toggleSidebar} className="btn btn-square btn-ghost">
          {sidebarOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-primary">VaxPlus Dashboard</h2>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/dashboard/profile">Profile</Link></li>
            <li><Link to="/dashboard/settings">Settings</Link></li>
            <li><a onClick={logoutUser}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
