import React from "react";
import {
  FunnelChart as ReFunnelChart,
  Funnel,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const FunnelChartComponent = ({ data, title }) => {
  // Assign colors directly into each data entry
  const coloredData = data.map((entry, index) => {
    const colors = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA"];
    return { ...entry, fill: colors[index % colors.length] };
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ReFunnelChart>
          <Tooltip />
          <Funnel dataKey="value" data={coloredData} isAnimationActive>
            <LabelList position="right" dataKey="label" fill="#374151" stroke="none" />
          </Funnel>
        </ReFunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FunnelChartComponent;
