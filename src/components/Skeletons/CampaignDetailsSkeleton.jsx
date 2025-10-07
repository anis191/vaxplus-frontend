export default function CampaignSkeletonResponsive() {
  return (
    <section
      role="status"
      aria-label="Loading campaign details"
      className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
      {/* Tabs row - allow horizontal scroll on very small screens */}
      <div className="flex items-center gap-3 mb-5 overflow-x-auto pb-1 -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="shrink-0 animate-pulse rounded-md bg-gray-200 h-8 w-20 flex items-center justify-center"></div>
        <div className="shrink-0 animate-pulse rounded-md bg-gray-200 h-8 w-28"></div>
        <div className="shrink-0 animate-pulse rounded-md bg-gray-200 h-8 w-24"></div>
        <div className="shrink-0 animate-pulse rounded-md bg-gray-200 h-8 w-28"></div>
        <div className="shrink-0 animate-pulse rounded-md bg-gray-200 h-8 w-20"></div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left column: title + description + stats */}
        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            {/* responsive widths: full on xs, narrower on larger screens */}
            <div className="animate-pulse bg-gray-200 h-10 sm:h-12 w-full sm:w-10/12 md:w-3/4 rounded-md"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-9/12 sm:w-1/2 rounded-md"></div>
          </div>

          {/* Description (multiple lines) */}
          <div className="space-y-2 max-w-full">
            <div className="animate-pulse bg-gray-200 h-3.5 w-full rounded"></div>
            <div className="animate-pulse bg-gray-200 h-3.5 w-11/12 sm:w-10/12 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-3.5 w-10/12 sm:w-8/12 rounded"></div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 max-w-full">
            {/* left col stats block */}
            <div className="space-y-4 hidden md:block">
              <div className="flex flex-col">
                <div className="animate-pulse bg-gray-200 h-3 w-20 rounded"></div>
                <div className="mt-2 animate-pulse bg-gray-200 h-5 w-28 sm:w-32 rounded"></div>
              </div>

              <div className="flex flex-col">
                <div className="animate-pulse bg-gray-200 h-3 w-16 rounded"></div>
                <div className="mt-2 animate-pulse bg-gray-200 h-5 w-24 sm:w-28 rounded"></div>
              </div>

              {/* badge */}
              <div className="mt-2">
                <div className="inline-block animate-pulse bg-gray-200 h-8 w-20 rounded-full"></div>
              </div>
            </div>

            {/* right col stats block */}
            <div className="space-y-4 hidden md:block">
              <div className="flex flex-col">
                <div className="animate-pulse bg-gray-200 h-3 w-24 rounded"></div>
                <div className="mt-2 animate-pulse bg-gray-200 h-5 w-28 sm:w-36 rounded"></div>
              </div>

              <div className="flex flex-col">
                <div className="animate-pulse bg-gray-200 h-3 w-28 rounded"></div>
                <div className="mt-2 animate-pulse bg-gray-200 h-5 w-36 sm:w-40 rounded"></div>
              </div>

              <div className="flex flex-col">
                <div className="animate-pulse bg-gray-200 h-3 w-32 rounded"></div>
                <div className="mt-2 animate-pulse bg-gray-200 h-5 w-24 sm:w-28 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: large image placeholder */}
        <div className="w-full">
          {/* aspect: smaller on mobile, wider on larger screens */}
          <div className="animate-pulse bg-gray-200 rounded-lg overflow-hidden w-full shadow">
            <div className="h-44 sm:h-56 md:h-64 lg:aspect-[16/10] lg:h-auto flex items-center justify-center">
              {/* simulate image */}
              <svg
                className="opacity-30"
                xmlns="http://www.w3.org/2000/svg"
                width="320"
                height="200"
                viewBox="0 0 320 200">
                <rect width="320" height="200" fill="#e5e7eb"></rect>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
