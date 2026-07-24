function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#C8A96A] hover:bg-yellow-600 transition-all duration-300 text-black px-6 py-3 rounded-lg font-semibold ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;