import { useState } from "react";
import { AiOutlineCreditCard, AiOutlineForm, AiOutlineSchedule } from "react-icons/ai";
import { GiSyringe } from "react-icons/gi";
import Stepper from "./Stepper";
import StepDetails from "./StepDetails";

const Steps = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      title: "Register",
      details:
        "Register for the vaccine campaign based on the vaccine you need. Provide accurate personal information. After registering, you'll receive a confirmation email with the registration details.",
      icon: <AiOutlineForm className="w-5 h-5" />,
      color: {
        bg: "bg-blue-600",
        border: "border-blue-600",
        text: "text-blue-600",
        bgLight: "bg-blue-50",
        borderLight: "border-blue-100",
      },
    },
    {
      title: "Payment",
      details:
        "For premium campaigns, pay the registration fee online. Free campaigns do not require payment. Double-check payment details to avoid failed transactions.",
      icon: <AiOutlineCreditCard className="w-5 h-5" />,
      color: {
        bg: "bg-green-600",
        border: "border-green-600",
        text: "text-green-600",
        bgLight: "bg-green-50",
        borderLight: "border-green-100",
      },
    },
    {
      title: "Select Vaccine",
      details:
        "Choose vaccine type, dose center, and appointment date. Check availability and confirm details. You can select multiple doses if required.",
      icon: <GiSyringe className="w-5 h-5" />,
      color: {
        bg: "bg-purple-600",
        border: "border-purple-600",
        text: "text-purple-600",
        bgLight: "bg-purple-50",
        borderLight: "border-purple-100",
      },
    },
    {
      title: "Schedule",
      details:
        "View scheduled appointments and dose history. You can reschedule upcoming doses if allowed. Keep reminders so you don't miss a dose.",
      icon: <AiOutlineSchedule className="w-5 h-5" />,
      color: {
        bg: "bg-orange-600",
        border: "border-orange-600",
        text: "text-orange-600",
        bgLight: "bg-orange-50",
        borderLight: "border-orange-100",
      },
    },
  ];

  return (
    <section className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        How to Book Your Vaccine?
      </h2>

      <div className="space-y-6">
        <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        <StepDetails steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </section>
  );
};

export default Steps;
