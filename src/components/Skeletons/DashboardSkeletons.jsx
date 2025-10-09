// import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`skeleton ${className}`} />
);

const DashboardStatusSkeleton = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-6 md:py-0 space-y-10">
      {/* ===== Overview Skeleton (For Staff Users) ===== */}
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100 space-y-8 transition-all duration-300 hover:shadow-lg animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <SkeletonBox className="w-12 h-12 rounded-xl" />
            <div className="space-y-2">
              <SkeletonBox className="w-40 h-5" />
              <SkeletonBox className="w-60 h-3" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <SkeletonBox className="w-32 h-6 rounded-full" />
            <SkeletonBox className="w-28 h-6 rounded-full" />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-2 transition-all duration-200 hover:shadow-md"
            >
              <SkeletonBox className="w-24 h-4" />
              <SkeletonBox className="w-20 h-6" />
              <SkeletonBox className="w-32 h-3" />
            </div>
          ))}
        </div>

        {/* Performance + Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <SkeletonBox className="w-32 h-4" />
            <SkeletonBox className="w-full h-3 rounded-full" />
            <SkeletonBox className="w-full h-3 rounded-full" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SkeletonBox className="w-4 h-4 rounded-full" />
                  <SkeletonBox className="w-24 h-3" />
                </div>
                <SkeletonBox className="w-16 h-4 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200 gap-4">
          <SkeletonBox className="w-48 h-4" />
          <div className="flex items-center gap-3">
            <SkeletonBox className="w-28 h-8 rounded-full" />
            <SkeletonBox className="w-28 h-8 rounded-full" />
          </div>
        </div>
      </div>

      {/* ===== Stat Card Grid Skeleton ===== */}
      <div>
        <div className="mb-4 space-y-2">
          <SkeletonBox className="w-44 h-5" />
          <SkeletonBox className="w-64 h-3" />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 space-y-3 transition-all duration-300 hover:shadow-lg animate-fadeIn"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SkeletonBox className="w-10 h-10 rounded-xl" />
                  <SkeletonBox className="w-24 h-4" />
                </div>
                <SkeletonBox className="w-12 h-4 rounded-full" />
              </div>
              <SkeletonBox className="w-20 h-6" />
              <SkeletonBox className="w-full h-2 rounded-full" />
              <div className="flex justify-between">
                <SkeletonBox className="w-24 h-3" />
                <SkeletonBox className="w-8 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatusSkeleton;
