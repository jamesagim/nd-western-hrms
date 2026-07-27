import { useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

function EditInterview() {

  const { id } = useParams();

  return (

    <AppLayout>

      <PageHeader
        title="Edit Interview"
        subtitle="Update interview information"
      />

      <Card className="p-6">

        <h2 className="text-2xl font-bold">
          Edit Interview
        </h2>

        <p className="text-gray-500 mt-2">
          Interview ID:
        </p>

        <p className="font-semibold">
          {id}
        </p>

        <p className="text-gray-500 mt-6">
          Interview editing form coming next.
        </p>

      </Card>

    </AppLayout>

  );

}

export default EditInterview;