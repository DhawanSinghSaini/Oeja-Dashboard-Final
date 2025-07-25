import React from "react";

const Navbar = () => {
  return (
    <header className="w-full bg-[#282c34] text-white flex items-center justify-between px-6 py-4 shadow-md">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold">OeJa SwasthSetu</div>
      </div>

      {/* Right: Greeting and Action */}
      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-300">Admin Dashboard</span>
      </div>
    </header>
  );
};

export default Navbar;
