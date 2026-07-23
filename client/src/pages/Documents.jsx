import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  getDocuments,
  deleteDocument,
} from "../services/documentService";

import { toast } from "react-toastify";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");

  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  const role = admin?.role;

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await getDocuments();

      setDocuments(res.data || []);

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this document?"
      )
    )
      return;

    try {

      await deleteDocument(id);

      toast.success(
        "Document deleted successfully."
      );

      fetchDocuments();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredDocuments =
    documents.filter((document) => {

      const employee =
        document.employee?.name?.toLowerCase() ||
        "";

      const title =
        document.title?.toLowerCase() ||
        "";

      const category =
        document.category?.toLowerCase() ||
        "";

      const searchText =
        search.toLowerCase();

      return (
        employee.includes(searchText) ||
        title.includes(searchText) ||
        category.includes(searchText)
      );

    });

  return (
    <AppLayout>

      <PageHeader
        title="Documents"
        subtitle="Manage employee documents"
        actions={
          <Link to="/upload-document">
            <Button>
              + Upload Document
            </Button>
          </Link>
        }
      />

      <Card className="p-6 mb-8">

        <input
          type="text"
          placeholder="Search employee, title or category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-xl p-3"
        />

      </Card>

      <Card className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Uploaded By
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredDocuments.map(
              (document) => (

                <tr
                  key={document._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {document.employee?.name}
                  </td>

                  <td className="p-4">
                    {document.title}
                  </td>

                  <td className="p-4">
                    {document.category}
                  </td>

                  <td className="p-4">
                    {document.uploadedBy}
                  </td>

                  <td className="p-4 flex gap-2 flex-wrap">

                    <Link
                      to={`/documents/${document._id}`}
                    >
                      <Button>
                        View
                      </Button>
                    </Link>

                    <Link
                      to={`/edit-document/${document._id}`}
                    >
                      <Button>
                        Edit
                      </Button>
                    </Link>

                    {role === "Admin" && (

                      <Button
                        onClick={() =>
                          handleDelete(
                            document._id
                          )
                        }
                      >
                        Delete
                      </Button>

                    )}

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </Card>

    </AppLayout>
  );
}

export default Documents;