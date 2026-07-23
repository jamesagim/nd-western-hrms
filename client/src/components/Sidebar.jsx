import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  CalendarCheck2,
  Clock3,
  Settings,
  LogOut,
  Briefcase,
  BadgeDollarSign,
  BarChart3,
  ChevronRight,
} from "lucide-react";

import TonkaLogo from "./logo/TonkaLogo";

function Sidebar() {
  const navigate = useNavigate();

  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  const role = admin?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
      isActive
        ? "bg-black text-white shadow-lg"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">

      {/* Logo */}

      <div className="p-7 border-b border-slate-200">

        <TonkaLogo size="md" />

      </div>

      {/* Navigation */}

      <div className="flex-1 px-5 py-6">

        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">
          Main Menu
        </p>

        <nav className="space-y-2">

          <NavLink to="/" className={linkClass}>
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={20} />
                  Dashboard
                </div>

                {!isActive && (
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />
                )}
              </>
            )}
          </NavLink>

          <NavLink to="/employees" className={linkClass}>
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <Users size={20} />
                  Employees
                </div>

                {!isActive && (
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />
                )}
              </>
            )}
          </NavLink>

          {(role === "Admin" || role === "HR") && (
            <NavLink
              to="/add-employee"
              className={linkClass}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <UserPlus size={20} />
                    Add Employee
                  </div>

                  {!isActive && (
                    <ChevronRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition"
                    />
                  )}
                </>
              )}
            </NavLink>
          )}

          <NavLink
            to="/leave-management"
            className={linkClass}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <CalendarCheck2 size={20} />
                  Leave
                </div>

                {!isActive && (
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/attendance"
            className={linkClass}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <Clock3 size={20} />
                  Attendance
                </div>

                {!isActive && (
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/recruitment"
            className={linkClass}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <Briefcase size={20} />
                  Recruitment
                </div>

                {!isActive && (
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/payroll"
            className={linkClass}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <BadgeDollarSign size={20} />
                  Payroll
                </div>

                {!isActive && (
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/performance"
            className={linkClass}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <BarChart3 size={20} />
                  Performance
                </div>

                {!isActive && (
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />
                )}
              </>
            )}
          </NavLink>

        </nav>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-200 p-5">

        <div className="bg-slate-50 rounded-2xl p-4 mb-4">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">

              {admin?.name
                ? admin.name.charAt(0).toUpperCase()
                : "A"}

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                {admin?.name || "Administrator"}
              </h3>

              <p className="text-sm text-slate-500">
                {role || "Admin"}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 mt-4">

            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

            <span className="text-sm text-green-600">
              Online
            </span>

          </div>

        </div>

        <NavLink
          to="/settings"
          className={linkClass}
        >
          <div className="flex items-center gap-3">
            <Settings size={20} />
            Settings
          </div>
        </NavLink>

        <button
          onClick={handleLogout}
          className="mt-3 w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

        <div className="text-center mt-6">

          <p className="text-xs font-semibold text-slate-600">
            TONKA Enterprise
          </p>

          <p className="text-xs text-slate-400">
            People • Process • Performance
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;