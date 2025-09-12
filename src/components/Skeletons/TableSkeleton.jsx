const TableSkeleton = () => {
  const rows = Array.from({ length: 5 });

  return (
    <div className="overflow-x-auto w-full rounded-md border border-gray-200">
      <table className="table w-full">
        <tbody>
          {rows.map((_, idx) => (
            <tr key={idx}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="skeleton rounded-full h-10 w-10"></div>
                  <div className="flex flex-col gap-2">
                    <div className="skeleton h-4 w-32"></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="skeleton h-4 w-24"></div>
              </td>
              <td className="text-center">
                <div className="skeleton h-6 w-20 mx-auto rounded-md"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
