import React from "react";

const Messages = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mb-6 bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-4xl mb-6 font-bold text-gray-900 tracking-tight">
          Messages
        </h1>
        <p className="text-gray-600">
          Manage customer messages and communications
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Message Center
        </h3>
        <p className="text-gray-600">
          This page will display customer messages, support tickets, and
          communication tools.
        </p>
      </div>
    </div>
  );
};

export default Messages;
