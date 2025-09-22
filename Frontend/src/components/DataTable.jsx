import { useState, useEffect, useMemo, useCallback } from 'react';
import Select from 'react-select';

const formatOptions = [
  { value: 'excel', label: 'Excel' },
  { value: 'pdf', label: 'PDF' },
  { value: 'csv', label: 'CSV' },
];

const DataTable = ({
  data = [],
  actions, columns, columnRenderers = {},
  onReload,
  selectedRows: propSelectedRows,
  onSelectedRowsChange,
  selectedColumns: propSelectedColumns,
  onSelectedColumnsChange,
  selectedFormat: propSelectedFormat,
  onSelectedFormatChange
}) => {
  const [internalSelectedRows, setInternalSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [internalSelectedColumns, setInternalSelectedColumns] = useState([]);
  const [internalSelectedFormat, setInternalSelectedFormat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [openActionIndex, setOpenActionIndex] = useState(null); // track which row actions are open

  const selectedRows = propSelectedRows ?? internalSelectedRows;
  const selectedColumns = propSelectedColumns ?? internalSelectedColumns;
  const selectedFormat = propSelectedFormat ?? internalSelectedFormat;

  const handleSelectAll = (checked, pageRows) => {
    setSelectAll(checked);
    const pageIndices = pageRows.map((_, idx) => (currentPage - 1) * pageSize + idx);
    const newSelected = checked
      ? [...new Set([...selectedRows, ...pageIndices])]
      : selectedRows.filter((i) => !pageIndices.includes(i));
    onSelectedRowsChange ? onSelectedRowsChange(newSelected) : setInternalSelectedRows(newSelected);
  };

  const handleSelectRow = (index, checked) => {
    const newSelected = checked
      ? [...selectedRows, index]
      : selectedRows.filter((i) => i !== index);
    if (!checked) setSelectAll(false);
    onSelectedRowsChange ? onSelectedRowsChange(newSelected) : setInternalSelectedRows(newSelected);
  };

  const handleColumnsChange = (value) => {
    onSelectedColumnsChange ? onSelectedColumnsChange(value) : setInternalSelectedColumns(value);
  };

  const handleFormatChange = (value) => {
    onSelectedFormatChange ? onSelectedFormatChange(value) : setInternalSelectedFormat(value);
  };

  const getStatusBadgeClass = (status) => {
    const map = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      available: 'bg-green-100 text-green-800',
      leased: 'bg-blue-100 text-blue-800',
      suspended: 'bg-yellow-100 text-yellow-800',
      redevelopment: 'bg-red-100 text-red-800',
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-blue-100 text-blue-800',
      rejected: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return map[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getSmartColumnConfig = useCallback((key, sampleValue) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('id') || lowerKey === 'code' || lowerKey === 'ref')
      return { render: (v) => <a href="#" className="text-blue-800 font-bold hover:underline">{v}</a> };
    if (lowerKey.includes('status') || lowerKey.includes('state'))
      return { render: (v) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(v)}`}>{v}</span> };
    if (
      lowerKey.includes('price') || lowerKey.includes('amount') ||
      lowerKey.includes('total') || lowerKey.includes('cost') ||
      (typeof sampleValue === 'string' && sampleValue?.includes('$'))
    )
      return { render: (v) => <span className="text-blue-800 font-bold">{v}</span> };
    if (lowerKey.includes('email') || (typeof sampleValue === 'string' && sampleValue?.includes('@')))
      return { render: (v) => <a href={`mailto:${v}`} className="text-blue-600 hover:underline">{v}</a> };
    if (lowerKey.includes('phone') || lowerKey.includes('tel'))
      return { render: (v) => <span className="text-gray-700">{v}</span> };
    if (lowerKey.includes('date') || lowerKey.includes('time') || lowerKey.includes('created') || lowerKey.includes('updated'))
      return { render: (v) => <span className="text-gray-500 font-semibold">{v}</span> };
    if (lowerKey.includes('name') || lowerKey.includes('title'))
      return { render: (v) => <span className="text-blue-800 font-bold">{v}</span> };
    if (lowerKey.includes('description') || lowerKey.includes('note') || lowerKey.includes('comment') || lowerKey.includes('detail'))
      return {
        className: 'min-w-[200px]',
        render: (v) => <span className="text-gray-500 text-sm">{v?.length > 50 ? `${v.substring(0, 50)}...` : v}</span>,
      };
    return { render: (v) => <span>{v}</span> };
  }, []);

  const processedColumns = useMemo(() => {
    if (!data.length) return [];
    if (!columns || Object.keys(columns).length === 0) return [];

    return Object.keys(columns).map((key) => {
      const sampleValue = data[0][key];

      // ✅ If parent provided a custom renderer, use it
      if (columnRenderers && columnRenderers[key]) {
        return {
          key,
          header: columns[key] || key,
          render: (value, row, rowIndex) =>
            columnRenderers[key](value, row, rowIndex),
          className: "min-w-[120px]",
        };
      }

      // ✅ Otherwise fall back to smart defaults
      const smart = getSmartColumnConfig(key, sampleValue);
      return {
        key,
        header: columns[key] || key,
        className: smart.className || "min-w-[120px]",
        ...smart,
      };
    });
  }, [data, getSmartColumnConfig, columns, columnRenderers]);



  const columnOptions = useMemo(() => {
    if (!processedColumns.length) return [];
    return [{ value: 'all', label: 'All Columns' }, ...processedColumns.map((col) => ({ value: col.key, label: col.header }))];
  }, [processedColumns]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data.sort();
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);


  const totalPages = Math.ceil(filteredData.length / pageSize);
  const currentPageData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  return (
    <div className="mt-1">
      {/* Search + buttons */}
      <div className="border-0 pt-6 mb-7 flex justify-between items-center flex-wrap gap-3">
        <div className="flex items-center relative w-full sm:w-auto">
          <svg className="w-5 h-5 absolute left-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80"
            placeholder="Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            className="bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-900 transition-colors"
            onClick={() => setIsExportModalOpen(true)}
          >
            Export
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center hover:bg-gray-300 transition-colors"
            onClick={onReload}
          >
            Reload
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto h-auto ">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  className="h-4 w-4 text-blue-800 rounded"
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked, currentPageData)}
                />
              </th>
              {processedColumns.map((col, i) => (
                <th key={i} className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {currentPageData.length > 0 ? (
              currentPageData.map((row, rowIndex) => {
                const globalIndex = (currentPage - 1) * pageSize + rowIndex;
                const isOpen = openActionIndex === globalIndex;
                return (
                  <tr key={globalIndex} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        className="h-4 w-4 text-blue-800 rounded"
                        type="checkbox"
                        checked={selectedRows.includes(globalIndex)}
                        onChange={(e) => handleSelectRow(globalIndex, e.target.checked)}
                      />
                    </td>
                    {processedColumns.map((col, i) => (
                      <td key={i} className="px-4 py-3 whitespace-nowrap">
                        {col.render ? col.render(row[col.key], row, globalIndex) : row[col.key]}
                      </td>
                    ))}

                    {actions && (
                      <td className="px-4 py-3 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setOpenActionIndex(isOpen ? null : globalIndex)}
                            className="px-3 py-1 border rounded-md bg-white text-gray-700 hover:bg-gray-50"
                          >
                            Actions
                          </button>

                          {/* Dropdown */}
                          <div
                            className={`absolute z-50 right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 origin-top-right 
                              ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                              }`}>
                            <div className="py-1">{actions(row, globalIndex)}</div>
                          </div>
                        </div>
                      </td>
                    )}

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={processedColumns.length + 2} className="px-6 py-4 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-2 flex-wrap gap-3">
        <div className="flex items-center">
          <label className="mr-2 text-sm">Rows per page:</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center space-x-1">
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`w-8 h-8 rounded-full text-sm ${page === currentPage ? 'bg-blue-800 text-white' : 'border hover:bg-gray-100'
                  }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
