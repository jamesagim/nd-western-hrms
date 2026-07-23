function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;