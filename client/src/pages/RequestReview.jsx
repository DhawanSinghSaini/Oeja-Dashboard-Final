import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RequestReview() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState({});
  const [comments, setComments] = useState({});
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [pendingAction, setPendingAction] = useState({ id: "", type: "" });
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (id, value) => {
    const req = requests.find((r) => r.id === id);
    if (req.status === "approve" || req.status === "reject") return;
    setActions({ ...actions, [id]: value });
  };

  const handleSubmit = (id) => {
    const selectedAction = actions[id];
    if (!selectedAction) return alert("Please select an action first.");
    setPendingAction({ id, type: selectedAction });
    setCommentInput("");
    setConfirmationModal(true);
  };

  const confirmAction = () => {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `/api/requests/${pendingAction.id}`,
        {
          status: pendingAction.type,
          adminComment: commentInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const updatedList = requests.map((r) =>
          r.id === pendingAction.id ? res.data : r
        );
        setRequests(updatedList);
        setComments((prev) => ({
          ...prev,
          [pendingAction.id]: commentInput || "",
        }));
        setActions((prev) => ({
          ...prev,
          [pendingAction.id]: pendingAction.type,
        }));
      })
      .catch((err) => {
        console.error("Failed to update request:", err);
        alert("Could not apply action.");
      })
      .finally(() => {
        setConfirmationModal(false);
        setPendingAction({ id: "", type: "" });
        setCommentInput("");
      });
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 italic mb-4">
        Loading requests...
      </p>
    );

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          📝 Onboarding Requests
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm rounded-xl overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                {[
                  "Request ID",
                  "Full Name",
                  "Email",
                  "Role",
                  "License #",
                  "Expiry",
                  "Organization",
                  "ID Scan",
                  "License Scan",
                  "Admin Action",
                  "Submit",
                  "Current Status",
                  "Latest Comment",
                ].map((header) => (
                  <th key={header} className="px-4 py-3 text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((req) => {
                const isLocked =
                  req.status === "approve" || req.status === "reject";
                return (
                  <tr key={req.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {req.id}
                    </td>
                    <td className="px-4 py-3">{req.fullName}</td>
                    <td className="px-4 py-3">{req.email}</td>
                    <td className="px-4 py-3">{req.role}</td>
                    <td className="px-4 py-3">{req.licenseNumber}</td>
                    <td className="px-4 py-3">
                      {req.licenseExpiry?.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3">{req.organization}</td>

                    <td className="px-4 py-3">
                      {req.identityScanUrl ? (
                        <a
                          href={req.identityScanUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View ID
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">
                          Not Provided
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {req.licenseScanUrl ? (
                        <a
                          href={req.licenseScanUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View License
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">
                          Not Provided
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <select
                        value={actions[req.id] || ""}
                        disabled={isLocked}
                        onChange={(e) => handleChange(req.id, e.target.value)}
                        className={`px-3 py-1 rounded-full border ${
                          actions[req.id] === "approve"
                            ? "bg-green-100 text-green-800"
                            : actions[req.id] === "reject"
                            ? "bg-red-100 text-red-800"
                            : actions[req.id] === "info"
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <option value="">Choose</option>
                        <option value="approve">✅ Approve</option>
                        <option value="reject">❌ Reject</option>
                        <option value="info">ℹ️ Request Info</option>
                      </select>
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleSubmit(req.id)}
                        disabled={isLocked}
                        className={`px-4 py-1 rounded-full transition ${
                          isLocked
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-primary text-white hover:bg-gray-800"
                        }`}
                      >
                        Submit
                      </button>
                    </td>

                    <td className="px-4 py-3 font-medium text-gray-800">
                      {req.status === "approve"
                        ? "✅ Approved"
                        : req.status === "reject"
                        ? "❌ Rejected"
                        : req.status === "info"
                        ? "ℹ️ Info Requested"
                        : "Pending"}
                    </td>

                    <td className="px-4 py-3 text-gray-700 italic">
                      {req.adminComment || "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {confirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative space-y-4">
            <button
              className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
              onClick={() => setConfirmationModal(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold text-center text-black">
              Confirm action <br />
              <span className="text-primary font-semibold">
                "{pendingAction.type}"
              </span>{" "}
              for request <span className="font-semibold">{pendingAction.id}</span>
            </h2>
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Optional comment for this action..."
              rows={4}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <div className="flex justify-center">
              <button
                onClick={confirmAction}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
