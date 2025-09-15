import TableSkeleton from "../components/Skeletons/TableSkeleton";
import useFetchPayments from "../hooks/useFetchPayments";

const PaymentHistory = () => {
  const {payments, loading} = useFetchPayments()

  const tableHeaders = ["Serial","Title","Amount","Transaction ID","Date","Status"]

  if (loading) return <TableSkeleton />
  // if (!payments || payments.length === 0) return <TableSkeleton />
  if (!payments || payments.length === 0)
  return <div className="text-gray-500 text-center py-8">No payment history found.</div>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
        <thead className="bg-gray-100">
          <tr>
            {tableHeaders.map((header, idx) => (
              <th key={idx}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}
              className="border-b even:bg-gray-50 hover:bg-gray-100 transition">
              <td className="px-4 py-2 text-sm text-gray-700">{payment.id}</td>
              <td className="px-4 py-2 text-sm text-gray-900 font-medium truncate">{payment.title}</td>
              <td className="px-4 py-2 text-sm text-gray-700">${payment.amount}</td>
              <td className="px-4 py-2 text-sm text-gray-700 truncate">{payment.transaction_id}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {new Date(payment.created_at).toLocaleString()}
              </td>
              <td className={`px-4 py-2 text-sm font-semibold ${
                payment.status === "Success" ? "text-green-600" :
                payment.status === "Pending" ? "text-yellow-600" :
                "text-red-600"}`}>
                {payment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;