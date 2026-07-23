import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CandidateContext } from "../context/CandidateContext";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function AddCandidate() {
  const navigate = useNavigate();

  const { addCandidate } = useContext(CandidateContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    stage: "Applied",
  });

  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (photo) {
        data.append("photo", photo);
      }

      if (resume) {
        data.append("resume", resume);
      }

      await addCandidate(data);

      alert("Candidate added successfully!");

      navigate("/recruitment");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to save candidate."
      );
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Add Candidate"
        subtitle="Create a new recruitment profile."
      />

      <Card className="p-8 max-w-5xl">

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <div>
            <label className="block mb-2 font-medium">
              Candidate Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPhoto(e.target.files[0])
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Resume (PDF)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setResume(e.target.files[0])
              }
            />
          </div>

          <div className="md:col-span-2 flex justify-end">

            <Button type="submit">
              Save Candidate
            </Button>

          </div>

        </form>

      </Card>
    </AppLayout>
  );
}

export default AddCandidate;