import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Edit2, Trash2, Filter } from 'lucide-react';

const Points = () => {
  const [pointsSystemEnabled, setPointsSystemEnabled] = useState(true);
  const [issuePoints, setIssuePoints] = useState('');
  const [pointGenerationBasis, setPointGenerationBasis] = useState('');
  const [pointsToGive, setPointsToGive] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'user name',
      userId: 'user id',
      phone: 'phone no.',
      email: 'email id',
      totalPointsAlloted: 1000000,
      totalPointsRedeemed: 10,
      balance: 5,
      deletedAccount: false
    },
    {
      id: 2,
      name: 'user name',
      userId: 'user id',
      phone: 'phone no.',
      email: 'email id',
      totalPointsAlloted: 1000000,
      totalPointsRedeemed: 10,
      balance: 5,
      deletedAccount: false
    }
  ]);

  const summaryData = {
    totalPointsAlloted: 1000000,
    totalPointsRedeemed: 10,
    balance: 5
  };

  const handleAllotNow = (userId) => {
    // Handle point allocation logic
    console.log('Alloting points to user:', userId);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen relative">
      {/* Header */}
      <div className="absolute left-[50px] top-[60px]">
        <h1 className="text-[32px] font-bold text-black leading-6 mb-2">point management</h1>
      </div>
      
      <div className="absolute left-[50px] top-[140px]">
        <p className="text-[20px] font-bold text-black leading-6">Point management system</p>
      </div>

      {/* Toggle Switch */}
      <div className="absolute left-[346px] top-[124px] flex items-center gap-2">
        <button
          onClick={() => setPointsSystemEnabled(true)}
          className={`h-[34px] w-[69px] rounded-[100px] border border-black flex items-center justify-center ${
            pointsSystemEnabled 
              ? 'bg-[#000aff] text-white' 
              : 'bg-white text-black'
          }`}
        >
          <span className="text-[16px] font-medium">On</span>
        </button>
        <button
          onClick={() => setPointsSystemEnabled(false)}
          className={`h-[34px] w-[76px] rounded-[100px] border flex items-center justify-center ${
            !pointsSystemEnabled 
              ? 'bg-[#000aff] text-white border-black' 
              : 'bg-white text-black border-[#e4e4e4]'
          }`}
        >
          <span className="text-[16px] font-medium">Off</span>
        </button>
      </div>

      {/* Issue Points Section */}
      <div className="absolute left-[50px] top-[195px]">
        <label className="block text-[21px] font-medium text-black mb-4">
          Issue points
        </label>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={issuePoints}
            onChange={(e) => setIssuePoints(e.target.value)}
            className="w-[325px] h-[47px] px-4 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=""
          />
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Edit2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Point Generation Basis */}
      <div className="absolute left-[50px] top-[293px]">
        <label className="block text-[21px] font-medium text-black mb-4">
          point generated on basis
        </label>
        <div className="relative w-[325px]">
          <select
            value={pointGenerationBasis}
            onChange={(e) => setPointGenerationBasis(e.target.value)}
            className="w-full h-[47px] px-4 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="">Select basis</option>
            <option value="purchase">Purchase Amount</option>
            <option value="referral">Referral</option>
            <option value="signup">Sign Up</option>
            <option value="review">Product Review</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] text-gray-600 pointer-events-none" />
        </div>
      </div>

      {/* Give Points to User */}
      <div className="absolute left-[50px] top-[384px]">
        <label className="block text-[21px] font-medium text-black mb-4">
          give points to user
        </label>
        <input
          type="text"
          value={pointsToGive}
          onChange={(e) => setPointsToGive(e.target.value)}
          className="w-[325px] h-[47px] px-4 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder=""
        />
      </div>

      {/* Select User Section */}
      <div className="absolute left-[50px] top-[538px]">
        <h2 className="text-[32px] font-bold text-black leading-6 mb-6">Select user</h2>
        
        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#d0d5dd] rounded-lg hover:bg-gray-50 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
            <Filter className="w-5 h-5 text-[#344054]" />
            <span className="text-[14px] text-[#344054]">Filters</span>
          </button>
          <div className="relative w-[320px]">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-[#667085]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full h-11 pl-10 pr-4 py-2 border border-[#d0d5dd] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] text-[16px] text-[#667085]"
            />
          </div>
        </div>

        {/* User Table Header */}
        <div className="grid grid-cols-9 gap-4 mb-4">
          <div className="text-[20px] text-black text-center">user name</div>
          <div className="text-[16px] text-black text-center">user id</div>
          <div className="text-[16px] text-black text-center">phone no.</div>
          <div className="text-[16px] text-black text-center">email id</div>
          <div className="text-[16px] text-black text-center">total points alloted</div>
          <div className="text-[16px] text-black text-center">total points redeemed</div>
          <div className="text-[16px] text-black text-center">balance</div>
          <div className="text-[16px] text-black text-center">deleted account</div>
          <div className="text-[16px] text-black text-center">allot points</div>
        </div>

        {/* User Table Rows */}
        <div className="space-y-4">
          {filteredUsers.map((user, index) => (
            <div key={user.id} className="grid grid-cols-9 gap-4 items-center">
              <div className="text-[20px] text-black text-center">{user.name}</div>
              <div className="text-[16px] text-black text-center">{user.userId}</div>
              <div className="text-[16px] text-black text-center">{user.phone}</div>
              <div className="text-[16px] text-black text-center">{user.email}</div>
              <div className="flex justify-center">
                <div className="w-[133px] h-[47px] border-2 border-black rounded-xl flex items-center justify-center">
                  <span className="text-[21px] text-[#4379ee] font-medium">{user.totalPointsAlloted.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-[133px] h-[47px] border-2 border-black rounded-xl flex items-center justify-center">
                  <span className="text-[21px] text-black font-medium">{user.totalPointsRedeemed}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-[133px] h-[47px] border-2 border-black rounded-xl flex items-center justify-center">
                  <span className="text-[21px] text-[#ef3826] font-medium">{user.balance}</span>
                </div>
              </div>
              <div className="text-[16px] text-black text-center">{user.deletedAccount ? 'Yes' : 'No'}</div>
              <div className="flex justify-center">
                <button
                  onClick={() => handleAllotNow(user.id)}
                  className="bg-[#000aff] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-[14px] border border-[#7280ff] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                >
                  Allot NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Sidebar */}
      <div className="absolute right-[50px] top-[109px] w-[280px]">
        <h3 className="text-[24px] font-bold text-black leading-6 mb-6">Summary</h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-[21px] text-black">total points alloted</span>
            <span className="text-[21px] text-[#4379ee] font-medium">
              {summaryData.totalPointsAlloted.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[21px] text-black">total points redeemed</span>
            <span className="text-[21px] text-black font-medium">
              {summaryData.totalPointsRedeemed}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[21px] text-black">balance</span>
            <span className="text-[21px] text-[#ef3826] font-medium">
              {summaryData.balance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Points;
