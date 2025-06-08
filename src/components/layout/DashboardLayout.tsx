import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "./Sidebar";

const DashboardLayout: React.FC = () => {
  const { user, isLoading, logout } = useAuth(); // make sure logout is exposed
  const navigate = useNavigate();

  const handleLogout = () => {
    logout?.(); // optional if your context provides logout logic
    localStorage.clear(); // clear any stored tokens if needed
    navigate("/");
  };

  const UserDropdown = () => {
    const [open, setOpen] = React.useState(false);
    const username = user?.name || "User";
    const role = user?.role || "Role";

    return (
      <div className="relative inline-block text-left ml-auto">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white font-semibold">
            {username.charAt(0)}
          </div>
          <div className="text-sm text-[#3E2F1C] text-left hidden sm:block">
            <div>{username}</div>
            <div className="text-xs text-gray-500">{role}</div>
          </div>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-md z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-brown"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b bg-[#F9F6F1]">
          <h1 className="text-xl font-bold text-[#3E2F1C]">Dashboard</h1>
          <UserDropdown />
        </div>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;