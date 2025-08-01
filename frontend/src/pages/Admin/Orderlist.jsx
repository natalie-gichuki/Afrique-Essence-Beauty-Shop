import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/orderSlice';
import { t } from 'i18next';

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
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">📦 {t('orders')}</h2>
      <div className="overflow-x-auto rounded-lg shadow border border-purple-200 bg-white">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-purple-200 text-left">
            <tr>
              <th className="px-4 py-3 border">#</th>
              <th className="px-4 py-3 border">{t('customer')}</th>
              <th className="px-4 py-3 border">{t('email')}</th>
              <th className="px-4 py-3 border">{t('total')}</th>
              <th className="px-4 py-3 border">{t('date')}</th>
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
                    <p className="font-semibold text-purple-800 mb-1">🛒 {t('productsPurchased')}:</p>
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
