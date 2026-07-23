function LoadingSpinner({
  size = 90,
  text = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div
        className="relative"
        style={{
          width: size,
          height: size,
        }}
      >
        {/* Rotating Arcs */}

        <svg
          className="absolute inset-0 animate-tonka-spin"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="35 53"
            transform="rotate(0 50 50)"
          />

          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="35 53"
            transform="rotate(120 50 50)"
          />

          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="35 53"
            transform="rotate(240 50 50)"
          />
        </svg>

        {/* Static Circle */}

        <div className="absolute inset-[14px] rounded-full border-2 border-gray-200"></div>

        {/* Static T */}

        <div className="absolute inset-0 flex items-center justify-center">
          <span
            style={{
              fontSize: size * 0.45,
            }}
            className="font-black text-black select-none tracking-tight"
          >
            T
          </span>
        </div>
      </div>

      <p className="mt-8 text-gray-500 font-medium tracking-wide">
        {text}
      </p>
    </div>
  );
}

export default LoadingSpinner;