import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { getDocument } from "../services/documentService";

function ViewDocument() {

  const { id } = useParams();

  const [document, setDocument] = useState(null);

  useEffect(() => {
    loadDocument();
  }, []);

  const loadDocument = async () => {

    try {

      const res = await getDocument(id);

      setDocument(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!document) {

    return (

      <AppLayout>

        <div className="p-10">

          Loading...

        </div>

      </AppLayout>

    );

  }

  return (

    <AppLayout>

      <PageHeader

        title="Document Details"

        subtitle={document.title}

      />

      <Card className="max-w-5xl mx-auto p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>

            <h3 className="font-bold mb-2">

              Employee

            </h3>

            <p>

              {document.employee?.name}

            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">

              Department

            </h3>

            <p>

              {document.employee?.department}

            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">

              Email

            </h3>

            <p>

              {document.employee?.email}

            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">

              Category

            </h3>

            <p>

              {document.category}

            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">

              File Name

            </h3>

            <p>

              {document.fileName}

            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">

              Uploaded By

            </h3>

            <p>

              {document.uploadedBy}

            </p>

          </div>

        </div>

        <div className="mt-8">

          <h3 className="font-bold mb-2">

            Description

          </h3>

          <p className="text-gray-700">

            {document.description || "No description"}

          </p>

        </div>

        <div className="mt-10 flex gap-4 flex-wrap">

          <a

            href={document.fileUrl}

            target="_blank"

            rel="noopener noreferrer"

          >

            <Button>

              Open Document

            </Button>

          </a>

          <a

            href={document.fileUrl}

            download

          >

            <Button>

              Download

            </Button>

          </a>

          <Button

            onClick={() => window.print()}

          >

            Print

          </Button>

        </div>

      </Card>

    </AppLayout>

  );

}

export default ViewDocument;