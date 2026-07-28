function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const styles =
    variant === "secondary"
      ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5
        py-3
        rounded-xl
        font-semibold
        transition
        ${styles}
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;