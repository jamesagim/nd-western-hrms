function Select({
  label,
  value,
  onChange,
  name,
  children,
}) {
  return (
    <div>

      {label && (
        <label className="block font-semibold mb-2 text-slate-700">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        name={name}
        className="
        w-full
        rounded-2xl
        border
        border-slate-300
        px-4
        py-3
        outline-none
        transition-all
        duration-300
        focus:ring-4
        focus:ring-blue-100
        focus:border-blue-500
        bg-white
        "
      >
        {children}
      </select>

    </div>
  );
}

export default Select;