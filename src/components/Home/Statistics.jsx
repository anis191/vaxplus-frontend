import { FaUsers, FaSyringe, FaCalendarCheck, FaHospitalUser } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const Statistics = () => {
  const stats = [
    {
      id: 1,
      value: "35",
      label: "Successful Campaigns",
      icon: <FaCalendarCheck className="w-6 h-6 text-purple-600 ml-2 inline" />,
    },
    {
      id: 2,
      value: "2K+",
      label: "Registered Users",
      icon: <FaUsers className="w-6 h-6 text-blue-600 ml-2 inline" />,
    },
    {
      id: 3,
      value: "9K+",
      label: "Vaccines Distributed",
      icon: <FaSyringe className="w-6 h-6 text-green-600 ml-2 inline" />,
    },
    {
      id: 4,
      value: "48+",
      label: "Doctors Available",
      icon: <FaHospitalUser className="w-6 h-6 text-pink-600 ml-2 inline" />,
    },
  ];

  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (hasAnimated) {
      stats.forEach((stat, index) => {
        let start = 0;
        const numericValue = parseInt(stat.value.replace(/\D/g, "")) || 0;
        const duration = 1000;
        const increment = numericValue / (duration / 50);

        const counter = setInterval(() => {
          start += increment;
          if (start >= numericValue) {
            start = numericValue;
            clearInterval(counter);
          }
          setAnimatedValues((prev) => {
            const newValues = [...prev];
            newValues[index] = Math.floor(start);
            return newValues;
          });
        }, 50);
      });
    }
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="mt-8 max-w-5xl mx-auto p-6 bg-gray-800 text-gray-100">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Our Impact in Numbers
        </h2>
        <p className="text-sm sm:text-base text-blue-100/80">
          See how we’re making a difference in vaccination and healthcare
        </p>
      </div>

      <div className="container mx-auto grid justify-center grid-cols-2 text-center md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const suffix = stat.value.replace(/\d/g, "");
          return (
            <div key={stat.id}
              className="flex flex-col justify-start m-2 lg:m-4 transform transition duration-700 hover:scale-105"
              style={{ animationDelay: `${index * 0.2}s` }}>
              <p className={`text-4xl font-bold leading-none lg:text-5xl opacity-0 ${
                  hasAnimated ? "animate-fadeIn" : ""}`}>
                {animatedValues[index]}
                {suffix} {stat.icon}
              </p>
              <p className="text-sm sm:text-base mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Statistics;
