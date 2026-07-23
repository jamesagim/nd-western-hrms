import * as XLSX from "xlsx";

function AttendanceExportExcel({ attendance }) {
  const exportFile = () => {
    const data = attendance.map((record) => ({
      Employee: record.employee?.name,
      Department: record.employee?.department,
      Date: record.date,
      ClockIn: record.clockIn,
      ClockOut: record.clockOut || "-",
      Status: record.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Attendance"
    );

    XLSX.writeFile(
      workbook,
      "Attendance_Report.xlsx"
    );
  };

  return (
    <button
      onClick={exportFile}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
    >
      Export Excel
    </button>
  );
}

export default AttendanceExportExcel;