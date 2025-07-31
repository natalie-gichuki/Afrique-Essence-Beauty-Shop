import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrders } from '../../redux/orderSlice';
import { fetchProducts } from '../../redux/slices/productSlice';
import { fetchUsers } from '../../redux/userSlice';

import { exportToCSV } from '../../utils/exportUtils';
import { t } from 'i18next';

Chart.register(...registerables);

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.users);

  const [stats, setStats] = useState({
    totalProducts: 0,
    activeUsers: 0,
    pendingOrders: 0,
    totalRevenue: 0
  });

  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  });

  const [ordersData, setOrdersData] = useState({
    labels: [],
    datasets: [{
      label: 'Orders',
      data: [],
      backgroundColor: 'rgba(59, 130, 246, 0.5)'
    }]
  });

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts({ page: 1, per_page: 100 }));
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const totalProducts = products.length || 0;
    // If you want to count only customer users
    const activeUsers = users.filter(user => user.role === 'customer').length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);


    const salesMap = {};
    orders.forEach(order => {
      order.order_items?.forEach(item => {
        const name = item.product?.name;
        if (name) {
          salesMap[name] = (salesMap[name] || 0) + item.quantity;
        }
      });
    });

    const salesLabels = Object.keys(salesMap);
    const salesCounts = Object.values(salesMap);

    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#F67019'];

    setStats({ totalProducts, activeUsers, totalOrders, totalRevenue });

    setSalesData({
      labels: salesLabels,
      datasets: [{
        data: salesCounts,
        backgroundColor: salesLabels.map((_, i) => colors[i % colors.length])
      }]
    });

    const ordersPerDay = Array(7).fill(0);
    const today = new Date();

    orders.forEach(order => {
      const date = new Date(order.created_at);
      const dayDiff = (today - date) / (1000 * 60 * 60 * 24);
      if (dayDiff < 7) {
        const weekday = date.getDay(); // 0 (Sun) to 6 (Sat)
        ordersPerDay[weekday]++;
      }
    });

    setOrdersData({
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{
        label: 'Orders',
        data: ordersPerDay,
        backgroundColor: 'rgba(59, 130, 246, 0.5)'
      }]
    });
  }, [products, users, orders]);

  const handleExport = () => {
    const data = [
      ['Metric', 'Value'],
      ['Total Products', stats.totalProducts],
      ['Active Users', stats.activeUsers],
      ['Pending Orders', stats.totalOrders],
      ['Total Revenue', `Ksh ${Number(stats.totalRevenue).toLocaleString()}`],
      ...salesData.labels.map((label, i) => [label, salesData.datasets[0].data[i]])
    ];
    exportToCSV(data, 'dashboard_metrics');
  };

  return (
    <div className="p-6 bg-fuchsia-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-700">📊 {t('adminDashboard')}</h1>
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
        >
          <span>{t('exportToCSV')}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">{t('totalProducts')}</h3>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">{t('activeUsers')}</h3>
          <p className="text-3xl font-bold">{stats.activeUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">{t('totalOrders')}</h3>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">{t('totalRevenue')}</h3>
          <p className="text-3xl font-bold">Ksh {stats.totalRevenue.toLocaleString()}</p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{t('salesByProduct')}</h2>
          <div className="h-64">
            <Pie data={salesData} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{t('ordersThisWeek')}</h2>
          <div className="h-64">
            <Bar data={ordersData} />
          </div>
        </div>
      </div>
    </div>
  );
}
