import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SimplePagination = ({ currentPage, totalPages, handleChange }) => {
  return (
    <ul className="py-5 flex justify-center gap-3 text-gray-900 items-center">
      {/* Previous */}
      <li>
        <button onClick={() => handleChange(Math.max(1, currentPage - 1))}
          aria-label="Previous page"
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 h-8 rounded border border-gray-200 transition-colors hover:bg-gray-50 font-medium text-sm">
            <FiChevronLeft className="w-4 h-4" />
            <span>Prev</span>
        </button>
      </li>

      {/* Page */}
      <li className="text-sm/8 font-medium tracking-widest">
        {currentPage}/{totalPages}
      </li>

      {/* Next */}
      <li>
        <button onClick={() => handleChange(Math.min(totalPages, currentPage + 1))}
          aria-label="Next page" disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 h-8 rounded border border-gray-200 transition-colors hover:bg-gray-50 font-medium text-sm">
            <span>Next</span>
            <FiChevronRight className="w-4 h-4" />
        </button>
      </li>
    </ul>
  );
};

export default SimplePagination;
