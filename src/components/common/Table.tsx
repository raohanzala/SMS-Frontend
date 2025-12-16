import React from "react";

interface Column<T> {
  key: string; 
  header: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  title?: string;
  data: T[];
  columns: Column<T>[];
  selectable?: boolean;

  selectedRows?: Set<string>;
  onToggleSelect?: (id: string) => void;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

const Table = <T extends { _id: string }>({
  title,
  data,
  columns,
  selectable = false,
  selectedRows = new Set(),
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
}: TableProps<T>) => {
  
  const allSelected = selectable && data.length > 0 && data.every(item => selectedRows.has(item._id));
  const someSelected = selectable && data.some(item => selectedRows.has(item._id));

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Title */}
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {title} ({data.length})
          </h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">

          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = someSelected && !allSelected;
                    }}
                    onChange={() => {
                      if (allSelected) onDeselectAll?.();
                      else onSelectAll?.();
                    }}
                    className="h-4 w-4 cursor-pointer"
                  />
                </th>
              )}

              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${index === columns.length - 1 ? "text-center" : ""}`}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Rows */}
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(row => {
              const isSelected = selectedRows.has(row._id);

              return (
                <tr
                  key={row._id}
                  className={`hover:bg-gray-50 ${isSelected ? "bg-indigo-50" : ""}`}
                >
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect?.(row._id)}
                        className="h-4 w-4 cursor-pointer"
                      />
                    </td>
                  )}

                  {columns.map(col => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm">
                      {col.render ? col.render(row) : (row)[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;