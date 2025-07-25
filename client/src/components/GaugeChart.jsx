import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const GaugeChart = ({ value, title }) => {
  const total = 100;
  const data = [
    { value },
    { value: total - value },
  ];

  const COLORS = ["#10B981", "#E5E7EB"]; // green + gray

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="100%"
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <p className="text-3xl font-bold text-green-600">{value}%</p>
        <p className="text-sm text-gray-500">Utilization</p>
      </div>
    </div>
  );
};

export default GaugeChart;
