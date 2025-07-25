import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "../components/Card";
import NumericCard from "../components/NumericCard";
import LineGraphSingle from "../components/LineGraphSingle";
import BarChartComponent from "../components/BarChartComponent";
import FunnelChart from "../components/FunnelChart";
import GaugeChart from "../components/GaugeChart";

function EngagementDashboard() {
  const [newAccounts, setNewAccounts] = useState(null);
  const [arpuCard, setArpuCard] = useState(null);
  const [activationFunnel, setActivationFunnel] = useState([]);
  const [dailyUsers, setDailyUsers] = useState([]);
  const [monthlyUsers, setMonthlyUsers] = useState([]);
  const [engagementRate, setEngagementRate] = useState([]);
  const [satisfactionScore, setSatisfactionScore] = useState(null); // static value for now
  const [satisfactionCards, setSatisfactionCards] = useState([]);
  const [churnRate, setChurnRate] = useState([]);
  const [retentionRate, setRetentionRate] = useState([]);
  const [arpuTrend, setArpuTrend] = useState([]);
  const [customerGrowth, setCustomerGrowth] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAllEngagementData = async () => {
      try {
        const [
          accountsRes,
          arpuRes,
          funnelRes,
          dailyRes,
          monthlyRes,
          rateRes,
          cardsRes,
          churnRes,
          retentionRes,
          trendRes,
          growthRes,
        ] = await Promise.all([
          axios.get("/api/new-accounts-engagement", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/arpu-engagement", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/activation-funnel-engagement", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/daily-users-engagement", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/monthly-users-engagement", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/engagement-rate-engagement", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/satisfaction-cards-engagement", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/churn-rate-engagement", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/retention-rate-engagement", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/arpu-trend-engagement", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/customer-growth-engagement", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setNewAccounts(accountsRes.data[0]);
        setArpuCard(arpuRes.data[0]);
        setActivationFunnel(funnelRes.data);
        setDailyUsers(dailyRes.data);
        setMonthlyUsers(monthlyRes.data);
        setEngagementRate(rateRes.data);
        setSatisfactionCards(cardsRes.data);
        setSatisfactionScore(4.5); // 🔧 can be dynamic later
        setChurnRate(churnRes.data);
        setRetentionRate(retentionRes.data);
        setArpuTrend(trendRes.data);
        setCustomerGrowth(growthRes.data);
      } catch (err) {
        console.error("Error loading engagement data", err);
      }
    };

    fetchAllEngagementData();
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Engagement Dashboard</h2>

        {/* KPI + ARPU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {newAccounts && (
            <Card
              title={newAccounts.title}
              value={newAccounts.value}
              period={newAccounts.period}
              growth={newAccounts.growth}
            />
          )}
          {arpuCard && (
            <NumericCard
              label={arpuCard.label}
              number={arpuCard.number}
              icon={arpuCard.icon}
              color={arpuCard.color}
              textColor={arpuCard.textColor}
            />
          )}
        </div>

        {/* Active Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LineGraphSingle title="Daily Active Users" data={dailyUsers} xLabel="Day" yLabel="Users" />
          <LineGraphSingle title="Monthly Active Users" data={monthlyUsers} xLabel="Month" yLabel="Users" />
        </div>

        {/* Funnel + Region */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <FunnelChart title="Activation Funnel" data={activationFunnel} xLabel="Stage" yLabel="Users" />
          <BarChartComponent title="Engagement Rate" data={engagementRate} xLabel="City" yLabel="Engagement (%)" />
        </div>

        {/* Satisfaction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <GaugeChart title="Overall Satisfaction" value={satisfactionScore} max={5} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {satisfactionCards.map((card, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 text-center border border-gray-200">
                <h4 className="text-lg font-medium text-gray-800">{card.label}</h4>
                <p className="text-2xl font-bold text-indigo-600">{card.score} / 5</p>
              </div>
            ))}
          </div>
        </div>

        {/* Churn + Retention */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LineGraphSingle title="Churn Rate Over Time" data={churnRate} xLabel="Month" yLabel="Churn (%)" />
          <BarChartComponent title="Monthly Retention Rate" data={retentionRate} xLabel="Month" yLabel="Retention (%)" />
        </div>

        {/* ARPU Trend + Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LineGraphSingle title="Average Revenue Per User (ARPU)" data={arpuTrend} xLabel="Month" yLabel="₹" />
          <BarChartComponent title="New Customer Growth Trend" data={customerGrowth} xLabel="Month" yLabel="Accounts" />
        </div>
      </div>
    </div>
  );
}

export default EngagementDashboard;
