import * as XLSX from "xlsx";

function PerformanceExportExcel({ performance }) {
  const exportExcel = () => {
    const data = performance.map((record) => ({
      Employee: record.employee?.name,
      Department: record.employee?.department,
      ReviewPeriod: record.reviewPeriod,
      Rating: record.rating,
      GoalsCompleted: record.goalsCompleted,
      ManagerComment: record.managerComment,
      EmployeeComment: record.employeeComment,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Performance"
    );

    XLSX.writeFile(
      workbook,
      "Performance_Report.xlsx"
    );
  };

  return (
    <button
      onClick={exportExcel}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >
      Export Excel
    </button>
  );
}

export default PerformanceExportExcel;