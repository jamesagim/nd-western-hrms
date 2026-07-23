function DataTable({
  columns,
  children,
  emptyMessage = "No records found.",
}) {
  const hasRows = children && (
    Array.isArray(children)
      ? children.length > 0
      : true
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50 border-b border-gray-200">

            <tr>

              {columns.map((column) => (

                <th
                  key={column}
                  className="text-left px-6 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap"
                >
                  {column}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {hasRows ? (
              children
            ) : (
              <tr>

                <td
                  colSpan={columns.length}
                  className="text-center py-16 text-gray-500"
                >
                  {emptyMessage}
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DataTable;