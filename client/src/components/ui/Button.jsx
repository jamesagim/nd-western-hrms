function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
}) {

  const styles =
    variant === "secondary"
      ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
      : "bg-blue-600 text-white hover:bg-blue-700";


  return (

    <button
      type={type}
      onClick={onClick}
      className={`
        px-5
        py-3
        rounded-xl
        font-semibold
        transition
        ${styles}
        ${className}
      `}
    >

      {children}

    </button>

  );

}


export default Button;