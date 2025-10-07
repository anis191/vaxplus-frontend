const StepDetails = ({ steps, currentStep, setCurrentStep }) => {
  const step = steps[currentStep - 1];

  return (
    <div className="mt-4">
      <div
        className={`relative overflow-hidden rounded-lg border ${step.color.borderLight} ${step.color.bgLight} p-5 shadow-sm transition-all duration-300`}
        style={{ borderWidth: 1 }}>
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${step.color.bg} opacity-95`} />

        <div className="ml-4 md:ml-6 flex flex-col md:flex-row gap-4">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${step.color.bg} text-white border-2 ${step.color.border}`}>
            {step.icon}
          </div>

          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${step.color.text}`}>{step.title}</h3>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed">{step.details}</p>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                className="px-3 py-1 rounded-md border bg-white text-sm text-gray-700 hover:shadow-sm disabled:opacity-50"
                disabled={currentStep === 1}>
                Previous
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                className={`${step.color.bg} text-white px-3 py-1 text-sm rounded-md hover:brightness-95`}>
                {currentStep === steps.length ? "Finish" : "Next"}
              </button>

              <span className="ml-auto text-xs text-gray-500">
                Step {currentStep} of {steps.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepDetails;


