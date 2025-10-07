import { useRef, useLayoutEffect, useState, useEffect } from "react";
import ProgressLine from "./ProgressLine";

const Stepper = ({ steps, currentStep, setCurrentStep }) => {
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [layout, setLayout] = useState({
    left: 0,
    totalWidth: 0,
    progressPx: 0,
  });

  const measure = () => {
    const container = containerRef.current;
    if (!container || !stepRefs.current.length) return;

    const containerRect = container.getBoundingClientRect();
    const centers = stepRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2 - containerRect.left;
    });

    const first = centers[0] ?? 0;
    const last = centers[centers.length - 1] ?? first;
    const current = centers[currentStep - 1] ?? first;

    setLayout({
      left: first,
      totalWidth: Math.max(0, last - first),
      progressPx: Math.max(0, current - first),
    });
  };

  useLayoutEffect(() => {
    measure();
    const t = setTimeout(measure, 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    measure();
  }, [currentStep, steps.length]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const activeColor = steps[currentStep - 1]?.color?.bg || "bg-blue-600";

  return (
    <div className="relative">
      <ProgressLine
        leftPx={layout.left}
        totalPx={layout.totalWidth}
        filledPx={layout.progressPx}
        colorClass={activeColor}/>

      <div ref={containerRef}
        className="flex items-center justify-between gap-4 px-2 py-3 md:py-6">
        {steps.map((step, idx) => {
          const index = idx + 1;
          const isActive = currentStep === index;
          const isDone = currentStep > index;

          return (
            <div key={step.title} ref={(el) => (stepRefs.current[idx] = el)}
              className="flex flex-col items-center min-w-0">
              <div onClick={() => setCurrentStep(index)}
                className={`relative z-10 flex items-center justify-center w-11 h-11 rounded-full border-2 cursor-pointer transition-all duration-300 
                  ${
                    isDone
                      ? `${step.color.bg} ${step.color.border} text-white shadow-lg`
                      : isActive
                      ? `bg-white ${step.color.border} ${step.color.text} shadow-md`
                      : "bg-white border-gray-200 text-gray-400"
                  } 
                  ${isActive ? "ring-2 ring-offset-1 " + step.color.bg + " ring-opacity-30" : ""}
                `}>
                {isDone ? (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className={`${isActive ? "" : "opacity-90"}`}>{step.icon}</span>
                )}
              </div>

              <span className={`mt-2 text-xs font-medium text-center max-w-[90px] truncate ${
                  isActive ? "text-gray-800" : "text-gray-500"
                }`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
