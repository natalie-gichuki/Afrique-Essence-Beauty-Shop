
// src/pages/Order.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Order() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
      })
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  const toggleExpand = (id) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#502b2d] mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-[#f6f0ee] rounded-xl shadow p-5 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    Status: <span className="capitalize">{order.status}</span>
                  </p>
                  <p className="text-sm text-gray-500">Total: KSh {order.total_amount}</p>
                  <p className="text-xs text-gray-400">Placed: {new Date(order.created_at).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => toggleExpand(order.id)}
                  className="text-[#7a4f3e] underline"
                >
                  {expandedOrderId === order.id ? 'Hide Items' : 'View Items'}
                </button>
              </div>

              {expandedOrderId === order.id && (
                <div className="mt-4 space-y-2 border-t border-[#e6d5ce] pt-4">
                  {order.order_items?.map(item => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm border-b pb-2"
                    >
                      <p>Product ID: {item.product_id}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: KSh {item.price_at_purchase}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => navigate(`/invoice/${order.id}`)}
                    className="mt-4 bg-[#7a4f3e] text-white px-4 py-1 rounded hover:bg-[#5c3b30]"
                  >
                    View Invoice
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
