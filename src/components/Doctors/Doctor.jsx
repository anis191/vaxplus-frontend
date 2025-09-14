import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router";

const Doctor = ({doctor}) => {
  return (
    <div className="flex justify-center items-center py-6 px-4">
      <div className="bg-white rounded-sm shadow-lg overflow-hidden w-full max-w-sm border border-gray-100 transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300">
        {/* Profile Picture */}
        <div className="relative group">
          <img src={doctor.profile_picture} alt="doctor_profile" className="w-full h-60 object-cover"/>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-end">
            <Link to={`/doctors/${doctor.id}`}><button className="mb-4 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition flex items-center gap-2">
              View Profile<FiExternalLink size={16} />
            </button></Link>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            {doctor.bio.first_name} {doctor.bio.last_name}
          </h3>
          <p className="text-sm text-blue-600 font-medium mt-1">
            {doctor.specialization}
          </p>
          <div className="mt-3 text-gray-600 text-sm">
            <p>{doctor.contact}</p>
            <p className="mt-1">{doctor.bio.phone_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
