import React, { useState, useEffect } from "react";

const DataTable = ({
  fetchData, // function to fetch data from backend
  nameKey = "customer_name", // actual backend key for "Name"
  categoryKey = "category", // actual backend key for "Category"
  onView,
  onEdit,
  onDelete,
}) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchData();
        setOrders(data);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(data.map((item) => item[categoryKey])),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error loading orders:", err);
      }
    };
    loadOrders();
  }, [fetchData, categoryKey]);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order[nameKey]
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || order[categoryKey] === category;
    return matchesSearch && matchesCategory;
  });

  // Utility for status styling
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
        <div className="flex space-x-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {/* Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Order ID
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Name
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Amount
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Category
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Date
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4 font-medium text-blue-600">
                  {order.id}
                </td>
                <td className="py-3 px-4 text-gray-900">{order[nameKey]}</td>
                <td className="py-3 px-4 font-semibold text-gray-900">
                  {order.amount}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-900">{order[categoryKey]}</td>
                <td className="py-3 px-4 text-gray-600">{order.date}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onView(order)}
                      className="text-blue-600 hover:text-blue-700 text-lg"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      onClick={() => onEdit(order)}
                      className="text-green-600 hover:text-green-700 text-lg"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => onDelete(order)}
                      className="text-red-600 hover:text-red-700 text-lg"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
