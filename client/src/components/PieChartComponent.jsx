import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PieChartComponent = ({ data, title }) => {
  const COLORS = [
  "#6366F1", // Indigo
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#3B82F6", // Blue
  "#E11D48", // Rose
  "#8B5CF6", // Violet
  "#14B8A6", // Teal
  "#84CC16", // Lime
  "#F97316", // Orange
  "#A855F7", // Purple
  "#22D3EE", // Cyan
  "#D946EF", // Fuchsia
  "#F43F5E", // Pink
  "#EC4899", // Hot Pink
  "#0EA5E9", // Sky Blue
  "#FACC15", // Yellow
  "#38BDF8", // Light Blue
  "#4ADE80", // Light Green
  "#E879F9"  // Lavender
];


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
