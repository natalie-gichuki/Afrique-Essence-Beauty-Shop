import React from "react";

const AdminAnalytics = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Products</h2>
          <p className="text-2xl font-bold text-blue-600">--</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Sales</h2>
          <p className="text-2xl font-bold text-green-600">--</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Top Category</h2>
          <p className="text-2xl font-bold text-purple-600">--</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Over Time Chart Placeholder */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Sales Over Time</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Line Chart (coming soon)
          </div>
        </div>

        {/* Popular Products Chart Placeholder */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Popular Products</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Bar Chart (coming soon)
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
