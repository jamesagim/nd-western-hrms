import { useContext, useState, useEffect, useRef } from "react";

import {
  Bell,
  Search,
  CalendarDays,
  Trash2,
} from "lucide-react";

import { NotificationContext } from "../context/NotificationContext";

function Navbar() {

  const admin =
    JSON.parse(localStorage.getItem("admin")) || {};

  const today =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

  const {
    notifications,
    markAsRead,
    clearNotifications,
  } = useContext(NotificationContext);

  const [open, setOpen] =
    useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (

    <header className="bg-white border-b border-gray-200 px-8 py-5">

      <div className="flex items-center justify-between">

        {/* LEFT */}

        <div>

          <h1 className="text-3xl font-bold text-slate-900">

            Welcome back, {admin.name || "Admin"}

          </h1>

          <div className="flex items-center gap-2 mt-1 text-gray-500">

            <CalendarDays size={16} />

            <span className="text-sm">

              {today}

            </span>

          </div>

        </div>





        {/* RIGHT */}

        <div className="flex items-center gap-5">

          {/* SEARCH */}

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





          {/* NOTIFICATIONS */}

          <div className="relative" ref={dropdownRef}>

            <button

              onClick={() =>
                setOpen((prev) => !prev)
              }

              className="relative w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"

            >

              <Bell
                size={20}
                className="text-slate-700"
              />

              {notifications.length > 0 && (

                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">

                  {notifications.filter((item) => !item.read).length}

                </span>

              )}

            </button>





            {open && (

              <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">

                <div className="flex items-center justify-between px-5 py-4 border-b">

                  <h2 className="font-bold">

                    Notifications

                  </h2>

                  {notifications.length > 0 && (

                    <button

                      onClick={clearNotifications}

                      className="text-red-500 hover:text-red-700"

                    >

                      <Trash2 size={18} />

                    </button>

                  )}

                </div>





                <div className="max-h-96 overflow-y-auto">

                  {notifications.length === 0 ? (

                    <div className="p-8 text-center text-gray-500">

                      No notifications

                    </div>

                  ) : (

                    notifications.map((item) => (

                      <button
                        key={item.id}
                        type="button"
                        onClick={() => markAsRead(item.id)}
                        className={`border-b px-5 py-4 text-left w-full hover:bg-gray-50 transition ${!item.read ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-100 text-blue-700">
                            <Bell size={16} />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <h3 className="font-semibold text-sm">
                                {item.title}
                              </h3>
                              {!item.read && (
                                <span className="w-2 h-2 bg-blue-600 rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {item.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(item.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </button>

                    ))

                  )}

                </div>

              </div>

            )}

          </div>





          {/* USER */}

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