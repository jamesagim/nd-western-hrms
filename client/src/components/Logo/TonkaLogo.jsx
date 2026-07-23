function TonkaLogo({ size = "md" }) {
  const sizes = {
    sm: {
      logo: "w-11 h-11",
      t: "text-xl",
      title: "text-xl",
      subtitle: "text-[10px]",
    },
    md: {
      logo: "w-14 h-14",
      t: "text-3xl",
      title: "text-2xl",
      subtitle: "text-xs",
    },
    lg: {
      logo: "w-20 h-20",
      t: "text-5xl",
      title: "text-4xl",
      subtitle: "text-sm",
    },
  };

  const current = sizes[size];

  return (
    <div className="flex items-center gap-4">
      {/* Logo */}

      <div className={`relative ${current.logo}`}>
        {/* Outer Ring */}

        <div className="absolute inset-0 rounded-full border-[4px] border-black"></div>

        {/* Inner Circle */}

        <div className="absolute inset-[6px] rounded-full bg-black flex items-center justify-center shadow-lg">
          <span
            className={`${current.t} font-black text-white leading-none`}
          >
            T
          </span>
        </div>
      </div>

      {/* Text */}

      <div>
        <h1
          className={`${current.title} font-black tracking-tight text-black`}
        >
          TONKA
        </h1>

        <p
          className={`${current.subtitle} uppercase tracking-[0.4em] text-gray-500`}
        >
          Enterprise HR
        </p>
      </div>
    </div>
  );
}

export default TonkaLogo;