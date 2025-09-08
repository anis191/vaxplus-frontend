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
      details: "Register for the vaccine campaign based on the vaccine you need. Make sure you provide accurate personal information to avoid issues later. After registering, you will receive a confirmation email with your registration details.", 
      icon: <AiOutlineForm className="w-6 h-6" />, 
      color: { bg: "bg-blue-600", border: "border-blue-600", text: "text-blue-600", bgLight: "bg-blue-50", borderLight: "border-blue-500" }
    },
    { 
      title: "Payment", 
      details: "For premium campaigns, pay the registration fee online using a secure payment gateway. Free campaigns do not require payment. Ensure your payment details are correct to avoid failed transactions.", 
      icon: <AiOutlineCreditCard className="w-6 h-6" />, 
      color: { bg: "bg-green-600", border: "border-green-600", text: "text-green-600", bgLight: "bg-green-50", borderLight: "border-green-500" }
    },
    { 
      title: "Select Vaccine", 
      details: "Choose the vaccine type, dose center, and date for your appointment. Check availability and confirm the details before finalizing your selection. You can also select multiple doses if needed.", 
      icon: <GiSyringe className="w-6 h-6" />, 
      color: { bg: "bg-purple-600", border: "border-purple-600", text: "text-purple-600", bgLight: "bg-purple-50", borderLight: "border-purple-500" }
    },
    { 
      title: "Schedule", 
      details: "View your scheduled appointments and history of doses already taken. You can reschedule upcoming doses if allowed by the campaign. Keep track of reminders to ensure you never miss a dose.", 
      icon: <AiOutlineSchedule className="w-6 h-6" />, 
      color: { bg: "bg-orange-600", border: "border-orange-600", text: "text-orange-600", bgLight: "bg-orange-50", borderLight: "border-orange-500" }
    },
  ];
    return (
      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 text-center px-4 sm:px-6 md:px-0">
            How to Book Your Vaccine?
        </h2>
        <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep}/>
        <StepDetails steps={steps} currentStep={currentStep}/>
      </div>
    );
};

export default Steps;