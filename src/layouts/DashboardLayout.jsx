import { useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
    <div className="drawer lg:drawer-open">
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggleSidebar}/>

      <div className="drawer-content flex flex-col">
            <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <Outlet />
      </div>
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;