import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { EmployeeContext } from "../context/EmployeeContext";

import {
  getDocument,
  updateDocument,
} from "../services/documentService";

import { toast } from "react-toastify";

function EditDocument() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { employees } =
    useContext(EmployeeContext);

  const [formData, setFormData] = useState({

    employee: "",

    title: "",

    category: "Resume",

    fileName: "",

    fileUrl: "",

    uploadedBy: "",

    description: "",

  });

  useEffect(() => {

    loadDocument();

  }, []);

  const loadDocument = async () => {

    try {

      const res = await getDocument(id);

      setFormData({

        employee:
          res.data.employee?._id || "",

        title:
          res.data.title,

        category:
          res.data.category,

        fileName:
          res.data.fileName,

        fileUrl:
          res.data.fileUrl,

        uploadedBy:
          res.data.uploadedBy,

        description:
          res.data.description,

      });

    } catch (error) {

      console.log(error);

    }

  };

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

      await updateDocument(
        id,
        formData
      );

      toast.success(
        "Document updated successfully."
      );

      navigate("/documents");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Update failed."
      );

    }

  };

  return (

    <AppLayout>

      <PageHeader

        title="Edit Document"

        subtitle="Update employee document"

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

            >

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

              className="w-full border rounded-xl p-3"

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

              className="w-full border rounded-xl p-3"

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

              rows="5"

              name="description"

              value={formData.description}

              onChange={handleChange}

              className="w-full border rounded-xl p-3"

            />

          </div>

          <Button>

            Update Document

          </Button>

        </form>

      </Card>

    </AppLayout>

  );

}

export default EditDocument;