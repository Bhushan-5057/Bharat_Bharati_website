"use client";
import React, { useEffect } from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const toastStyles = {
  success: "bg-green-100 text-green-800 border-green-300",
  error: "bg-red-100 text-red-800 border-red-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
};

const icons = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
};

const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-md transition-all duration-300 ${toastStyles[type]}`}
    >
      {icons[type]}
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-800 focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
