// import React from 'react';

const StepDetails = ({steps, currentStep}) => {
    return (
        <div>
            {steps.map((step, i)=> i + 1 === currentStep && (
              <div key={i} className={`p-4 border rounded-md ${step.color.bgLight} ${step.color.borderLight}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step.color.bg} text-white border-2 ${step.color.border}`}>
                    {step.icon}
                  </div>
                  <h3 className={`font-semibold ${step.color.text} text-base`}>{step.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-700">{step.details}</p>
              </div>
            ))}
        </div>
    );
};

export default StepDetails;