import React from "react";

const VelpLogo = ({ className = "w-16 h-16" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gray-900 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-xl">VE</span>
      </div>
    </div>
  );
};

export default VelpLogo;