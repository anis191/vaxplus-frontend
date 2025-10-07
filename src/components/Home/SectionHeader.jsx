const SectionHeaderE = () => {
  return (
    <div className="max-w-[1200px] mx-auto my-6 px-4 md:px-0 text-left">
      <p
        className="font-semibold font-serif text-[#1A3B6B] tracking-tight"
        style={{ fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.75rem)' }}>
        VaxPlus Vaccination Organization
      </p>

      <h3
        className="relative mt-1 font-bold border-l-4 border-sky-500 pl-2 inline-block text-sky-700 overflow-hidden"
        style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.5rem, 1.5rem)' }}>
        <span className="text-[#1A3B6B]">Vax</span>
        <span className="text-[#2BA8FF]">Plus</span>{" "}
        <span className="text-[#1A3B6B]">Highlights</span>

        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-diamondSheen"></span>
      </h3>
    </div>
  );
};

export default SectionHeaderE;
