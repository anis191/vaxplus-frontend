const DashboardStatusSkeleton = () => {
  const cards = [1, 2, 3, 4]; // 4 cards for big screen

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((id) => (
        <div key={id} className="card bg-base-100 shadow-md p-4">
          <div className="flex flex-col items-center space-y-3">
            <div className="skeleton w-12 h-12 rounded-full"></div>
            <div className="skeleton w-24 h-4"></div>
            <div className="skeleton w-16 h-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStatusSkeleton;
