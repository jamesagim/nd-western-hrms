import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Save,
  ArrowLeft,
  User,
  Briefcase,
  Building2,
  GraduationCap,
  Heart,
  Globe,
  MapPin,
} from "lucide-react";

import { EmployeeContext } from "../context/EmployeeContext";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function AddEmployee() {
  const navigate = useNavigate();

  const { addEmployee } = useContext(EmployeeContext);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Male",

    dateOfBirth: "",
    nationality: "",
    maritalStatus: "",

    address: "",
    city: "",
    state: "",
    country: "",

    department: "IT",
    jobTitle: "",
    employmentType: "Full Time",
    manager: "",
    officeLocation: "",
    hireDate: "",
    salary: "",

    education: "",
    skills: "",
    bio: "",

    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",

    linkedin: "",
    github: "",
    website: "",

    status: "Active",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email
    ) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      const employee = new FormData();

      Object.keys(formData).forEach((key) => {
        employee.append(key, formData[key]);
      });

      employee.append(
        "name",
        `${formData.firstName} ${formData.lastName}`
      );

      if (image) {
        employee.append("image", image);
      }

      await addEmployee(employee);

      navigate("/employees");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to create employee."
      );
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Create Employee"
        subtitle="Register a new employee in the organization."
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >        {/* ==========================
            PERSONAL INFORMATION
        ========================== */}

        <Card className="p-8">

          <div className="flex items-center gap-3 mb-8">

            <User className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Personal Information
            </h2>

          </div>

          <div className="grid lg:grid-cols-4 gap-8">

            {/* Photo */}

            <div className="flex flex-col items-center">

              <div className="w-40 h-40 rounded-full border-2 border-dashed border-slate-300 overflow-hidden flex items-center justify-center bg-slate-50">

                {preview ? (
                  <img
                    src={preview}
                    alt="Employee"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload
                    size={45}
                    className="text-slate-400"
                  />
                )}

              </div>

              <label className="mt-6">

                <span className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
                  Upload Photo
                </span>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />

              </label>

            </div>

            {/* Personal Form */}

            <div className="lg:col-span-3">

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="block mb-2 font-medium">
                    Employee ID
                  </label>

                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="EMP-1001"
                    className="w-full border rounded-xl px-4 py-3"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>

                </div>

                <div>

                  <label className="block mb-2 font-medium">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                    required
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                    required
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                    required
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234..."
                    className="w-full border rounded-xl px-4 py-3"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium">
                    Nationality
                  </label>

                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="Nigerian"
                    className="w-full border rounded-xl px-4 py-3"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium">
                    Marital Status
                  </label>

                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  >
                    <option value="">Select</option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                  </select>

                </div>

              </div>

            </div>

          </div>

        </Card>        {/* ==========================
            ADDRESS INFORMATION
        ========================== */}

        <Card className="p-8">

          <div className="flex items-center gap-3 mb-8">

            <MapPin className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Address Information
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="md:col-span-2">

              <label className="block mb-2 font-medium">
                Home Address
              </label>

              <textarea
                rows="3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter residential address"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Warri"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Delta"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Nigeria"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

          </div>

        </Card>

        {/* ==========================
            EMPLOYMENT INFORMATION
        ========================== */}

        <Card className="p-8">

          <div className="flex items-center gap-3 mb-8">

            <Briefcase className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Employment Information
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-medium">
                Department
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>IT</option>
                <option>HR</option>
                <option>SMC</option>
                <option>TD</option>
                <option>Engineering</option>
                <option>Audit</option>
                <option>Legal</option>
              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Job Title
              </label>

              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Software Engineer"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Employment Type
              </label>

              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
                <option>Intern</option>
              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Manager
              </label>

              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                placeholder="Manager Name"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Hire Date
              </label>

              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Office Location
              </label>

              <input
                type="text"
                name="officeLocation"
                value={formData.officeLocation}
                onChange={handleChange}
                placeholder="Head Office"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Salary
              </label>

              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="500000"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

            </div>

          </div>

        </Card>        {/* ==========================
            PROFESSIONAL INFORMATION
        ========================== */}

        <Card className="p-8">

          <div className="flex items-center gap-3 mb-8">

            <GraduationCap className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Professional Information
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-medium">
                Education
              </label>

              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="B.Sc Computer Engineering"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, Java, Python..."
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="block mb-2 font-medium">
                Professional Bio
              </label>

              <textarea
                rows="5"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write a short professional biography..."
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

          </div>

        </Card>

        {/* ==========================
            EMERGENCY CONTACT
        ========================== */}

        <Card className="p-8">

          <div className="flex items-center gap-3 mb-8">

            <Heart className="text-red-500" />

            <h2 className="text-2xl font-bold">
              Emergency Contact
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div>

              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Relationship
              </label>

              <input
                type="text"
                name="emergencyRelationship"
                value={formData.emergencyRelationship}
                onChange={handleChange}
                placeholder="Brother, Mother, Friend..."
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="text"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                placeholder="+234..."
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

          </div>

        </Card>        {/* ==========================
            SOCIAL LINKS
        ========================== */}

        <Card className="p-8">

          <div className="flex items-center gap-3 mb-8">

            <Globe className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Social Links
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div>

              <label className="block mb-2 font-medium">
                LinkedIn
              </label>

              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                GitHub
              </label>

              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Website
              </label>

              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

          </div>

        </Card>

        {/* ==========================
            ACTION BUTTONS
        ========================== */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex justify-between items-center">

          <Button
            type="button"
            onClick={() => navigate("/employees")}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800"
          >

            <div className="flex items-center gap-2">

              <ArrowLeft size={18} />

              Cancel

            </div>

          </Button>

          <Button type="submit">

            <div className="flex items-center gap-2">

              <Save size={18} />

              Save Employee

            </div>

          </Button>

        </div>      </form>

    </AppLayout>

  );
}

export default AddEmployee;