// import { useState } from "react";
import { HiAdjustments } from "react-icons/hi";

const FilterSection = () => {

  return (
    <>
    <div className="flex flex-col md:flex-row justify-between">
        <h2 className="text-lg md:text-2xl font-bold mb-3 text-start">All Vaccine Campaigns</h2>
        <div className="flex gap-3">
            <div className="join">
                <input type="text" placeholder="Search campaigns..." className="input input-bordered join-item focus:outline-none input-sm md:input-md"/>
                <button className="btn btn-soft btn-primary btn-sm md:btn-md join-item">Search</button>
            </div>
            <button className="flex btn btn-sm md:btn-md join-item cursor-pointer bg-purple-100 text-purple-500 hover:bg-purple-150 font-bold" onClick={() => document.getElementById("filter_modal").showModal()}>
              <HiAdjustments className="text-base sm:text-lg" />
              <span>Filter</span>
            </button>
        </div>
    </div>

      <dialog id="filter_modal" className="modal modal-top sm:modal-middle">
        <div className="modal-box p-4 sm:p-6 max-w-md w-full">
          <h2 className="text-stone-700 text-base font-semibold mb-1">Filters</h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-xs text-stone-600">Name</label>
              <input
                id="name"
                type="text"
                placeholder="raspberry juice"
                className="mt-1 px-2 py-0.5 text-xs border rounded focus:ring focus:ring-blue-200"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="manufacturer" className="text-xs text-stone-600">Manufacturer</label>
              <input
                id="manufacturer"
                type="text"
                placeholder="cadbury"
                className="mt-1 px-2 py-0.5 text-xs border rounded focus:ring focus:ring-blue-200"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-xs text-stone-600">Date</label>
              <input
                id="date"
                type="date"
                className="mt-1 px-2 py-0.5 text-xs border rounded focus:ring focus:ring-blue-200"/>
            </div>

            <div className="flex flex-col">
              <label htmlFor="status" className="text-xs text-stone-600">Status</label>
              <select
                id="status"
                className="mt-1 px-2 py-0.5 text-xs border rounded focus:ring focus:ring-blue-200">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
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
