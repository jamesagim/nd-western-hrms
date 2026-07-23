function RecentEmployeesTable({
  employees = [],
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Employees
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Department
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {employees.map(
            (employee) => (

              <tr
                key={employee._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {employee.name}
                </td>

                <td className="p-4">
                  {employee.department}
                </td>

                <td className="p-4">
                  {employee.email}
                </td>

                <td className="p-4">
                  {employee.status}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default RecentEmployeesTable;