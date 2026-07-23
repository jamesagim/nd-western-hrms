import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ employees }) {
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Employee Management Report", 14, 20);

    doc.setFontSize(11);
    doc.text(
      `Generated: ${new Date().toLocaleDateString()}`,
      14,
      28
    );

    const tableData = employees.map((employee) => [
      employee.name,
      employee.email,
      employee.department,
      employee.phone,
      employee.status,
    ]);

    autoTable(doc, {
      head: [
        [
          "Name",
          "Email",
          "Department",
          "Phone",
          "Status",
        ],
      ],
      body: tableData,
      startY: 35,
    });

    doc.save("Employee_Report.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
    >
      📄 Export PDF
    </button>
  );
}

export default ExportPDF;