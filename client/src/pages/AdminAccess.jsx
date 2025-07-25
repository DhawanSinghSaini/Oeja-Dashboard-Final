import React, { useState , useEffect } from "react";
import axios from "axios";

export default function AdminPrivilegePanel() {

const [employeeId, setEmployeeId] = useState("");
const [adminList, setAdminList] = useState([]);
const [selectedEmployee, setSelectedEmployee] = useState(null);
const [showGrantModal, setShowGrantModal] = useState(false);
const [showRevokeModal, setShowRevokeModal] = useState(false);
const [targetToRevoke, setTargetToRevoke] = useState(null);

// 🔁 Load admin list from Users collection
const fetchAdminList = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const formatted = res.data.map((user) => ({
      id: user.employeeId,
      name: user.name,
      email: user.email,
      department: user.department,
      type: user.type?.toLowerCase() === "primary" ? "Primary" : "Secondary"
    }));

    setAdminList(formatted);
  } catch (err) {
    console.error("Error fetching admin list:", err);
  }
};

useEffect(() => {
  fetchAdminList();
}, []);

// 🔍 Search for employee by ID from Employee collection
const handleSearch = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:5000/api/employee-by-id/${employeeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setSelectedEmployee({
      id: res.data.employeeId,
      name: res.data.name,
      email: res.data.email,
      department: res.data.department,
      type: "Secondary"
    });
  } catch (err) {
    console.error("Lookup failed:", err);
    setSelectedEmployee(null);
    alert("Employee not found.");
  }
};

// 🟢 Open grant modal
const handleGrantAccess = () => setShowGrantModal(true);

// ✅ Grant access and sync with Users collection
const handleConfirmGrant = async () => {
  try {
    const token = localStorage.getItem("token");

    const alreadyExists = adminList.some(emp => emp.id === selectedEmployee.id);
    if (alreadyExists) {
      alert("This employee already has admin access.");
      setShowGrantModal(false);
      return;
    }

    const payload = {
      employeeId: selectedEmployee.id,
      name: selectedEmployee.name,
      email: selectedEmployee.email,
      department: selectedEmployee.department,
      password: selectedEmployee.id,
      type: "Secondary"
    };

    await axios.post("http://localhost:5000/api/users", payload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    await fetchAdminList();
    alert("Admin access granted.");
  } catch (err) {
    console.error("Grant failed:", err);
    const msg = err?.response?.data?.error || "Failed to grant admin access.";
    alert(msg);
  }

  setShowGrantModal(false);
  setSelectedEmployee(null);
  setEmployeeId("");
};

// ❌ Prepare to revoke access
const handleRevokeClick = (emp) => {
  setTargetToRevoke(emp);
  setShowRevokeModal(true);
};

// 🔒 Revoke user unless Primary
const handleConfirmRevoke = async () => {
  if (targetToRevoke?.type === "Primary") {
    alert("Primary users cannot be revoked.");
    setShowRevokeModal(false);
    setTargetToRevoke(null);
    return;
  }

  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/users/${targetToRevoke.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    await fetchAdminList();
    alert("Admin access revoked.");
  } catch (err) {
    console.error("Revoke failed:", err);
    const msg = err?.response?.data?.error || "Could not revoke access.";
    alert(msg);
  }

  setShowRevokeModal(false);
  setTargetToRevoke(null);
};


  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">

        <h1 className="text-3xl font-bold text-black text-center">Admin Privileges</h1>

        {/* Search Bar */}
        <div className="flex justify-center mt-4 mb-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter Employee ID..."
              className="w-full px-5 py-3 pr-16 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-black shadow-sm"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-full hover:bg-gray-800 transition"
            >
              🔍
            </button>
          </div>
        </div>

        {/* Employee Info Card */}
        {selectedEmployee && (
          <div className="bg-black rounded-xl p-6 text-white max-w-md mx-auto space-y-3 shadow-lg border border-gray-700">
            <p><strong>Name:</strong> {selectedEmployee.name}</p>
            <p><strong>ID:</strong> {selectedEmployee.id}</p>
            <p><strong>Department:</strong> {selectedEmployee.department}</p>
            <p><strong>Type:</strong> <span className="font-semibold text-yellow-400">{selectedEmployee.type}</span></p>
            <div className="flex justify-center">
              <button
                onClick={handleGrantAccess}
                className="mt-2 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                ✅ Grant Admin Access
              </button>
            </div>
          </div>
        )}

        {/* Grant Confirmation Modal */}
        {showGrantModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
              <button
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
                onClick={() => setShowGrantModal(false)}
              >
                &times;
              </button>
              <h2 className="text-lg font-bold text-black text-center mb-4">
                Do you want to give admin privileges to <br />
                <span className="font-semibold">
                  {selectedEmployee.name} {selectedEmployee.id}
                </span>?
              </h2>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleConfirmGrant}
                  className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Revoke Confirmation Modal */}
        {showRevokeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
              <button
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
                onClick={() => setShowRevokeModal(false)}
              >
                &times;
              </button>
              <h2 className="text-lg font-bold text-black text-center mb-4">
                Revoke admin privileges for <br />
                <span className="font-semibold">
                  {targetToRevoke?.name} {targetToRevoke?.id}
                </span>?
              </h2>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleConfirmRevoke}
                  className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left">Employee ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Department</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {adminList.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{emp.id}</td>
                  <td className="px-6 py-4">{emp.name}</td>
                  <td className="px-6 py-4">{emp.department}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${emp.type === "Primary" ? "text-green-600" : "text-yellow-500"}`}>
                      {emp.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleRevokeClick(emp)}
                      className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                      ❌ Revoke Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
