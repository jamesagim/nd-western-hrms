import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

function AddInterview() {
  return (
    <AppLayout>
      <PageHeader
        title="Schedule Interview"
        subtitle="Create a new interview schedule"
      />

      <Card className="p-6">
        <h2 className="text-2xl font-bold">
          Add Interview
        </h2>

        <p className="text-gray-500 mt-2">
          Interview scheduling form coming next.
        </p>
      </Card>
    </AppLayout>
  );
}

export default AddInterview;