import {
  Bell,
  Search,
  CalendarDays,
} from "lucide-react";

function Navbar() {
  const admin =
    JSON.parse(localStorage.getItem("admin")) || {};

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-5">

      <div className="flex items-center justify-between">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back,
            {" "}
            {admin.name || "Admin"}
          </h1>

          <div className="flex items-center gap-2 mt-1 text-gray-500">

            <CalendarDays size={16} />

            <span className="text-sm">
              {today}
            </span>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="relative hidden md:block">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-72 bg-gray-100 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            />

          </div>

          {/* Notification */}

          <button className="relative w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center">

            <Bell
              size={20}
              className="text-slate-700"
            />

            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-orange-500"></span>

          </button>

          {/* User */}

          <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2">

            <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">

              {(admin.name || "A")
                .charAt(0)
                .toUpperCase()}

            </div>

            <div>

              <p className="font-semibold text-slate-900">

                {admin.name || "Administrator"}

              </p>

              <p className="text-xs text-gray-500">

                {admin.role || "Admin"}

              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;