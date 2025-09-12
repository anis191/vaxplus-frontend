import { HiAdjustments } from "react-icons/hi";

const FilterSection = ({
  selectedCategory,
  setSelectedCategory,
  isPremium,
  setIsPremium,
  startDateGt,
  setStartDateGt,
  startDateLt,
  setStartDateLt,
  selectedStatus,
  setSelectedStatus,
  orderingQuery,
  setOrderingQuery,
  searchQuery,
  setSearchQuery
}) => {

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between">
        <h2 className="text-lg md:text-2xl font-bold mb-3 text-start">All Vaccine Campaigns</h2>
        <div className="flex gap-3">
          <div className="join">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="input input-bordered join-item focus:outline-none input-sm md:input-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}/>
            <button className="btn btn-soft btn-primary btn-sm md:btn-md join-item">Search</button>
          </div>
          <button
            className="flex btn btn-sm md:btn-md join-item cursor-pointer bg-purple-100 text-purple-500 hover:bg-purple-150 font-bold"
            onClick={() => document.getElementById("filter_modal").showModal()}
          >
            <HiAdjustments className="text-base sm:text-lg" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <dialog id="filter_modal" className="modal modal-top sm:modal-middle">
        <div className="modal-box p-4 sm:p-6 max-w-md w-full">
          <h2 className="text-stone-700 text-base font-semibold mb-1">Filters</h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {/* Category */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-xs text-stone-600">Category</label>
              <select
                id="category"
                className="mt-1 px-2 py-0.5 text-xs border rounded focus:ring focus:ring-blue-200"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="covid">COVID</option>
                <option value="flu">Flu</option>
                <option value="hepatitis">Hepatitis</option>
              </select>
            </div>

            {/* Is Premium */}
            <div className="flex flex-col">
              <label htmlFor="is_premium" className="text-xs text-stone-600">Is Premium</label>
              <select
                id="is_premium"
                className="mt-1 px-2 py-0.5 text-xs border rounded focus:ring focus:ring-blue-200"
                value={isPremium}
                onChange={(e) => setIsPremium(e.target.value)}
              >
                <option value="">Select---</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Start date gt*/}
            <div className="flex flex-col">
              <label htmlFor="start_date_gt" className="text-xs text-stone-600">Start Date &gt;</label>
              <input
                id="start_date_gt"
                type="date"
                className="mt-1 px-2 py-0.5 text-xs border rounded focus:ring focus:ring-blue-200"
                value={startDateGt}
                onChange={(e) => setStartDateGt(e.target.value)}
              />
            </div>

            {/* Start date lt */}
            <div className="flex flex-col">
              <label htmlFor="start_date_lt" className="text-xs text-stone-600">Start Date &lt;</label>
              <input
                id="start_date_lt"
                type="date"
                className="mt-1 px-2 py-0.5 text-xs border rounded focus:ring focus:ring-blue-200"
                value={startDateLt}
                onChange={(e) => setStartDateLt(e.target.value)}
              />
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label htmlFor="status" className="text-xs text-stone-600">Status</label>
              <select
                id="status"
                className="mt-1 px-2 py-0.5 text-xs border rounded focus:ring focus:ring-blue-200"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Ended">Ended</option>
              </select>
            </div>

            {/* Ordering */}
            <div className="flex flex-col">
              <label htmlFor="ordering" className="text-xs text-stone-600">Ordering</label>
              <select
                id="ordering"
                className="mt-1 px-2 py-0.5 text-xs border rounded focus:ring focus:ring-blue-200"
                value={orderingQuery}
                onChange={(e) => setOrderingQuery(e.target.value)}
              >
                <option value="">Default</option>
                <option value="start_date">Start Date ↑</option>
                <option value="-start_date">Start Date ↓</option>
              </select>
            </div>
          </div>

          <form method="dialog" className="mt-2 text-right">
            <button className="text-xs text-gray-500 hover:text-gray-700">Close</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default FilterSection;
