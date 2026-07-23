function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
}) {
  return (
    <div>

      {label && (
        <label className="block font-semibold mb-2 text-slate-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
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
        "
      />

    </div>
  );
}

export default Input;