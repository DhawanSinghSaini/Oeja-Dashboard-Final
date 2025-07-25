import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "../components/Card";
import LineGraphSingle from "../components/LineGraphSingle";
import NumericCard from "../components/NumericCard";
import PieChartComponent from "../components/PieChartComponent";
import ColumnChart from "../components/ColumnChart";

function FinanceDashboard() {
  const [kpiCards, setKpiCards] = useState([]);
  const [mrrData, setMrrData] = useState([]);
  const [avgRevenueCard, setAvgRevenueCard] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [refundData, setRefundData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [profitMargins, setProfitMargins] = useState([]);
  const [revenueRegions, setRevenueRegions] = useState([]);
  const [outstandingInvoices, setOutstandingInvoices] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const [
          kpiRes,
          mrrRes,
          avgRes,
          payRes,
          refundRes,
          expenseRes,
          marginRes,
          regionRes,
          invoiceRes,
        ] = await Promise.all([
          axios.get("/api/kpi-cards-finance", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/mrr-data-finance", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/avg-revenue-finance", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/payment-methods-finance", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/refund-data-finance", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/expenses-data-finance", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/profit-margins-finance", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/revenue-regions-finance", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/outstanding-invoices-finance", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setKpiCards(kpiRes.data);
        setMrrData(mrrRes.data);
        setAvgRevenueCard(avgRes.data[0]);
        setPaymentMethods(payRes.data);
        setRefundData(refundRes.data);
        setExpensesData(expenseRes.data);
        setProfitMargins(marginRes.data);
        setRevenueRegions(regionRes.data);
        setOutstandingInvoices(invoiceRes.data);
      } catch (err) {
        console.error("Error fetching finance data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Finance Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {kpiCards.length > 0 && kpiCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            value={card.value}
            period={card.period}
            growth={card.growth}
          />
          ))}


          {avgRevenueCard && (
            <NumericCard
              label={avgRevenueCard.label}
              number={avgRevenueCard.number}
              icon={avgRevenueCard.icon}
              color={avgRevenueCard.color}
              textColor={avgRevenueCard.textColor}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LineGraphSingle
            title="Monthly Recurring Revenue Trend"
            data={mrrData}
            xLabel="Month"
            yLabel="MRR (₹L)"
          />
          <PieChartComponent
            title="Payment Distribution Methods"
            data={paymentMethods}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LineGraphSingle
            title="Refund Rate Trend"
            data={refundData}
            xLabel="Month"
            yLabel="Refunds (%)"
          />
          <LineGraphSingle
            title="Operating Expenses Overview"
            data={expensesData}
            xLabel="Month"
            yLabel="Expenses (₹K)"
          />
        </div>

        <div className="mb-8">
          <ColumnChart
            title="Profit Margin by Department"
            data={profitMargins}
            xLabel="Profit (%)"
            yLabel="Department"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Top Revenue Generating Regions</h3>
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100 text-gray-600 text-sm font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Region</th>
                  <th className="px-4 py-3 text-left">Revenue</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {revenueRegions.map((r, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{r.region}</td>
                    <td className="px-4 py-3">{r.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Outstanding Invoices</h3>
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100 text-gray-600 text-sm font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Region</th>
                  <th className="px-4 py-3 text-left">Pending Invoices</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {outstandingInvoices.map((r, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{r.region}</td>
                    <td className="px-4 py-3">{r.invoices}</td>
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

export default FinanceDashboard;
