import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createUser } from "../services/userService";
import { toast } from "react-toastify";

function AddUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Manager",
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
      await createUser(formData);

      toast.success("User created successfully!");

      navigate("/users");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create user"
      );
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8 max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-8">

            <h1 className="text-3xl font-bold mb-8">
              Create New User
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="font-semibold block mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                >
                  <option>Admin</option>
                  <option>HR</option>
                  <option>Manager</option>
                </select>
              </div>

              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Create User
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;