// This page displays a simple admin overview with summary cards.
export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome, Admin</h1>
      <p className="text-gray-600">
        Here’s a quick summary of your store’s performance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold text-green-600">Ksh 0</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-2xl font-bold text-purple-600">0</p>
        </div>
      </div>
    </div>
  );
}
