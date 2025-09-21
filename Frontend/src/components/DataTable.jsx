import { useState, useEffect, useMemo, useCallback } from 'react';
import Select from 'react-select';

const formatOptions = [
  { value: 'excel', label: 'Excel' },
  { value: 'pdf', label: 'PDF' },
  { value: 'csv', label: 'CSV' },
];

const DataTable = ({
  data = [],
  actions,
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

  const selectedRows = propSelectedRows ?? internalSelectedRows;
  const selectedColumns = propSelectedColumns ?? internalSelectedColumns;
  const selectedFormat = propSelectedFormat ?? internalSelectedFormat;

  const handleSelectAll = (checked, pageRows) => {
    setSelectAll(checked);
    const pageIndices = pageRows.map((_, idx) => (currentPage - 1) * pageSize + idx);
    const newSelected = checked ? [...new Set([...selectedRows, ...pageIndices])] : selectedRows.filter((i) => !pageIndices.includes(i));
    if (onSelectedRowsChange) onSelectedRowsChange(newSelected);
    else setInternalSelectedRows(newSelected);
  };

  const handleSelectRow = (index, checked) => {
    const newSelected = checked ? [...selectedRows, index] : selectedRows.filter((i) => i !== index);
    if (!checked) setSelectAll(false);
    if (onSelectedRowsChange) onSelectedRowsChange(newSelected);
    else setInternalSelectedRows(newSelected);
  };

  const handleColumnsChange = (value) => {
    if (onSelectedColumnsChange) onSelectedColumnsChange(value);
    else setInternalSelectedColumns(value);
  };

  const handleFormatChange = (value) => {
    if (onSelectedFormatChange) onSelectedFormatChange(value);
    else setInternalSelectedFormat(value);
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
      cancelled: 'bg-red-100 text-red-800' 
    };
    return map[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getSmartColumnConfig = useCallback((key, sampleValue) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('id') || lowerKey === 'code' || lowerKey === 'ref') return { render: (v) => <a href="#" className="text-blue-800 font-bold hover:underline">{v}</a> };
    if (lowerKey.includes('status') || lowerKey.includes('state')) return { render: (v) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(v)}`}>{v}</span> };
    if (lowerKey.includes('price') || lowerKey.includes('amount') || lowerKey.includes('total') || lowerKey.includes('cost') || (typeof sampleValue === 'string' && sampleValue?.includes('$'))) return { render: (v) => <span className="text-blue-800 font-bold">{v}</span> };
    if (lowerKey.includes('email') || (typeof sampleValue === 'string' && sampleValue?.includes('@'))) return { render: (v) => <a href={`mailto:${v}`} className="text-blue-600 hover:underline">{v}</a> };
    if (lowerKey.includes('phone') || lowerKey.includes('tel')) return { render: (v) => <span className="text-gray-700">{v}</span> };
    if (lowerKey.includes('date') || lowerKey.includes('time') || lowerKey.includes('created') || lowerKey.includes('updated')) return { render: (v) => <span className="text-gray-500 font-semibold">{v}</span> };
    if (lowerKey.includes('name') || lowerKey.includes('title')) return { render: (v) => <span className="text-blue-800 font-bold">{v}</span> };
    if (lowerKey.includes('description') || lowerKey.includes('note') || lowerKey.includes('comment') || lowerKey.includes('detail')) return { className: 'min-w-[200px]', render: (v) => <span className="text-gray-500 text-sm">{v?.length > 50 ? `${v.substring(0, 50)}...` : v}</span> };
    return { render: (v) => <span>{v}</span> };
  }, []);

  const processedColumns = useMemo(() => {
    if (!data.length) return [];
    const sampleRow = data[0].tableRow;
    return Object.keys(sampleRow).map((key) => {
      const sampleValue = sampleRow[key];
      const smart = getSmartColumnConfig(key, sampleValue);
      return { key, header: key, className: smart.className || 'min-w-[120px]', ...smart };
    });
  }, [data, getSmartColumnConfig]);

  const columnOptions = useMemo(() => {
    if (!processedColumns.length) return [];
    return [{ value: 'all', label: 'All Columns' }, ...processedColumns.map((col) => ({ value: col.key, label: col.header }))];
  }, [processedColumns]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((item) =>
      Object.values(item.tableRow).some((val) =>
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
      <div className="border-0 pt-6 mb-7">
        <div className="flex justify-between items-center">
          <div className="flex items-center relative">
            <svg className="w-5 h-5 absolute left-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80" 
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
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
            <button 
              type="button" 
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center hover:bg-gray-300 transition-colors" 
              onClick={onReload}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reload
            </button>
          </div>
        </div>

        {isExportModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">Export Records</h3>
                  <div className="mt-2 px-7 py-3">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Columns:</label>
                      <Select 
                        value={selectedColumns} 
                        onChange={handleColumnsChange} 
                        options={columnOptions} 
                        placeholder="Select columns to export" 
                        isClearable 
                        isMulti 
                        classNamePrefix="react-select" 
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Export Format:</label>
                      <Select 
                        value={selectedFormat} 
                        onChange={handleFormatChange} 
                        options={formatOptions} 
                        placeholder="Select a format" 
                        isClearable 
                        classNamePrefix="react-select" 
                      />
                    </div>
                    <div className="flex justify-center gap-4">
                      <button 
                        type="button" 
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        onClick={() => setIsExportModalOpen(false)}
                      >
                        Close
                      </button>
                      <button 
                        type="button" 
                        className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
                      >
                        Proceed Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <div className="flex items-center">
                  <input 
                    className="h-4 w-4 text-blue-800 rounded focus:ring-blue-800" 
                    type="checkbox" 
                    checked={selectAll} 
                    onChange={(e) => handleSelectAll(e.target.checked, currentPageData)} 
                  />
                </div>
              </th>
              {processedColumns.map((col, i) => (
                <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPageData.length > 0 ? (
              currentPageData.map((row, rowIndex) => {
                const globalIndex = (currentPage - 1) * pageSize + rowIndex;
                return (
                  <tr key={globalIndex} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input 
                          className="h-4 w-4 text-blue-800 rounded focus:ring-blue-800" 
                          type="checkbox" 
                          checked={selectedRows.includes(globalIndex)} 
                          onChange={(e) => handleSelectRow(globalIndex, e.target.checked)} 
                        />
                      </div>
                    </td>
                    {processedColumns.map((col, i) => (
                      <td key={i} className="px-6 py-4 whitespace-nowrap">
                        {col.render ? col.render(row.tableRow[col.key], row, globalIndex) : row.tableRow[col.key]}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left">
                          <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-800">
                            Actions
                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                              {actions(row, globalIndex)}
                            </div>
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

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <label className="mr-2 text-sm text-gray-700">Rows per page:</label>
          <select 
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
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
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-100" 
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
                className={`w-8 h-8 rounded-full text-sm ${page === currentPage ? "bg-blue-800 text-white" : "border border-gray-300 hover:bg-gray-100"}`} 
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
          <button 
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-100" 
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