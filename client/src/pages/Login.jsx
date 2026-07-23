import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

import TonkaLogo from "../components/logo/TonkaLogo";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "admin",
        JSON.stringify(res.data.admin)
      );

      toast.success("Welcome back!");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}

        <div className="flex justify-center mb-10">
          <TonkaLogo size="lg" />
        </div>

        {/* Card */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="text-slate-500 mt-2">
              Sign in to your TONKA workspace
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Email */}

            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-4 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@tonka.com"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-4 text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-4 text-slate-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}

            <button
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-slate-800 transition font-semibold"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-[0.25em]">
              Enterprise Human Resource Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;