import React from 'react';

const TestPage = () => {
  console.log('TestPage is rendering!');
  return (
    <div className="p-8 bg-red-100">
      <h1 className="text-2xl font-bold text-red-900 mb-4">🔴 TEST PAGE - WORKING!</h1>
      <p className="text-red-600">
        This is a test page to verify that the layout and routing are working correctly.
      </p>
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-lg font-semibold text-red-900">Layout Test</h2>
        <p className="text-red-700">
          If you can see this RED page with the sidebar and header, then the layout is working correctly.
        </p>
      </div>
    </div>
  );
};

export default TestPage;
