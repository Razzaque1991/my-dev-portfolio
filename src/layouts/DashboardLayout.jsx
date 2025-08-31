import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => {
  const navItems = [
    { name: "Home", path: "/" }, // Dashboard → Home
    { name: "Manage Comments", path: "/admin/dashboard/manage-comments" },
    { name: "Manage Experience", path: "/admin/dashboard/manage-experience" },
    { name: "Manage Projects", path: "/admin/dashboard/manage-projects" },
    { name: "Profile Settings", path: "/admin/dashboard/profile-settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"} // Home page এ exact match
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-teal-600 text-white font-semibold"
                        : "hover:bg-gray-700"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
