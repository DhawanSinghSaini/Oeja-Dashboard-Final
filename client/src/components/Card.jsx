import React from "react";

const Card = ({ title, value, period, growth }) => {
  return (
    <div className="bg-gradient-to-r from-green-300 via-teal-300 to-blue-300 rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-md font-semibold text-white">{title}</h3>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-sm text-white/80 mt-1">{period}</p>
        </div>
        <div className="flex items-center gap-1 text-white font-medium text-sm">
          <span>{growth > 0 ? "📈" : "📉"}</span>
          <span className={growth > 0 ? "text-green-100" : "text-red-100"}>
            {growth}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
