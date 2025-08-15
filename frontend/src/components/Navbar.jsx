import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { t } from "i18next";
import { selectCartTotalQuantity } from "../redux/slices/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false); // Close menu after logout
  };

  return (
    <nav className="bg-fuchsia-200 shadow-md text-gray-700">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo & Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 hover:text-violet-800 transition duration-300"
          >
            Afrique Essence
          </Link>
          <button
            className="md:hidden text-3xl text-purple-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-lg font-medium">
          <Link to="/" className="text-purple-800 text-2xl hover:underline hover:text-violet-800 hover:text-3xl transition-all duration-200">
            {t("home")}
          </Link>
          <Link to="/products" className="text-purple-700 text-2xl hover:underline hover:text-violet-800 hover:text-3xl transition-all duration-200">
            {t("products")}
          </Link>
          <Link to="/products-details" className="text-purple-700 text-2xl hover:underline hover:text-violet-800 hover:text-3xl transition-all duration-200">
            {t("productDetails")}
          </Link>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-6 text-lg font-medium">
          {user?.role === "customer" && (
            <>
              <Link to="/cart" className="relative">
                🛒
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartQuantity}
                  </span>
                )}
              </Link>
              <Link to="/checkout" className="text-purple-700 text-2xl hover:text-3xl hover:underline hover:text-violet-800">
                {t("checkout")}
              </Link>
              <Link to="/invoice" className="text-purple-700 text-2xl hover:text-3xl hover:underline hover:text-violet-800">
                {t("invoice")}
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md">
              {t("adminPanel")}
            </Link>
          )}

          {user ? (
            <>
              <span className="text-sm">{user.username}</span>
              <Link to="/profile" className="text-xl">👤</Link>
              <button onClick={handleLogout} className="bg-purple-800 text-white px-4 py-1.5 rounded hover:bg-violet-800 transition shadow-md">
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-purple-200 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md">
                {t("login")}
              </Link>
              <Link to="/register" className="bg-purple-300 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md">
                {t("signUp")}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 text-lg font-medium text-center">
          <Link to="/" className="underline" onClick={() => setMenuOpen(false)}>{t("home")}</Link>
          <Link to="/products" className="underline" onClick={() => setMenuOpen(false)}>{t("products")}</Link>
          <Link to="/products-details" className="underline" onClick={() => setMenuOpen(false)}>{t("productDetails")}</Link>

          {user?.role === "customer" && (
            <>
              <Link to="/cart" className="relative hover:text-violet-800" onClick={() => setMenuOpen(false)}>
                🛒
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartQuantity}
                  </span>
                )}
              </Link>
              <Link to="/checkout" className="underline" onClick={() => setMenuOpen(false)}>{t("checkout")}</Link>
              <Link to="/invoice" className="underline" onClick={() => setMenuOpen(false)}>{t("invoice")}</Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md" onClick={() => setMenuOpen(false)}>{t("adminPanel")}</Link>
          )}

          {user ? (
            <>
              <span>{user.username}</span>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="border-black rounded-xl w-10 text-center text-2xl">👤</Link>
              <button onClick={handleLogout} className="bg-purple-800 text-white px-4 py-1.5 rounded hover:bg-violet-800">
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-purple-200 w-15 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md" onClick={() => setMenuOpen(false)}>{t("login")}</Link>
              <Link to="/register" className="bg-purple-300 w-15 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md" onClick={() => setMenuOpen(false)}>{t("signUp")}</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;



