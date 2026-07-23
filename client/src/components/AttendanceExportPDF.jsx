import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function AttendanceExportPDF({ attendance }) {
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Attendance Report", 14, 20);

    autoTable(doc, {
      startY: 30,

      head: [
        [
          "Employee",
          "Department",
          "Date",
          "Clock In",
          "Clock Out",
          "Status",
        ],
      ],

      body: attendance.map((record) => [
        record.employee?.name,
        record.employee?.department,
        record.date,
        record.clockIn,
        record.clockOut || "-",
        record.status,
      ]),
    });

    doc.save("Attendance_Report.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
    >
      Export PDF
    </button>
  );
}

export default AttendanceExportPDF;