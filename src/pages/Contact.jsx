import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiSend,
  FiUser,
} from "react-icons/fi";

const ContactPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <section className="text-center py-16 px-6 md:px-12 lg:px-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700">
          Contact <span className="text-blue-500">Us</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Have questions about VaxPlus? We’re here to help! Get in touch with
          our support team and we’ll respond as quickly as possible.
        </p>
      </section>

      {/* Contact Info */}
      <section className="px-6 md:px-12 lg:px-20 pb-16">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          <InfoCard
            icon={<FiPhone className="text-blue-600 text-3xl" />}
            title="Phone"
            detail="+1 (234) 567-890"
          />
          <InfoCard
            icon={<FiMail className="text-blue-600 text-3xl" />}
            title="Email"
            detail="support@vaxplus.com"
          />
          <InfoCard
            icon={<FiMapPin className="text-blue-600 text-3xl" />}
            title="Location"
            detail="123 Healthcare Ave, City, Country"
          />
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2">
          {/* Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Send us a Message
            </h2>
            <form className="space-y-5">
              <div className="flex items-center gap-3 border rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-300">
                <FiUser className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-3 border rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-300">
                <FiMail className="text-gray-500" />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-3 border rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-300">
                <FiSend className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full outline-none text-sm"
                />
              </div>
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border rounded-lg p-3 outline-none text-sm focus:ring-2 focus:ring-blue-300"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map / Illustration */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="VaxPlus Location"
              src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[400px]"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact Info Card
const InfoCard = ({ icon, title, detail }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm mt-1">{detail}</p>
  </div>
);

export default ContactPage;
