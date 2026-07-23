import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Building2,
  BadgeCheck,
  Calendar,
  Pencil,
  ArrowLeft,
  Globe,
  User,
  Users,
  Heart,
  MapPin,
  Briefcase,
  Monitor,
  DollarSign,
  GraduationCap,
} from "lucide-react";

import { EmployeeContext } from "../context/EmployeeContext";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";

function ViewEmployee() {
  const { id } = useParams();

  const { employees } =
    useContext(EmployeeContext);

  const employee = employees.find(
    (emp) => emp._id === id
  );

  const admin = JSON.parse(
  localStorage.getItem("admin") || "{}"
);

  const role = admin?.role;

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  if (!employee) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-32">

          <h1 className="text-4xl font-bold">
            Employee Not Found
          </h1>

          <p className="text-slate-500 mt-3 mb-8">
            This employee does not exist.
          </p>

          <Link to="/employees">
            <Button>
              <div className="flex items-center gap-2">
                <ArrowLeft size={18} />
                Back to Employees
              </div>
            </Button>
          </Link>

        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <PageHeader
        title="Employee Profile"
        subtitle="Complete employee information"
        actions={
          <div className="flex gap-3">

            <Link to="/employees">
              <Button variant="secondary">
                <div className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  Back
                </div>
              </Button>
            </Link>

            {(role === "Admin" ||
              role === "HR") && (
              <Link
                to={`/edit-employee/${employee._id}`}
              >
                <Button>
                  <div className="flex items-center gap-2">
                    <Pencil size={18} />
                    Edit Employee
                  </div>
                </Button>
              </Link>
            )}

          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDEBAR */}

        <div className="space-y-6">

          <Card className="p-8 text-center">

            {employee.image ? (
              <img
                src={employee.image}
                alt={employee.name}
                className="w-44 h-44 rounded-full object-cover mx-auto border-4 border-white shadow-xl"
              />
            ) : (
              <div className="w-44 h-44 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center text-6xl font-bold mx-auto shadow-xl">
                {getInitials(employee.name)}
              </div>
            )}

            <h2 className="text-3xl font-bold mt-6">
              {employee.name}
            </h2>

            <p className="text-slate-500 mt-2">
              {employee.jobTitle || "Employee"}
            </p>

            <div className="mt-5">

              <Badge
                color={
                  employee.status === "Active"
                    ? "green"
                    : "red"
                }
              >
                {employee.status}
              </Badge>

            </div>

            <div className="mt-8 border-t pt-6 space-y-5 text-left">

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Employee ID
                </span>

                <span className="font-semibold">
                  {employee.employeeId || "N/A"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Department
                </span>

                <span className="font-semibold">
                  {employee.department}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Employment
                </span>

                <span className="font-semibold">
                  {employee.employmentType}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Manager
                </span>

                <span className="font-semibold">
                  {employee.manager || "N/A"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Salary
                </span>

                <span className="font-semibold">
                  ₦
                  {employee.salary
                    ? Number(employee.salary).toLocaleString()
                    : "0"}
                </span>
              </div>

            </div>

          </Card>        </div>

        {/* RIGHT SIDE */}

        <div className="lg:col-span-2 space-y-6">

          {/* PERSONAL INFORMATION */}

          <Card className="p-8">

            <div className="flex items-center gap-3 mb-8">

              <User className="text-blue-600" />

              <h2 className="text-2xl font-bold">
                Personal Information
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="flex gap-4">

                <Mail className="text-blue-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Email Address
                  </p>

                  <h3 className="font-semibold">
                    {employee.email}
                  </h3>

                </div>

              </div>

              <div className="flex gap-4">

                <Phone className="text-green-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Phone Number
                  </p>

                  <h3 className="font-semibold">
                    {employee.phone || "N/A"}
                  </h3>

                </div>

              </div>

              <div className="flex gap-4">

                <Users className="text-purple-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Gender
                  </p>

                  <h3 className="font-semibold">
                    {employee.gender || "N/A"}
                  </h3>

                </div>

              </div>

              <div className="flex gap-4">

                <Calendar className="text-orange-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Date of Birth
                  </p>

                  <h3 className="font-semibold">
                    {employee.dateOfBirth
                      ? new Date(
                          employee.dateOfBirth
                        ).toLocaleDateString()
                      : "N/A"}
                  </h3>

                </div>

              </div>

              <div className="flex gap-4">

                <Globe className="text-cyan-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Nationality
                  </p>

                  <h3 className="font-semibold">
                    {employee.nationality || "N/A"}
                  </h3>

                </div>

              </div>

              <div className="flex gap-4">

                <Heart className="text-pink-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Marital Status
                  </p>

                  <h3 className="font-semibold">
                    {employee.maritalStatus || "N/A"}
                  </h3>

                </div>

              </div>

              <div className="md:col-span-2 flex gap-4">

                <MapPin className="text-red-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Address
                  </p>

                  <h3 className="font-semibold">
                    {employee.address || "N/A"}
                  </h3>

                  <p className="text-slate-500 mt-2">

                    {[employee.city,
                      employee.state,
                      employee.country]
                      .filter(Boolean)
                      .join(", ") || "N/A"}

                  </p>

                </div>

              </div>

            </div>

          </Card>

          {/* EMPLOYMENT INFORMATION */}

          <Card className="p-8">

            <div className="flex items-center gap-3 mb-8">

              <Briefcase className="text-blue-600" />

              <h2 className="text-2xl font-bold">
                Employment Information
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="flex gap-4">

                <Building2 className="text-indigo-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Department
                  </p>

                  <h3 className="font-semibold">
                    {employee.department}
                  </h3>

                </div>

              </div>

              <div className="flex gap-4">

                <BadgeCheck className="text-emerald-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Job Title
                  </p>

                  <h3 className="font-semibold">
                    {employee.jobTitle || "N/A"}
                  </h3>

                </div>

              </div>

              <div className="flex gap-4">

                <Briefcase className="text-orange-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Employment Type
                  </p>

                  <h3 className="font-semibold">
                    {employee.employmentType}
                  </h3>

                </div>

              </div>

              <div className="flex gap-4">

                <Users className="text-purple-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Manager
                  </p>

                  <h3 className="font-semibold">
                    {employee.manager || "N/A"}
                  </h3>

                </div>

              </div>              <div className="flex gap-4">

                <Calendar className="text-blue-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Hire Date
                  </p>

                  <h3 className="font-semibold">
                    {employee.hireDate
                      ? new Date(
                          employee.hireDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </h3>

                </div>

              </div>

              <div className="flex gap-4">

                <MapPin className="text-red-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Office Location
                  </p>

                  <h3 className="font-semibold">
                    {employee.officeLocation || "N/A"}
                  </h3>

                </div>

              </div>

              <div className="flex gap-4">

                <DollarSign className="text-green-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Salary
                  </p>

                  <h3 className="font-semibold">
                    ₦
                    {employee.salary
                      ? Number(employee.salary).toLocaleString()
                      : "0"}
                  </h3>

                </div>

              </div>

              <div className="flex gap-4">

                <BadgeCheck className="text-emerald-600 mt-1" />

                <div>

                  <p className="text-sm text-slate-500">
                    Status
                  </p>

                  <Badge
                    color={
                      employee.status === "Active"
                        ? "green"
                        : "red"
                    }
                  >
                    {employee.status}
                  </Badge>

                </div>

              </div>

            </div>

          </Card>

          {/* EDUCATION */}

          <Card className="p-8">

            <div className="flex items-center gap-3 mb-6">

              <GraduationCap className="text-indigo-600" />

              <h2 className="text-2xl font-bold">
                Education
              </h2>

            </div>

            <p className="leading-8 text-slate-700">

              {employee.education ||
                "No education information available."}

            </p>

          </Card>

          {/* SKILLS */}

          <Card className="p-8">

            <h2 className="text-2xl font-bold mb-6">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {employee.skills ? (

                employee.skills
                  .split(",")
                  .map((skill, index) => (

                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium"
                    >
                      {skill.trim()}
                    </span>

                  ))

              ) : (

                <span className="text-slate-500">
                  No skills added.
                </span>

              )}

            </div>

          </Card>

          {/* BIOGRAPHY */}

          <Card className="p-8">

            <h2 className="text-2xl font-bold mb-6">
              Biography
            </h2>

            <p className="leading-8 text-slate-700">

              {employee.bio ||
                "No biography has been added for this employee."}

            </p>

          </Card>

          {/* EMERGENCY CONTACT */}

          <Card className="p-8">

            <h2 className="text-2xl font-bold mb-6">
              Emergency Contact
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div>

                <p className="text-sm text-slate-500">
                  Name
                </p>

                <h3 className="font-semibold mt-1">
                  {employee.emergencyName || "N/A"}
                </h3>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Relationship
                </p>

                <h3 className="font-semibold mt-1">
                  {employee.emergencyRelationship || "N/A"}
                </h3>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Phone
                </p>

                <h3 className="font-semibold mt-1">
                  {employee.emergencyPhone || "N/A"}
                </h3>

              </div>

            </div>

          </Card>          {/* SOCIAL LINKS */}

          <Card className="p-8">

            <h2 className="text-2xl font-bold mb-6">
              Social Links
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <a
                href={employee.linkedin || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 border rounded-2xl p-5 hover:bg-blue-50 transition"
              >
                <Globe
                  size={28}
                  className="text-blue-600"
                />

                <div>
                  <p className="text-sm text-slate-500">
                    LinkedIn
                  </p>

                  <p className="font-semibold">
                    {employee.linkedin
                      ? "View Profile"
                      : "Not Added"}
                  </p>
                </div>

              </a>

              <a
                href={employee.globe || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 border rounded-2xl p-5 hover:bg-slate-100 transition"
              >
                <Globe
                  size={28}
                  className="text-slate-800"
                />

                <div>
                  <p className="text-sm text-slate-500">
                    globe
                  </p>

                  <p className="font-semibold">
                    {employee.globe
                      ? "View Profile"
                      : "Not Added"}
                  </p>
                </div>

              </a>

              <a
                href={employee.website || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 border rounded-2xl p-5 hover:bg-cyan-50 transition"
              >
                <Monitor
                  size={28}
                  className="text-cyan-600"
                />

                <div>
                  <p className="text-sm text-slate-500">
                    Website
                  </p>

                  <p className="font-semibold">
                    {employee.website
                      ? "Visit Website"
                      : "Not Added"}
                  </p>
                </div>

              </a>

            </div>

          </Card>

        </div>

      </div>

    </AppLayout>
  );
}

export default ViewEmployee;