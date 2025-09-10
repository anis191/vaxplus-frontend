import { FiAlertCircle } from "react-icons/fi";

const Error = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
            <div className="flex items-center justify-center mb-4 text-red-600 text-5xl">
                <FiAlertCircle />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Oops! Something went wrong.
            </h2>
            <p className="text-gray-600">
                {message || "Please try again later."}
            </p>
        </div>
    );
};

export default Error;
