function RecentLeavesTable({
  leaves = [],
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Recent Leave Requests
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="p-4 text-left">
              Employee
            </th>

            <th className="p-4 text-left">
              Leave Type
            </th>

            <th className="p-4 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {leaves.map(
            (leave) => (

              <tr
                key={leave._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {leave.employee?.name}
                </td>

                <td className="p-4">
                  {leave.leaveType}
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-white
                      ${
                        leave.status === "Approved"
                          ? "bg-green-600"
                          : leave.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }
                    `}
                  >
                    {leave.status}
                  </span>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default RecentLeavesTable;