import { FaInfoCircle, FaSyringe, FaUserMd, FaBook, FaStar } from "react-icons/fa";

const TabsNavber = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sticky top-0 z-20 mt-5">
      <div className="flex flex-wrap items-center gap-2 px-2 sm:px-0 justify-start">
        <button
          onClick={() => setActiveTab("info")}
          aria-pressed={activeTab === "info"}
          className={`flex items-center whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md ${
            activeTab === "info" ? "bg-blue-100 text-blue-700" : "text-blue-700 bg-transparent"
          }`}>
          <FaInfoCircle className="inline mr-1 text-sm sm:text-base" /> Info
        </button>

        <button
          onClick={() => setActiveTab("vaccines")}
          aria-pressed={activeTab === "vaccines"}
          className={`flex items-center whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md ${
            activeTab === "vaccines" ? "bg-blue-100 text-blue-700" : "text-blue-700 bg-transparent"
          }`}>
          <FaSyringe className="inline mr-1 text-sm sm:text-base" /> Vaccines
        </button>

        <button
          onClick={() => setActiveTab("doctors")}
          aria-pressed={activeTab === "doctors"}
          className={`flex items-center whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md ${
            activeTab === "doctors" ? "bg-blue-100 text-blue-700" : "text-blue-700 bg-transparent"
          }`}>
          <FaUserMd className="inline mr-1 text-sm sm:text-base" /> Doctors
        </button>

        <button
          onClick={() => setActiveTab("Appointment")}
          aria-pressed={activeTab === "Appointment"}
          className={`flex items-center whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md ${
            activeTab === "Appointment" ? "bg-blue-100 text-blue-700" : "text-blue-700 bg-transparent"
          }`}>
          <FaBook className="inline mr-1 text-sm sm:text-base" /> Appointment
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          aria-pressed={activeTab === "reviews"}
          className={`flex items-center whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md ${
            activeTab === "reviews" ? "bg-blue-100 text-blue-700" : "text-blue-700 bg-transparent"
          }`}>
          <FaStar className="inline mr-1 text-sm sm:text-base" /> Reviews
        </button>
      </div>
    </div>
  );
};

export default TabsNavber;

