import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "../components/Card";
import LineGraphSingle from "../components/LineGraphSingle";
import BarChartComponent from "../components/BarChartComponent";
import NumericCard from "../components/NumericCard";

function DoctorDashboard() {
  const [kpi, setKpi] = useState(null);
  const [doctorTrend, setDoctorTrend] = useState([]);
  const [avgConsultCard, setAvgConsultCard] = useState(null);
  const [fulfillmentRate, setFulfillmentRate] = useState([]);
  const [feedbackAverageData, setFeedbackAverageData] = useState([]);
  const [feedbackTable, setFeedbackTable] = useState([]);
  const [cancellationReasons, setCancellationReasons] = useState([]);
  const [cancellationTable, setCancellationTable] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDoctorMetrics = async () => {
      try {
        const [
          kpiRes,
          trendRes,
          avgRes,
          fulfillRes,
          feedbackAvgRes,
          feedbackTableRes,
          cancelReasonRes,
          cancelTableRes,
        ] = await Promise.all([
          axios.get("/api/kpi-doctors", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/doctor-trend-doctors", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/avg-consult-doctors", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/fulfillment-rate-doctors", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/feedback-average-doctors", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/feedback-table-doctors", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/cancellation-reasons-doctors", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/cancellation-table-doctors", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setKpi(kpiRes.data[0]);
        setDoctorTrend(trendRes.data);
        setAvgConsultCard(avgRes.data[0]);
        setFulfillmentRate(fulfillRes.data);
        setFeedbackAverageData(feedbackAvgRes.data);
        setFeedbackTable(feedbackTableRes.data);
        setCancellationReasons(cancelReasonRes.data);
        setCancellationTable(cancelTableRes.data);
      } catch (err) {
        console.error("Error fetching doctor dashboard data:", err);
      }
    };

    fetchDoctorMetrics();
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctor Dashboard</h2>

        {/* KPI + Consultation Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {kpi && (
            <Card
              title={kpi.title}
              value={kpi.value}
              period={kpi.period}
              growth={kpi.growth}
            />
          )}
          {avgConsultCard && (
            <NumericCard
              label={avgConsultCard.label}
              number={avgConsultCard.number}
              icon={avgConsultCard.icon}
              color={avgConsultCard.color}
              textColor={avgConsultCard.textColor}
            />
          )}
        </div>

        {/* Active Count + Fulfillment Rate */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LineGraphSingle
            title="Active Doctor Count Over Time"
            data={doctorTrend}
            xLabel="Month"
            yLabel="Doctors"
          />
          <BarChartComponent
            title="Appointment Fulfillment Rate"
            data={fulfillmentRate}
            xLabel="Department"
            yLabel="Fulfillment (%)"
          />
        </div>

        {/* Feedback Rating + Comments Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LineGraphSingle
            title="Average Feedback Rating"
            data={feedbackAverageData}
            xLabel="Month"
            yLabel="Rating (out of 5)"
            yDomain={[0, 5]}
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Feedback Table</h3>
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100 text-gray-600 text-sm font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Doctor</th>
                  <th className="px-4 py-3 text-left">Rating</th>
                  <th className="px-4 py-3 text-left">Comment</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {feedbackTable.map((entry, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{entry.doctor}</td>
                    <td className="px-4 py-3">{entry.rating}</td>
                    <td className="px-4 py-3">{entry.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cancellations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BarChartComponent
            title="Appointment Cancellation Patterns"
            data={cancellationReasons}
            xLabel="Reason"
            yLabel="Count"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Cancellation Breakdown</h3>
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100 text-gray-600 text-sm font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Reason</th>
                  <th className="px-4 py-3 text-left">Count</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {cancellationTable.map((r, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{r.reason}</td>
                    <td className="px-4 py-3">{r.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
