import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { t } from "i18next";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-fuchsia-200 shadow-md text-gray-700">
      {/* Left Section: Logo + Left Links */}
      <div className="flex items-center gap-10">
        <Link
          to="/"
          className="text-3xl font-bold text-gray-800 hover:text-violet-800 transition duration-300"
        >
          Afrique Essence
        </Link>
        <div className="flex gap-6 text-lg font-medium">
          <Link
            to="/"
            className="text-purple-800 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-2xl"
          >
           {t('home')}
          </Link>
          <Link
            to="/products"
            className="text-purple-700 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-2xl"
          >
            {t('products')}
          </Link>
          <Link
            to="/products-details"
            className="text-purple-700 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-2xl"
          >
            {t('productDetails')}
          </Link>
        </div>
      </div>

      {/* Right Section: Right Links + Auth */}

      <div className="flex items-center gap-6 text-lg font-medium">
        {user?.role === "customer" && (
        <div className="flex items-center gap-6 text-lg font-medium">
          <Link
            to="/cart"
            className="text-purple-700  hover:text-violet-800 transition-all duration-200 hover:text-3xl"
          >
            🛒
          </Link>
          {/* <Link
          to="/orders"
          className="text-purple-700 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-xl"
        >
          My Orders
        </Link> */}
          <Link
            to="/checkout"
            className="text-purple-700 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-2xl"
          >
            {t('checkout')}
          </Link>
          <Link
            to="/invoice"
            className="text-purple-700 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-2xl"
          >
            {t('invoice')}
          </Link>
        </div>
      )}


        {/* Admin Panel */}
        {user?.role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md"
          >
            {t('adminPanel')}
          </Link>
        )}

        {/* Auth Buttons */}
        {user ? (
          <>
            <span className="text-sm font-medium">{user.username}</span>
            <Link
              to="/profile"
              className="bg-purple-200 text-purple-800 px-3 py-1.5 rounded-full hover:bg-violet-800 hover:text-white transition shadow-md"
            >
              👤
            </Link>
            <button
              onClick={handleLogout}
              className="bg-purple-800 text-white px-4 py-1.5 rounded hover:bg-violet-800 transition shadow-md"
            >
              {t('logout')}
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-purple-200 text-gray-700 px-4 py-1.5 rounded-lg hover:bg-violet-800 hover:text-white transition shadow-md"
            >
              {t('login')}
            </Link>
            <Link
              to="/register"
              className="mr-4 bg-purple-300 text-gray-700 px-4 py-1.5 rounded-lg hover:bg-violet-800 hover:text-white transition shadow-md"
            >
              {t('signUp')}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

