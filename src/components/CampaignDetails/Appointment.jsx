const Appointment = () => {

  const vaccines = ["Pfizer", "Moderna", "AstraZeneca", "Sinovac"];
  const doseCenters = ["Dhaka", "Ctg", "Patiya", "Sobjar Para"];

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white">
      <h2 className="text-2xl font-extrabold text-gray-900">Book Your Vaccine Campaign</h2>
      
      <form className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vaccine</label>
          <select className="select select-bordered w-full" value="" required>
            <option value="">Select Vaccine</option>
            {vaccines.map((vaccine, idx) => (
              <option key={idx} value={vaccine}>{vaccine}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dose Center</label>
          <select className="select select-bordered w-full"
            value="" required>
            <option value="">Select Dose Center</option>
            {doseCenters.map((center, idx) => (
              <option key={idx} value={center}>{center}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input type="date" className="input input-bordered w-full"
            value="" required/>
        </div>

        <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Appointment;
