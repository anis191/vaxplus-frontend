const ProgressLine = ({ leftPx = 0, totalPx = 0, filledPx = 0, colorClass = "bg-blue-600" }) => {
  return (
    <>
      <div className="absolute left-0 right-0 top-6 md:top-9 h-1 -z-10 flex items-center pointer-events-none">
        <div className="h-1 bg-gray-200 rounded-full w-full" />
      </div>

      <div
        className="absolute top-6 md:top-9 h-1 -z-10 rounded-full opacity-50 pointer-events-none"
        style={{
          left: `${leftPx}px`,
          width: `${totalPx}px`,
          transition: "left 360ms ease, width 360ms ease",
        }}/>

      <div
        className={`absolute top-6 md:top-9 h-1 -z-10 rounded-full ${colorClass}`}
        style={{
          left: `${leftPx}px`,
          width: `${Math.max(0, Math.min(totalPx, filledPx))}px`,
          transition: "left 360ms ease, width 360ms ease, background-color 240ms",
          transform: "translateY(-50%)",
        }}/>
    </>
  );
};

export default ProgressLine;
