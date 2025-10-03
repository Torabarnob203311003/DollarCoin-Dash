// src/components/AuthLayout.jsx
import React from 'react';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6 border border-green-700/50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}