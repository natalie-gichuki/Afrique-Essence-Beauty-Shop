
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! Use the dashboard to manage products and view analytics.</p>

      // Analytics Section //
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow p-4 rounded">Total Products: --</div>
          <div className="bg-white shadow p-4 rounded">Total Orders: --</div>
          <div className="bg-white shadow p-4 rounded">Revenue: --</div>
        </div>
      </div>

      {/* Product Controls Placeholder */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
        <p>Coming soon: product editing, removal, and creation tools.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
// This is a simple admin dashboard page that provides an overview of analytics and product management.