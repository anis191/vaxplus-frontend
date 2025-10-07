const CampaignSkeleton = () => {
  return (
    <div className="w-full max-w-[1200px] px-4 py-5 md:py-10">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((col) => (
          <div key={col} className="space-y-4">
            {/* Large Campaign Card Skeleton */}
            <div className="flex w-full flex-col gap-4 rounded-lg bg-white shadow p-4">
              <div className="skeleton h-52 w-full"></div>
              <div className="skeleton h-5 w-28"></div>
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-4 w-1/2"></div>
              <div className="flex gap-2 mt-2">
                <div className="skeleton h-5 w-16 rounded"></div>
                <div className="skeleton h-5 w-20 rounded"></div>
                <div className="skeleton h-5 w-14 rounded"></div>
              </div>
            </div>

            {/* Two small summary skeletons */}
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg bg-white shadow p-3"
              >
                <div className="skeleton h-20 w-20 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-3/4"></div>
                  <div className="skeleton h-3 w-1/2"></div>
                  <div className="skeleton h-4 w-16 rounded-full"></div>
                </div>
              </div>
            ))}

            {/* Button Skeleton */}
            <div className="skeleton h-10 w-28 rounded-full mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Mobile Layout (ONLY 1 big + 1 small card) */}
      <div className="space-y-8 md:hidden">
        {[1, 2].map((col) => (
          <div key={col} className="space-y-4">
            {/* Big card skeleton */}
            <div className="flex w-full flex-col gap-4 rounded-lg bg-white shadow p-4">
              <div className="skeleton h-48 w-full"></div>
              <div className="skeleton h-5 w-24"></div>
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-4 w-1/2"></div>
            </div>

            {/* Only one small summary card */}
            <div className="flex items-center gap-3 rounded-lg bg-white shadow p-3">
              <div className="skeleton h-16 w-16 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-2/3"></div>
                <div className="skeleton h-3 w-1/2"></div>
                <div className="skeleton h-4 w-14 rounded-full"></div>
              </div>
            </div>

            {/* Button skeleton */}
            <div className="skeleton h-10 w-24 rounded-full mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignSkeleton;
