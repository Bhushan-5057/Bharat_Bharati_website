"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react"; 

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgGradients = {
    success: "bg-gradient-to-r from-[#FF9933] via-white to-[#138808]", 
    error: "bg-gradient-to-r from-red-500 via-white to-red-700",
    info: "bg-gradient-to-r from-blue-500 via-white to-blue-700",
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-gray-900 font-medium flex items-center justify-between gap-4 ${bgGradients[type]} border border-gray-200`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;
