import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-lg text-black">
      <Link to="/" className="ml-7">Home</Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span>{user.username}</span>
            <button onClick={handleLogout} className="bg-red-200 px-3 py-1 rounded shadow-md hover:scale-110">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className=" bg-slate-100 px-3 py-1 rounded hover:scale-110 shadow-md">Login</Link>
            <Link to="/register" className="mr-10 bg-slate-300 px-3 py-1 rounded hover:scale-110 shadow-md">Register</Link>

          </>
        )}
        {user && (
          <Link to="/profile" className="bg-blue-100 px-3 py-1 rounded hover:scale-110 shadow-md">👤</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar;