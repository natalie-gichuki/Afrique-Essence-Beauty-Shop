import { useState } from 'react';
import { t } from 'i18next';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react'; // or use a custom SVG

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed z-30 inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform transition-transform duration-200 ease-in-out 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0`}>
        <div className="text-xl font-bold p-4 border-b border-gray-700">
          {t('adminPanel')}
        </div>
        <nav className="mt-4 space-y-1">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-900 text-yellow-400 font-medium' : 'hover:bg-gray-700 hover:text-yellow-300'}`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            {t('dashboard')}
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-900 text-yellow-400 font-medium' : 'hover:bg-gray-700 hover:text-yellow-300'}`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            {t('products')}
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-900 text-yellow-400 font-medium' : 'hover:bg-gray-700 hover:text-yellow-300'}`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            {t('user')}
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-900 text-yellow-400 font-medium' : 'hover:bg-gray-700 hover:text-yellow-300'}`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            {t('orders')}
          </NavLink>
        </nav>
      </aside>

      {/* Content and Topbar */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white shadow z-10">
          <button
            className="text-gray-800"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">{t('adminPanel')}</h1>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 mt-14 md:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
