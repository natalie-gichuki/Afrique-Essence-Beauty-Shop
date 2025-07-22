// This page will display visual analytics like charts and summaries for the admin.

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminAnalytics() {
  const [salesData, setSalesData] = useState([]);

  // Fetch analytics data from backend API when component mounts
  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => setSalesData(data))
      .catch((err) => console.error("Error fetching analytics data:", err));
  }, []);

  return (
    <div>
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-4">Analytics Overview</h1>
      <p className="text-gray-600 mb-6">Visual representation of sales data.</p>

      {/* Chart Container */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sales by Product</h2>

        {/* Responsive Bar Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <XAxis dataKey="product_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_sales" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
