import React, { useState } from 'react';

const InviteAFriend = () => {
  const [isToggleOn, setIsToggleOn] = useState(true);
  const [userName, setUserName] = useState('');
  const [codeToIssue, setCodeToIssue] = useState('');
  const [codeLimit, setCodeLimit] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [issuedCodes, setIssuedCodes] = useState([
    {
      id: 1,
      username: 'Rithik',
      code: 'RITHIK27',
      description: 'Invite a friend and get additional 10% off on your 1st purchase'
    },
    {
      id: 2,
      username: 'Rithik',
      code: 'RITHIK27',
      description: 'Invite a friend and get additional 10% off on your 1st purchase'
    }
  ]);

  const handleIssueCode = () => {
    if (userName && codeToIssue && codeLimit && codeValue) {
      const newCode = {
        id: issuedCodes.length + 1,
        username: userName,
        code: codeToIssue.toUpperCase(),
        description: 'Invite a friend and get additional 10% off on your 1st purchase'
      };
      setIssuedCodes([...issuedCodes, newCode]);
      
      // Reset form
      setUserName('');
      setCodeToIssue('');
      setCodeLimit('');
      setCodeValue('');
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  const handleEditCode = (id) => {
    // Implement edit functionality
    console.log('Edit code:', id);
  };

  const handleDeleteCode = (id) => {
    setIssuedCodes(issuedCodes.filter(code => code.id !== id));
  };

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Main Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black mb-4">
          Invite a friend with a referral code
        </h1>
        
        {/* Toggle Section */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-2xl font-bold text-black">
            Invite a friend with a referral code
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsToggleOn(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                isToggleOn
                  ? 'bg-blue-600 text-white border-black'
                  : 'bg-white text-black border-gray-300'
              }`}
            >
              On
            </button>
            <button
              onClick={() => setIsToggleOn(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                !isToggleOn
                  ? 'bg-blue-600 text-white border-black'
                  : 'bg-white text-black border-gray-300'
              }`}
            >
              Off
            </button>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-md space-y-6">
        {/* Generate referral code user name */}
        <div>
          <label className="block text-xl font-bold text-black mb-2">
            Generate referral code user name
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
            placeholder="Enter username"
          />
        </div>

        {/* Code to issue */}
        <div>
          <label className="block text-xl font-bold text-black mb-2">
            code to issue
          </label>
          <input
            type="text"
            value={codeToIssue}
            onChange={(e) => setCodeToIssue(e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
            placeholder="Enter code"
          />
        </div>

        {/* Code limit */}
        <div>
          <label className="block text-xl font-bold text-black mb-2">
            code limit
          </label>
          <input
            type="number"
            value={codeLimit}
            onChange={(e) => setCodeLimit(e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
            placeholder="Enter limit"
          />
        </div>

        {/* Code value */}
        <div>
          <label className="block text-xl font-bold text-black mb-2">
            code value
          </label>
          <input
            type="text"
            value={codeValue}
            onChange={(e) => setCodeValue(e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
            placeholder="Enter value"
          />
        </div>

        {/* Issue code button */}
        <button
          onClick={handleIssueCode}
          className="w-full bg-gray-800 text-white py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
        >
          Issue code
        </button>
      </div>

      {/* Issued codes section */}
      <div className="max-w-md mt-12">
        <h2 className="text-xl font-bold text-black mb-6">Issued codes</h2>
        
        <div className="space-y-4">
          {issuedCodes.map((code) => (
            <div key={code.id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
              {/* Code header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {code.username}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCode(code.id)}
                    className="p-2 text-gray-600 hover:text-gray-800"
                    title="Edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m18 2 4 4-14 14H4v-4L18 2z"/>
                      <path d="m14.5 5.5 4 4"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteCode(code.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6"/>
                      <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Divider line */}
              <hr className="border-gray-300 mb-3" />

              {/* Code section */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => handleCopyCode(code.code)}
                  className="p-1 text-gray-600 hover:text-gray-800"
                  title="Copy code"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="m5,15H4a2,2 0 0,1-2-2V4a2,2 0 0,1,2-2h9a2,2 0 0,1,2,2v1"/>
                  </svg>
                </button>
                <span className="text-sm text-gray-600 uppercase">{code.code}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600">
                {code.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InviteAFriend;
