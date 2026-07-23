import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function PerformanceExportPDF({ performance }) {
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(
      "Performance Report",
      14,
      20
    );

    autoTable(doc, {
      startY: 30,

      head: [[
        "Employee",
        "Department",
        "Review",
        "Rating",
        "Goals"
      ]],

      body: performance.map((record) => [
        record.employee?.name,
        record.employee?.department,
        record.reviewPeriod,
        record.rating,
        record.goalsCompleted,
      ]),
    });

    doc.save("Performance_Report.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
    >
      Export PDF
    </button>
  );
}

export default PerformanceExportPDF;