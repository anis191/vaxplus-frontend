import {
  FiShield,
  FiUsers,
  FiTrendingUp,
  FiClock,
  FiActivity,
  FiCheckCircle,
} from "react-icons/fi";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 px-6 md:px-12 lg:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700">
          About <span className="text-blue-500">VaxPlus</span>
        </h1>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
          VaxPlus is an advanced vaccination management system built to
          streamline vaccination booking, tracking, and reporting. Our mission
          is to empower healthcare providers and patients with smart, reliable,
          and user-friendly solutions for better healthcare management.
        </p>
        <div className="mt-8">
          <img
            src="https://via.placeholder.com/800x400"
            alt="About VaxPlus"
            className="rounded-2xl shadow-lg mx-auto"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
          <div className="p-6 bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-base">
              To simplify the vaccination process for patients and providers by
              offering a digital platform that manages scheduling, monitoring,
              and reporting with ease and security.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Our Vision</h2>
            <p className="text-gray-600 text-base">
              To become the most trusted vaccination management solution that
              contributes to global healthcare by ensuring efficiency, accuracy,
              and accessibility for all.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
            Key Features
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            VaxPlus is packed with powerful features designed to meet the needs
            of patients, doctors, and healthcare administrators.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <FeatureCard
            icon={<FiShield className="text-blue-600 text-3xl" />}
            title="Secure & Reliable"
            description="End-to-end encryption ensures patient privacy and secure healthcare data management."
          />
          <FeatureCard
            icon={<FiUsers className="text-blue-600 text-3xl" />}
            title="Patient Management"
            description="Easily manage patient records, vaccination history, and upcoming appointments."
          />
          <FeatureCard
            icon={<FiActivity className="text-blue-600 text-3xl" />}
            title="Real-time Monitoring"
            description="Track vaccine distribution and campaign progress in real time."
          />
          <FeatureCard
            icon={<FiClock className="text-blue-600 text-3xl" />}
            title="Smart Scheduling"
            description="Automated appointment booking and reminders to save time and reduce no-shows."
          />
          <FeatureCard
            icon={<FiTrendingUp className="text-blue-600 text-3xl" />}
            title="Analytics Dashboard"
            description="Comprehensive analytics and insights for data-driven decision making."
          />
          <FeatureCard
            icon={<FiCheckCircle className="text-blue-600 text-3xl" />}
            title="User-Friendly Interface"
            description="Simple, modern, and intuitive design for both patients and healthcare staff."
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
            Why Choose VaxPlus?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            With VaxPlus, you’re not just adopting a tool — you’re joining a
            platform that prioritizes security, efficiency, and patient care.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <BenefitCard text="Trusted by healthcare providers worldwide" />
            <BenefitCard text="Fast, secure, and scalable platform" />
            <BenefitCard text="Optimized for patients and providers alike" />
            <BenefitCard text="Improves vaccination campaign success rates" />
            <BenefitCard text="24/7 availability with reliable uptime" />
            <BenefitCard text="Designed with accessibility in mind" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-12 lg:px-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
          Ready to experience smarter vaccination management?
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of healthcare providers using VaxPlus to simplify
          vaccination campaigns and improve patient care.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
    <div className="flex items-center gap-3 mb-4">{icon}<h3 className="text-lg font-semibold">{title}</h3></div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// Benefit Card Component
const BenefitCard = ({ text }) => (
  <div className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition text-gray-700 font-medium text-sm">
    {text}
  </div>
);

export default AboutPage;
