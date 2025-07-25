import React from "react";

const NumericCard = ({ label, number, icon, color = "bg-indigo-100", textColor = "text-indigo-600" }) => {
  return (
    <div className={`rounded-lg shadow-md p-6 ${color} hover:shadow-lg transition flex items-center justify-between`}>
      <div>
        <h4 className={`text-sm font-medium ${textColor} mb-1`}>{label}</h4>
        <p className={`text-3xl font-bold ${textColor}`}>{number}</p>
      </div>
      <div className="text-4xl">
        {icon}
      </div>
    </div>
  );
};

export default NumericCard;
