import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router";
import {
  FiPhone,
  FiMail,
  FiHelpCircle,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiHome,
  FiCalendar,
  FiUsers,
  FiUserPlus,
  FiBarChart2,
  FiInfo,
  FiMessageCircle,
  // FiChevronDown,
  FiMenu,
} from "react-icons/fi";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutUser } = useAuthContext();

  return (
    <header className="w-full shadow-md">
      {/* 🔹 Top Bar */}
      <div className="bg-blue-900 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-3 sm:px-6 py-1 sm:py-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <span className="flex items-center gap-1">
              <FiPhone className="w-4 h-4" /> +880 1234-567890
            </span>
            <span className="hidden md:flex items-center gap-1">
              <FiMail className="w-4 h-4" /> vax@plus713.org
            </span>
            <span className="hidden md:flex items-center gap-1">
              <FiHelpCircle className="w-4 h-4" /> Help Center
            </span>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <a href="#" className="hover:text-gray-300"><FiFacebook /></a>
            <a href="#" className="hover:text-gray-300"><FiTwitter /></a>
            <a href="#" className="hover:text-gray-300"><FiInstagram /></a>
          </div>
        </div>
      </div>

      {/* 🔹 Main Navbar */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://img.icons8.com/color/48/000000/hospital-3.png"
                alt="logo"
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
              <span className="text-lg sm:text-xl font-bold text-blue-900">VaxPlus</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-6 items-center">
              <Link to="/" className="flex items-center gap-1 text-gray-700 hover:text-blue-700">
                <FiHome /> Home
              </Link>

              <Link to="campaigns">
                <div
                  className="relative">
                  <button className="cursor-pointer flex items-center gap-1 text-gray-700 hover:text-blue-700">
                    <FiCalendar /> Campaigns
                  </button>
                </div>
              </Link>

              <Link to="doctors" className="flex items-center gap-1 text-gray-700 hover:text-blue-700">
                <FiUsers /> Doctors
              </Link>
              <Link to="dashboard/doctors_apply" className="flex items-center gap-1 text-gray-700 hover:text-blue-700">
                <FiUserPlus /> Apply As Doctor
              </Link>
              <Link to="dashboard" className="flex items-center gap-1 text-gray-700 hover:text-blue-700">
                <FiBarChart2 /> Dashboard
              </Link>
              <Link to="/about" className="flex items-center gap-1 text-gray-700 hover:text-blue-700">
                <FiInfo /> About
              </Link>
              <Link to="/contact" className="flex items-center gap-1 text-gray-700 hover:text-blue-700">
                <FiMessageCircle /> Contact
              </Link>
            </div>

            {/* Right Side (Profile / Login + Mobile Menu) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="bg-blue-600 text-white w-8 sm:w-9 rounded-full flex items-center justify-center">
                      <span className="text-xs sm:text-sm">
                        {((user.first_name?.[0] || "") + (user.last_name?.[0] || "")).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-white rounded-md shadow-md mt-3 w-40 p-2 z-50"
                  >
                    <li><Link to="/dashboard/profile">Profile</Link></li>
                    <li><a>Settings</a></li>
                    <li><a onClick={logoutUser}>Logout</a></li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">
                  <button className="hidden sm:inline-block px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition">
                    Register / Log In
                  </button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <FiMenu className="h-6 w-6 text-gray-800" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-md z-50">
            <ul className="px-4 py-2 space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiHome /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="campaigns"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiCalendar /> Campaigns
                </Link>
              </li>
              <li>
                <Link
                  to="doctors"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiUsers /> Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="dashboard/doctors_apply"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiUserPlus /> Apply As Doctor
                </Link>
              </li>
              <li>
                <Link
                  to="dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiBarChart2 /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiInfo /> About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiMessageCircle /> Contact
                </Link>
              </li>
              {!user && (
                <li>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="block w-full text-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition">
                      Register / Log In
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
