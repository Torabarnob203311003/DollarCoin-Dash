import React, { useState } from 'react';
import { FaUsers, FaUserCheck, FaUserShield, FaChartBar, FaSearch } from 'react-icons/fa';

// --- Card Component Utility ---
const DashboardCard = ({ title, value, icon: Icon, color }) => (
  <div className={`p-6 rounded-xl shadow-lg flex items-center justify-between border-l-4 ${color.border} ${color.bg} transition duration-300 hover:shadow-2xl`}>
    <div>
      <h4 className="text-sm font-medium text-gray-400">{title}</h4>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
    <Icon className={`w-10 h-10 ${color.icon} opacity-30`} />
  </div>
);

// Helper to format time ago
function timeAgo(date) {
  const now = new Date();
  const diff = (now - date) / 1000; // seconds
  if (diff < 60) return `${Math.floor(diff)} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export default function DashboardOverview() {
  const userStats = {
    total: 1200,
    active: 875,
    admins: 12,
  };

  // Dummy monthly user growth data (can be used for chart integration later)
  // const monthlyData = [{ month: 'Jan', users: 120 }];

  // Dummy activity data
  const activityData = [
    { id: 1, user: 'John Doe', action: 'logged in', time: new Date(Date.now() - 5 * 60 * 1000) },
    { id: 2, user: 'Jane Smith', action: 'updated settings', time: new Date(Date.now() - 60 * 60 * 1000) },
    { id: 3, user: 'Alice', action: 'registered', time: new Date(Date.now() - 3 * 60 * 60 * 1000) },
    { id: 4, user: 'Bob', action: 'logged in', time: new Date(Date.now() - 26 * 60 * 60 * 1000) },
    { id: 5, user: 'Charlie', action: 'logged in', time: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
    { id: 6, user: 'Eva', action: 'updated settings', time: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) },
    { id: 7, user: 'Frank', action: 'registered', time: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
    { id: 8, user: 'Grace', action: 'logged in', time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 9, user: 'Helen', action: 'registered', time: new Date(Date.now() - 6 * 60 * 60 * 1000) },
    { id: 10, user: 'Ian', action: 'updated settings', time: new Date(Date.now() - 10 * 60 * 60 * 1000) },
    { id: 11, user: 'Jack', action: 'logged in', time: new Date(Date.now() - 20 * 60 * 60 * 1000) },
    { id: 12, user: 'Kathy', action: 'registered', time: new Date(Date.now() - 30 * 60 * 60 * 1000) },
    { id: 13, user: 'Liam', action: 'updated settings', time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { id: 14, user: 'Mona', action: 'logged in', time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
    { id: 15, user: 'Nina', action: 'registered', time: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) },
    { id: 16, user: 'Oscar', action: 'logged in', time: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000) },
  ];

  const [activityFilter, setActivityFilter] = useState('24h');
  const [activitySearch, setActivitySearch] = useState('');
  const [activityPage, setActivityPage] = useState(1);

  const ACTIVITY_PER_PAGE = 8;

  // Filter logic
  const now = new Date();
  const filterMap = {
    '24h': 1,
    '3d': 3,
    '7d': 7,
    '15d': 15,
  };
  const days = filterMap[activityFilter] || 1;
  const filteredActivity = activityData.filter(
    act =>
      (now - act.time) / (1000 * 60 * 60 * 24) <= days &&
      (act.user.toLowerCase().includes(activitySearch.toLowerCase()) ||
        act.action.toLowerCase().includes(activitySearch.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredActivity.length / ACTIVITY_PER_PAGE);
  const startIdx = (activityPage - 1) * ACTIVITY_PER_PAGE;
  const currentActivity = filteredActivity.slice(startIdx, startIdx + ACTIVITY_PER_PAGE);

  // Reset to first page when filter/search changes
  React.useEffect(() => {
    setActivityPage(1);
  }, [activityFilter, activitySearch]);

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Dashboard Overview</h1>

      {/* --- 1. User Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Total Users" 
          value={userStats.total} 
          icon={FaUsers} 
          color={{ border: 'border-green-500', bg: 'bg-gray-800', icon: 'text-green-500' }}
        />
        <DashboardCard 
          title="Active Users" 
          value={userStats.active} 
          icon={FaUserCheck} 
          color={{ border: 'border-blue-500', bg: 'bg-gray-800', icon: 'text-blue-500' }}
        />
        <DashboardCard 
          title="Admin Users" 
          value={userStats.admins} 
          icon={FaUserShield} 
          color={{ border: 'border-yellow-500', bg: 'bg-gray-800', icon: 'text-yellow-500' }}
        />
      </div>

      {/* --- 2. Quick Links/Activity --- */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-green-700/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 border-b border-gray-700 pb-3 gap-4">
          <h2 className="text-xl font-semibold text-white">User Status Activity</h2>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search user or action..."
                value={activitySearch}
                onChange={e => setActivitySearch(e.target.value)}
                className="p-2 pl-10 rounded bg-gray-700 text-white border border-green-700 focus:outline-none focus:border-green-400 transition"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <select
              value={activityFilter}
              onChange={e => setActivityFilter(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white border border-green-700 focus:outline-none focus:border-green-400 transition"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="3d">Last 3 Days</option>
              <option value="7d">Last 7 Days</option>
              <option value="15d">Last 15 Days</option>
            </select>
          </div>
        </div>
        <ul className="space-y-3 text-gray-400">
          {currentActivity.length === 0 ? (
            <li className="text-center text-gray-500 py-4">No activity found matching the filter.</li>
          ) : (
            currentActivity.map(act => (
              <li key={act.id} className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-lg transition">
                <span>
                  <span className="text-green-400 font-semibold">{act.user}</span> {act.action}.
                </span>
                <span className="text-xs text-gray-500">{timeAgo(act.time)}</span>
              </li>
            ))
          )}
        </ul>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg font-semibold transition disabled:opacity-50"
              onClick={() => setActivityPage(activityPage - 1)}
              disabled={activityPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-300 font-semibold">
              Page <span className="text-green-400">{activityPage}</span> of <span className="text-green-400">{totalPages}</span>
            </span>
            <button
              className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg font-semibold transition disabled:opacity-50"
              onClick={() => setActivityPage(activityPage + 1)}
              disabled={activityPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* --- 3. Analytics (Graph Area) - Use this simple placeholder structure --- */}
      {/* <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-blue-700/30">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FaChartBar className="mr-3 text-blue-400" />
            Monthly User Growth (Chart Placeholder)
        </h2>
        
        <div className="w-full h-80 bg-gray-700/70 rounded-lg flex items-center justify-center text-gray-400 border border-dashed border-gray-600">
            Analytics Chart Integration Area
        </div>
      </div> */}
    </div>
  );
}