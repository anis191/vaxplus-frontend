// import React from "react";

const BookingDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-sm animate-fadeIn">
      {/* Title */}
      <div className="skeleton h-7 w-64 mx-auto mb-6"></div>

      {/* Grid of Booking Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 shadow-sm relative overflow-hidden"
          >
            {/* Icon Placeholder */}
            <div className="skeleton h-10 w-10 rounded-full"></div>

            {/* Text Lines */}
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-1/3"></div>
              <div className="skeleton h-5 w-2/3"></div>
            </div>

            {/* Subtle diamond sheen overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-diamondSheen"></div>
            </div>
          </div>
        ))}

        {/* Status Dropdown Skeleton */}
        <div className="flex flex-col gap-3">
          <div className="skeleton h-5 w-32 mx-auto"></div>
          <div className="flex items-center justify-between gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 w-full">
              <div className="skeleton h-5 w-5 rounded-full"></div>
              <div className="skeleton h-5 w-24"></div>
            </div>
            <div className="skeleton h-8 w-24 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSkeleton;
