import VaccineDetailsModal from "../Vaccines/VaccineDetail";

const VaccinesInfo = ({ campaign }) => {
  if (!campaign?.vaccine_details || campaign.vaccine_details.length === 0) {
    return (
      <div className="mt-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Vaccines</h2>
        <p className="mt-3 text-gray-600">No vaccine information available.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-extrabold text-gray-900">Vaccines</h2>
      <ul className="mt-4 space-y-4">
        {campaign.vaccine_details.map((vaccine) => (
          <li key={vaccine.id} className="bg-gray-50 p-4 shadow-sm">
            {/* vaccine info */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">{vaccine.name}</span>
              <span className="text-sm text-gray-600 flex items-center gap-2">
                {vaccine.total_doses} doses
                {vaccine.is_booster && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Booster</span>
                )}
              </span>
            </div>

            {/* info */}
            <div className="flex justify-between">
            <div className="mt-3 text-sm text-gray-700">
              <p>
                <span className="font-medium">Dose Gap:</span>{" "}
                {vaccine.dose_gap} days
              </p>
            </div>
            <VaccineDetailsModal vaccine_id={vaccine.id}/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VaccinesInfo;
