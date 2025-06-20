import React from "react";

interface EnhancedLoadingProps {
  type?: "spinner" | "skeleton" | "pulse";
  message?: string;
  className?: string;
}

const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  type = "spinner",
  message = "Loading...",
  className = "",
}) => {
  const renderSpinner = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
  );

  const renderSkeleton = () => (
    <div className="space-y-4 w-full max-w-md">
      <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
    </div>
  );

  const renderPulse = () => (
    <div className="flex space-x-4">
      <div className="rounded-full bg-gray-300 h-12 w-12 animate-pulse"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
      </div>
    </div>
  );

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-50 ${className}`}
    >
      <div className="text-center">
        {type === "spinner" && renderSpinner()}
        {type === "skeleton" && renderSkeleton()}
        {type === "pulse" && renderPulse()}
        <p className="text-gray-600 text-lg mt-4">{message}</p>
      </div>
    </div>
  );
};

export default EnhancedLoading;
