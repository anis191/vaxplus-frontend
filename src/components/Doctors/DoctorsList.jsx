import Doctor from "./Doctor";
import useFetchDoctors from "../../hooks/useFetchDoctors";
import CampaignSkeleton from "../Skeletons/CampaignSkeleton";
import { useState } from "react";

const DoctorsList = () => {
    const[searchQuery, setSearchQuery] = useState("")
    const [inputValue, setInputValue] = useState("");
  const{doctors, loading} = useFetchDoctors(searchQuery)

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  if (loading) return <div className="w-full flex justify-center my-5"><CampaignSkeleton /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Doctors</h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-8 gap-2">
        <input
          type="text"
          placeholder="Search by name or specialization..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input input-bordered w-80"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {doctors.length === 0 ? (
        <p className="text-center text-gray-600">No doctors found.</p>
      ) : (
        <div className="grid gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <Doctor key={doctor.bio.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
