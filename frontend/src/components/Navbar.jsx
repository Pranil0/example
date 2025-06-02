import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'; // adjust path

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-black shadow-md text-white">
      <div className="text-green-500 font-bold text-xl">Karma Yogi</div>

      <ul className="hidden md:flex gap-8 items-center">
        <li><Link to="/" className="hover:text-green-500">Home</Link></li>
        <li><Link to="/jobs" className="hover:text-green-500">Jobs</Link></li>
        <li><Link to="/contact" className="hover:text-green-500">Contact</Link></li>
        <li><Link to="/about" className="hover:text-green-500">About</Link></li>
      </ul>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-green-400 font-semibold">Hi, {user.fullName || user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-green-500 px-4 py-1 rounded text-black hover:bg-green-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-500 px-4 py-1 rounded text-black hover:bg-green-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border border-green-500 px-4 py-1 rounded text-green-500 hover:bg-green-500 hover:text-black transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
