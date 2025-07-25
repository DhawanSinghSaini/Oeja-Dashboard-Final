import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const navItems = [
    { path: "/finance", icon: "💰", label: "Finance" },
    { path: "/engagement", icon: "📊", label: "Engagement" },
    { path: "/doctor", icon: "🩺", label: "Doctor" },
    { path: "/onboarding", icon: "📝", label: "Onboarding" },
    { path: "/privileges", icon: "🔐", label: "Privileges" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🧹 clear auth token
    navigate("/login"); // 🚪 redirect to login page
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-6 flex flex-col justify-between">
      {/* Top: Title + Navigation */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Admin Dashboard
        </h2>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-md font-medium transition ${
                currentPath === item.path
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom: Logout + Brand */}
      <div className="pt-6 mt-10 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full mb-3 text-center px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition"
        >
          🔓 Logout
        </button>
        <div className="text-sm text-center text-gray-500">
          <span className="font-semibold text-indigo-600">
            Oeja SwasthSetu
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
