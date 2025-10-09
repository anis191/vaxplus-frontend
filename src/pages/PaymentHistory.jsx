import { FiCreditCard } from "react-icons/fi";
import TableSkeleton from "../components/Skeletons/TableSkeleton";
import useFetchPayments from "../hooks/useFetchPayments";

const PaymentHistory = () => {
  const { payments, loading } = useFetchPayments();

  const tableHeaders = ["Serial", "Title", "Amount", "Transaction ID", "Date", "Status"];

  if (loading) return <TableSkeleton />;
  if (!payments || payments.length === 0)
    return <div className="text-gray-500 text-center py-8">No payment history found.</div>;

  const statusColors = {
    Success: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
  };

  return (
    <div className="overflow-x-auto">
      {/* Header */}
      <div className="flex items-center justify-center my-4">
        <FiCreditCard className="text-indigo-500 h-6 w-6 mr-2" />
        <h2 className="text-lg md:text-xl font-semibold text-gray-600">
          All Payments
        </h2>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-indigo-50">
            <tr>
              {tableHeaders.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.map((payment, idx) => (
              <tr
                key={payment.id}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="px-6 py-3 text-sm text-gray-700">{idx + 1}</td>
                <td className="px-6 py-3 text-sm text-gray-900 font-medium truncate">{payment.title}</td>
                <td className="px-6 py-3 text-sm text-gray-700">${payment.amount}</td>
                <td className="px-6 py-3 text-sm text-gray-700 truncate">{payment.transaction_id}</td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  {new Date(payment.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      statusColors[payment.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {payments.map((payment, idx) => (
          <div
            key={payment.id}
            className="shadow-md rounded-lg border border-gray-200 p-4 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-gray-700">{payment.title}</h4>
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  statusColors[payment.status] || "bg-gray-100 text-gray-800"
                }`}
              >
                {payment.status}
              </span>
            </div>
            <div className="text-gray-600 text-sm space-y-1">
              <p><strong>Serial:</strong> {idx + 1}</p>
              <p><strong>Amount:</strong> ${payment.amount}</p>
              <p><strong>Transaction ID:</strong> {payment.transaction_id}</p>
              <p><strong>Date:</strong> {new Date(payment.created_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
