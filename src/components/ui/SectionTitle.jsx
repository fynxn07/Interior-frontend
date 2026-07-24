function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <p className="text-[#C8A96A] uppercase tracking-widest">
        {subtitle}
      </p>

      <h2 className="text-4xl font-bold text-white mt-2">
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;