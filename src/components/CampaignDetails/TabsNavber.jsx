import { FaInfoCircle, FaSyringe, FaUserMd, FaBook, FaStar } from "react-icons/fa";

const TabsNavber = ({activeTab,setActiveTab}) => {
    return (
        <>
        <div className="sticky top-0 z-20 flex justify-between sm:justify-start space-x-1 sm:space-x-3 px-2 sm:px-0 mt-5">
          <button onClick={() => setActiveTab("info")} className={`flex items-center text-blue-700 flex-shrink-0 px-2 py-1 text-xs sm:text-sm font-semibold ${activeTab === "info" ? "bg-blue-100" : ""}`}>
            <FaInfoCircle className="inline mr-1 text-sm sm:text-base" /> Info
          </button>

          <button onClick={() => setActiveTab("vaccines")}
            className={`flex items-center text-blue-700 flex-shrink-0 px-2 py-1 text-xs sm:text-sm font-semibold ${activeTab === "vaccines" ? "bg-blue-100" : ""}`}>
            <FaSyringe className="inline mr-1 text-sm sm:text-base" /> Vaccines
          </button>

          <button onClick={() => setActiveTab("doctors")}
            className={`flex items-center text-blue-700 flex-shrink-0 px-2 py-1 text-xs sm:text-sm font-semibold ${activeTab === "doctors" ? "bg-blue-100" : ""}`}>
            <FaUserMd className="inline mr-1 text-sm sm:text-base" /> Doctors
          </button>

          <button onClick={() => setActiveTab("Appointment")}
            className={`flex items-center text-blue-700 flex-shrink-0 px-2 py-1 text-xs sm:text-sm font-semibold ${activeTab === "Appointment" ? "bg-blue-100" : ""}`}>
            <FaBook className="inline mr-1 text-sm sm:text-base" /> Appointment
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center text-blue-700 flex-shrink-0 px-2 py-1 text-xs sm:text-sm font-semibold ${activeTab === "reviews" ? "bg-blue-100" : ""}`}>
            <FaStar className="inline mr-1 text-sm sm:text-base" /> Reviews
          </button>
        </div>
        </>
    );
};

export default TabsNavber;