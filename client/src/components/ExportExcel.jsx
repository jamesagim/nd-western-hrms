import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportExcel({ employees }) {
  const exportToExcel = () => {
    const data = employees.map((employee) => ({
      Name: employee.name,
      Email: employee.email,
      Department: employee.department,
      Phone: employee.phone,
      Status: employee.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Employees"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, "employees.xlsx");
  };

  return (
    <button
      onClick={exportToExcel}
      className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
    >
      📥 Export to Excel
    </button>
  );
}

export default ExportExcel;