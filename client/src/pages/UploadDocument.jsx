import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { EmployeeContext } from "../context/EmployeeContext";

import { createDocument } from "../services/documentService";

import { toast } from "react-toastify";

function UploadDocument() {

  const navigate = useNavigate();

  const { employees } =
    useContext(EmployeeContext);

  const [formData, setFormData] = useState({

    employee: "",

    title: "",

    category: "Resume",

    fileName: "",

    fileUrl: "",

    uploadedBy: "HR",

    description: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createDocument(
        formData
      );

      toast.success(
        "Document uploaded successfully."
      );

      navigate("/documents");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to upload document."
      );

    }

  };

  return (

    <AppLayout>

      <PageHeader

        title="Upload Document"

        subtitle="Upload employee documents"

      />

      <Card className="max-w-4xl mx-auto p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 font-semibold">
              Employee
            </label>

            <select

              name="employee"

              value={formData.employee}

              onChange={handleChange}

              className="w-full border rounded-xl p-3"

              required

            >

              <option value="">
                Select Employee
              </option>

              {employees.map((employee)=>(

                <option

                  key={employee._id}

                  value={employee._id}

                >

                  {employee.name}

                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Document Title
            </label>

            <input

              type="text"

              name="title"

              value={formData.title}

              onChange={handleChange}

              className="w-full border rounded-xl p-3"

              placeholder="Employment Contract"

              required

            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Category
            </label>

            <select

              name="category"

              value={formData.category}

              onChange={handleChange}

              className="w-full border rounded-xl p-3"

            >

              <option value="Resume">
                Resume
              </option>

              <option value="Contract">
                Contract
              </option>

              <option value="Offer Letter">
                Offer Letter
              </option>

              <option value="Certificate">
                Certificate
              </option>

              <option value="ID Card">
                ID Card
              </option>

              <option value="Passport">
                Passport
              </option>

              <option value="Medical">
                Medical
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              File Name
            </label>

            <input

              type="text"

              name="fileName"

              value={formData.fileName}

              onChange={handleChange}

              placeholder="contract.pdf"

              className="w-full border rounded-xl p-3"

              required

            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              File URL
            </label>

            <input

              type="text"

              name="fileUrl"

              value={formData.fileUrl}

              onChange={handleChange}

              placeholder="https://..."

              className="w-full border rounded-xl p-3"

              required

            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Uploaded By
            </label>

            <input

              type="text"

              name="uploadedBy"

              value={formData.uploadedBy}

              onChange={handleChange}

              className="w-full border rounded-xl p-3"

            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea

              name="description"

              value={formData.description}

              onChange={handleChange}

              rows="5"

              className="w-full border rounded-xl p-3"

              placeholder="Additional information..."

            />

          </div>

          <Button>

            Upload Document

          </Button>

        </form>

      </Card>

    </AppLayout>

  );

}

export default UploadDocument;