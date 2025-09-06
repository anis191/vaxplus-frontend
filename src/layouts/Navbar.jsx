import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);

  return (
    <header className="w-full shadow-md">
      {/* Top */}
      <div className="bg-blue-900 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-3 sm:px-6 py-1 sm:py-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <span className="flex items-center gap-1">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 5h2l.4 2M7 13h10l4-8H5.4" />
                <circle cx="7" cy="21" r="2" />
                <circle cx="20" cy="21" r="2" />
              </svg>
              +880 1234-567890
            </span>
            <span className="hidden md:flex items-center gap-1">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" />
                <path d="M12 14v7m0-7c4.418 0 8-1.79 8-4V5c0-2.21-3.582-4-8-4s-8 1.79-8 4v5c0 2.21 3.582 4 8 4z" />
              </svg>
              vax@plus713.org
            </span>
            <span className="hidden md:block">Help Center</span>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <a href="#" className="hover:text-gray-300">FB</a>
            <a href="#" className="hover:text-gray-300">X</a>
            <a href="#" className="hover:text-gray-300">IG</a>
          </div>
        </div>
      </div>

      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a className="flex items-center gap-2">
              <img
                src="https://img.icons8.com/color/48/000000/hospital-3.png"
                alt="logo"
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
              <span className="text-lg sm:text-xl font-bold text-blue-900">VaxPlus</span>
            </a>

            <div className="hidden lg:flex space-x-6 items-center">
              <a href="#" className="text-gray-700 hover:text-blue-700">Home</a>
              <div
                className="relative"
                onMouseEnter={() => setDepartmentsOpen(true)}
                onMouseLeave={() => setDepartmentsOpen(false)}>
                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-700">
                  Departments
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {departmentsOpen && (
                  <div className="absolute bg-white shadow-md rounded-md mt-2 w-40 z-50">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Cardiology</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Neurology</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Orthopedics</a>
                  </div>
                )}
              </div>
              <a href="#" className="text-gray-700 hover:text-blue-700">Doctors</a>
              <a href="#" className="text-gray-700 hover:text-blue-700">Appointments</a>
              <a href="#" className="text-gray-700 hover:text-blue-700">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-700">Contact</a>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a className="hidden sm:inline-block px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition">
                Register / Log In
              </a>
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-8 sm:w-9 rounded-full">
                  <span className="text-xs sm:text-sm">SY</span>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-md z-50">
            <ul className="px-4 py-2 space-y-2">
              <li><a href="#" className="block text-gray-700 hover:text-blue-700">Home</a></li>
              <li>
                <button
                  className="w-full text-left text-gray-700 hover:text-blue-700 flex justify-between items-center"
                  onClick={() => setDepartmentsOpen(!departmentsOpen)}
                >
                  Departments
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {departmentsOpen && (
                  <ul className="pl-4 mt-1 space-y-1">
                    <li><a href="#" className="block text-gray-700 hover:text-blue-700">Cardiology</a></li>
                    <li><a href="#" className="block text-gray-700 hover:text-blue-700">Neurology</a></li>
                    <li><a href="#" className="block text-gray-700 hover:text-blue-700">Orthopedics</a></li>
                  </ul>
                )}
              </li>
              <li><a href="#" className="block text-gray-700 hover:text-blue-700">Doctors</a></li>
              <li><a href="#" className="block text-gray-700 hover:text-blue-700">Appointments</a></li>
              <li><a href="#" className="block text-gray-700 hover:text-blue-700">About</a></li>
              <li><a href="#" className="block text-gray-700 hover:text-blue-700">Contact</a></li>
              <li>
                <a className="block w-full text-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition">
                  Register / Log In
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
