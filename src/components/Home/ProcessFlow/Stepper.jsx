import ProgressLine from "./ProgressLine";

const Stepper = ({steps, currentStep, setCurrentStep}) => {
    return (
        <div className="flex justify-between relative mb-6 overflow-x-auto">
            <ProgressLine totalSteps={steps.length} currentStep={currentStep}/>

          {steps.map((step, i) => {
            const isActive = currentStep === i + 1;
            const isDone = currentStep > i + 1;
            return (
              <div key={i} className="flex flex-col items-center cursor-pointer min-w-[70px]" 
                onClick={() => setCurrentStep(i + 1)}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
                  ${isActive || isDone ? `${step.color.bg} ${step.color.border} text-white` : "bg-white border-gray-300 text-gray-400"}`}>
                  {step.icon}
                </div>
                <span className={`mt-2 text-sm font-medium ${isActive ? step.color.text : "text-gray-500"} text-center`}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
    );
};

export default Stepper;