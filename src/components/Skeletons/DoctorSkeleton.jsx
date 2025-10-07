
const DoctorSkeleton = () => {
  return (
    <div className="flex justify-center items-center py-6 px-4">
      <div className="bg-white rounded-sm shadow-lg overflow-hidden w-full max-w-sm border border-gray-100 p-4">
        {/* Profile Picture */}
        <div className="skeleton w-full h-60"></div>

        {/* Doctor Info */}
        <div className="p-4 text-center space-y-3">
          <div className="skeleton h-5 w-3/4 mx-auto"></div>

          <div className="skeleton h-6 w-1/2 mx-auto rounded-full"></div>

          <div className="skeleton h-4 w-2/3 mx-auto mt-3"></div>
          <div className="skeleton h-4 w-1/2 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSkeleton;
