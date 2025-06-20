import React from "react";

const Spinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-4 border-primary border-t-transparent ${sizeClasses[size]}`}
      role="status"
      aria-label="loading"
    />
  );
};

export default Spinner;