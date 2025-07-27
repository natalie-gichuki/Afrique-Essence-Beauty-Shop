// import { useState, useEffect } from 'react';
// import { getAllOrders, updateOrder } from '../../services/orderService';

// export default function OrderList() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [statusFilter, setStatusFilter] = useState('all');

//   useEffect(() => {
//     fetchOrders();
//   }, [statusFilter]);

//   const fetchOrders = async () => {
//     try {
//       let data = await getAllOrders();
//       if (statusFilter !== 'all') {
//         data = data.filter(order => order.status === statusFilter);
//       }
//       setOrders(data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await updateOrder(orderId, newStatus);
//       // Refresh only the updated order in the UI
//       setOrders(prev =>
//         prev.map(order =>
//           order.id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Order Management</h1>
//         <div className="flex items-center space-x-4">
//           <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">Filter:</label>
//           <select
//             id="status-filter"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           >
//             <option value="all">All Orders</option>
//             <option value="pending">Pending</option>
//             <option value="processing">Processing</option>
//             <option value="shipped">Shipped</option>
//             <option value="delivered">Delivered</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{order.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {order.customerName || order.billing?.name || 'N/A'}
//                 </td>

//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <select
//                     value={order.status}
//                     onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                     className={`border rounded px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="processing">Processing</option>
//                     <option value="shipped">Shipped</option>
//                     <option value="delivered">Delivered</option>
//                     <option value="cancelled">Cancelled</option>
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function getStatusColor(status) {
//   switch (status) {
//     case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//     case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
//     case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
//     case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
//     case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
//     default: return 'bg-gray-100 text-gray-800 border-gray-200';
//   }
// }

// import { useEffect, useState } from 'react';

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch('http://localhost:5555/orders', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error('Failed to fetch orders');
//         const data = await res.json();
//         setOrders(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [token]);

//   if (loading) return <p className="p-4">Loading orders...</p>;
//   if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="border p-2">Order ID</th>
//                 <th className="border p-2">User</th>
//                 <th className="border p-2">Total</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-100">
//                   <td className="border p-2">{order.id}</td>
//                   <td className="border p-2">{order.user?.username || 'N/A'}</td>
//                   <td className="border p-2">KES {order.total_amount}</td>
//                   <td className="border p-2">{order.status}</td>
//                   <td className="border p-2">{new Date(order.created_at).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;

// admin/OrderList.jsx
// admin/OrderList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/orderSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === 'loading') {
    return <p className="text-center text-gray-700">Loading orders...</p>;
  }

  return (
    <div className="p-6 bg-fuchsia-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">📦 Orders</h2>
      <div className="overflow-x-auto rounded-lg shadow border border-purple-200 bg-white">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-purple-200 text-left">
            <tr>
              <th className="px-4 py-3 border">#</th>
              <th className="px-4 py-3 border">Customer</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Total</th>
              <th className="px-4 py-3 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <React.Fragment key={order.id}>
                <tr className="bg-white hover:bg-fuchsia-100 transition">
                  <td className="border px-4 py-2">{idx + 1}</td>
                  <td className="border px-4 py-2">{order.user?.name}</td>
                  <td className="border px-4 py-2">{order.user?.email}</td>
                  <td className="border px-4 py-2 font-medium">Ksh {order.total_amount}</td>
                  <td className="border px-4 py-2">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td colSpan="5" className="border px-4 py-3 bg-purple-50">
                    <p className="font-semibold text-purple-800 mb-1">🛒 Products Purchased:</p>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {order.order_items?.map(item => (
                        <li key={item.id}>
                          {item.product.name} — {item.quantity} × Ksh {item.product.price} ={" "}
                          <strong>Ksh {item.product.price * item.quantity}</strong>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
