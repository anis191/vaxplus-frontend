// import React from "react";
import { FaUsers, FaDonate } from "react-icons/fa";

const Donation = () => {
  const stats = [
    {
      id: 1,
      value: "$120K+",
      label: "Total Donation Collected",
      icon: <FaDonate className="text-red-500 inline ml-2" />,
    },
    {
      id: 2,
      value: "4,500+",
      label: "Total Donors",
      icon: <FaUsers className="text-red-500 inline ml-2" />,
    },
  ];

  return (
    <section className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left Part */}
        <div className="p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Support Our Free Vaccination Campaigns</h2>
          <p className="text-lg font-semibold mb-4">
            Every child and adult deserves access to life-saving vaccines. <br />
            Your support ensures no one is left behind.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Donations collected through our platform are used to fund free vaccination campaigns across the country.By contributing, you help us reach underserved communities, provide vaccines safely, and save countless lives.  
            Every contribution, big or small, makes a real difference.
          </p>
        </div>

        {/* Middle Part Image */}
        <div className="relative mx-6 md:mx-0">
          <img src="https://img.freepik.com/free-photo/happy-doctor-holding-clipboard-with-patients_1098-2176.jpg" alt="Doctor Profile"
            className="w-full h-80 md:h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-3 md:bottom-6 left-4 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Help us continue these lifesaving free vaccine campaigns
            </h3>
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 md:px-8 md:py-3 text-md md:text-lg font-bold shadow-lg transition">
              DONATE
            </button>
          </div>
        </div>

        {/* Right Part*/}
        <div className="flex flex-row justify-center items-center space-x-8 text-center md:flex-col md:items-start md:space-x-0 md:space-y-8 p-6 md:p-10">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center md:items-start">
              <div className="text-red-500 text-4xl md:text-5xl mb-2">
                {stat.icon}
              </div>
              <p className="text-3xl md:text-5xl font-extrabold text-white">
                {stat.value}
              </p>
              <p className="text-gray-400 mt-1 text-base md:text-lg">{stat.label}</p>
              <div className="w-16 md:w-20 h-1 bg-red-500 mt-2 rounded-full mx-auto md:mx-0"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Donation;
