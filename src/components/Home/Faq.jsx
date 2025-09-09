import { useState } from "react";

const Faq = () => {
  const faqs = [
    {
      question: "What is the process of getting vaccinated?",
      answer:
        "You can register online through our website or directly at the campaign registration desk. Once registered, you can visit on the scheduled date to receive your vaccine.",
    },
    {
      question: "Who is eligible to take the vaccine?",
      answer:
        "Eligibility depends on age, health condition, and the type of vaccine. Each campaign clearly mentions the eligibility requirements.",
    },
    {
      question: "Is the vaccine safe?",
      answer:
        "Yes, all vaccines provided through VaxPlus are approved by the World Health Organization (WHO) and local health authorities. They are administered safely by trained medical staff.",
    },
    {
      question: "Are there any side effects after vaccination?",
      answer:
        "Some people may experience mild side effects such as slight fever, soreness at the injection site, or fatigue. These usually go away within a few days. Serious side effects are very rare.",
    },
    {
      question: "Do I need to register again for the next dose?",
      answer:
        "No, once you register for a vaccine series, your next dose details will be shared with you via SMS or email. You do not need to register again for follow-up doses.",
    },
  ];

  const [open, setOpen] = useState(null);

  const handleFaq = (idx) => {
    setOpen(open === idx ? null : idx);
  };

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800 mb-10 text-center px-4 sm:px-6 md:px-0">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`border-l-4 ${open === idx ? "border-blue-500" : "border-gray-300"} bg-white hover:bg-gray-50 transition-colors duration-300 rounded-r-md`}>
              <button onClick={() => handleFaq(idx)} className="w-full text-left px-4 py-3 flex justify-between items-center focus:outline-none">
                <span className="font-medium text-gray-700">{faq.question}</span>
                <span className={`transform transition-transform duration-300 ${open === idx ? "rotate-45 text-blue-500" : "text-gray-400"}`}>
                  +
                </span>
              </button>
              <div className={`px-4 overflow-hidden transition-max-height duration-500 ease-in-out ${open === idx ? "max-h-96 py-3" : "max-h-0"}`}>
                {open === idx && <p className="text-gray-600">{faq.answer}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
