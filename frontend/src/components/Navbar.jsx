import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Beauty Admin</div>
      <div className="flex gap-4">
        {/* Admin Dashboard Link */}
        <Link to="/admin" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        
        {/* Admin Analytics Link */}
        <Link to="/admin/analytics" className="text-gray-700 hover:text-blue-600">
          Analytics
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
