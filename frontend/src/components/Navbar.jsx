// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/slices/authSlice";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <nav className="flex justify-between items-center p-4 bg-fuchsia-50 shadow-md text-gray-700">
//       <Link to="/" className="ml-7 text-purple-800 text-lg font-bold hover:text-violet-800 transition">Home</Link>
//       <div className="flex gap-4 items-center">
//         {user?.role === "admin" && (
//           <>
//             <Link
//               to="/admin"
//               className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md"
//             >
//               Dashboard
//             </Link>
//             <Link
//               to="/admin/analytics"
//               className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md"
//             >
//               Analytics
//             </Link>
//           </>
//         )}

//         {user?.role === "user" && (
//           <>
//             <Link to="/cart" className="text-purple-700 hover:underline">Cart</Link>
//             <Link to="/checkout" className="text-purple-700 hover:underline">Checkout</Link>
//             <Link to="/orders" className="text-purple-700 hover:underline">My Orders</Link>
//           </>
//         )}
//         {user ? (
//           <>
//             <span>{user.username}</span>
//             <button onClick={handleLogout} className="bg-purple-800 text-white px-4 py-1.5 rounded hover:bg-violet-800 transition shadow-md"
//             >Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="bg-purple-200 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md">Login</Link>
//             <Link to="/register" className="mr-10 bg-purple-300 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md">Register</Link>

//           </>
//         )}
//         {user && (
//           <Link to="/profile" className="bg-purple-200 text-purple-800 px-3 py-1.5 rounded-full hover:bg-violet-800 hover:text-white transition shadow-md">👤</Link>
//         )}
//       </div>
//     </nav>
//   )
// }

// export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/slices/authSlice";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <nav className="flex justify-between items-center p-4 bg-fuchsia-50 shadow-md text-gray-700">
//       <Link to="/" className="ml-7 text-purple-800 text-lg font-bold hover:text-violet-800 transition">Home</Link>
//       <Link to="/product" className="text-purple-700 hover:underline">Products</Link>
//       <Link to="/product-details" className="text-purple-700 hover:underline">Product Details</Link>
//       <Link to="/cart" className="text-purple-700 hover:underline">Cart</Link>
//       <Link to="/checkout" className="text-purple-700 hover:underline">Checkout</Link>
//       <Link to="/orders" className="text-purple-700 hover:underline">My Orders</Link>
//       <Link to="/invoice/:id" className="text-purple-700 hover:underline">My Invoice</Link>

//       <div className="flex gap-4 items-center">
//         {user?.role === "admin" && (
//           <>
//             <Link to="/admin" className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md">
//               Dashboard
//             </Link>
//             <Link to="/admin/analytics" className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md">
//               Analytics
//             </Link>
//           </>
//         )}

//         {/* {user?.role === "user" && (
//           <>
//             <Link to="/cart" className="text-purple-700 hover:underline">Cart</Link>
//             <Link to="/checkout" className="text-purple-700 hover:underline">Checkout</Link>
//             <Link to="/orders" className="text-purple-700 hover:underline">My Orders</Link>
//           </>
//         )} */}

//         {user ? (
//           <>
//             <span className="text-sm font-medium">{user.username}</span>

//             <Link to="/profile" className="bg-purple-200 text-purple-800 px-3 py-1.5 rounded-full hover:bg-violet-800 hover:text-white transition shadow-md">👤</Link>
//             <button
//               onClick={handleLogout}
//               className="bg-purple-800 text-white px-4 py-1.5 rounded hover:bg-violet-800 transition shadow-md"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>

//             <Link to="/login" className="bg-purple-200 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md">Login</Link>
//             <Link to="/register" className="mr-10 bg-purple-300 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import LoginPhoto from "../assets/images/LoginPhoto.jpg"

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-fuchsia-50 shadow-md text-gray-700">
      {/* Logo Section - Left */}
      <div className="flex-shrink-0">
        <Link to="/" className="text-3xl font-bold text-grey-800 hover:text-violet-800 transition duration-300">
          Afrique Essence
        </Link>
      </div>


      {/* Center Links */}
      <div className="flex-1 flex justify-center space-x-6 text-lg font-medium">
        <Link
          to="/"
          className="text-purple-800 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-xl"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-purple-700 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-xl"
        >
          Products
        </Link>
        <Link
          to="/products-details"
          className="text-purple-700 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-xl"
        >
          Product Details
        </Link>
        <Link
          to="/cart"
          className="text-purple-700 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-xl"
        >
          Cart
        </Link>
        <Link
          to="/orders"
          className="text-purple-700 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-xl"
        >
          My Orders
        </Link>
        <Link
          to="/checkout"
          className="text-purple-700 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-xl"
        >
          Checkout
        </Link>
        <Link
          to="/invoice"
          className="text-purple-700 hover:underline hover:text-violet-800 transition-all duration-200 hover:text-xl"
        >
          Invoice
        </Link>
      </div>

      {/* Right Side: Auth & Admin */}
      <div className="flex items-center gap-4">
        {user?.role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md"
          >
            Admin Panel
          </Link>
        )}

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
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-purple-200 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="mr-4 bg-purple-300 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
