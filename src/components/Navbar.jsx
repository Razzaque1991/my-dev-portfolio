import { Link, NavLink } from "react-router-dom";
import { User, UserMinus, Code } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className="font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/projects"
          className="font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
        >
          Projects
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className="font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/comments"
          className="font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
        >
          Comments
        </NavLink>
      </li>
      {user ? (
        <li>
          <button
            onClick={handleLogout}
            title="Logout"
            className="font-medium text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center gap-1"
          >
            <UserMinus size={18} />
            Logout
          </button>
        </li>
      ) : (
        <li>
          <NavLink
            to="/admin/login"
            title="Admin Login"
            className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-1"
          >
            <User size={18} />
            Admin Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="navbar bg-blue-50 shadow-md px-4 py-3 sticky top-0 z-50 flex items-center justify-between font-sans"> {/* Added font-sans here */}
      <div className="navbar-start flex items-center gap-2">
        <Code size={28} className="text-green-600" />
        <Link to="/" className="text-2xl font-extrabold text-gray-800 select-none">
          MyPortfolio
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-lg bg-white rounded-box w-52 space-y-2"
          >
            {navLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;