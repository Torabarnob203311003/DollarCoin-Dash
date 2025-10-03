// src/components/DashboardOverview.jsx
import React from 'react';
import { FaUsers, FaUserCheck, FaUserShield, FaChartBar, FaSearch } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

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

export default function DashboardOverview() {
  const userStats = {
    total: 1200,
    active: 875,
    admins: 12,
  };

  // Dummy monthly user growth data
  const monthlyData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 140 },
    { month: 'Mar', users: 160 },
    { month: 'Apr', users: 180 },
    { month: 'May', users: 200 },
    { month: 'Jun', users: 220 },
    { month: 'Jul', users: 240 },
    { month: 'Aug', users: 260 },
    { month: 'Sep', users: 280 },
    { month: 'Oct', users: 300 },
    { month: 'Nov', users: 320 },
    { month: 'Dec', users: 340 },
  ];

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
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <button className="text-sm text-green-400 hover:text-green-300">View All Logs</button>
        </div>
        
        <ul className="space-y-3 text-gray-400">
          <li className="flex justify-between items-center p-2 bg-gray-700/50 rounded-lg">
            <span>User **John Doe** logged in.</span>
            <span className="text-xs text-gray-500">5 minutes ago</span>
          </li>
          <li className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-lg transition">
            <span>Admin **Jane Smith** updated settings.</span>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </li>
          <li className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-lg transition">
            <span>New user **Alice** registered.</span>
            <span className="text-xs text-gray-500">3 hours ago</span>
          </li>
        </ul>
      </div>

      {/* --- 3. Analytics (Graph Area) --- */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-blue-700/30">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FaChartBar className="mr-3 text-blue-400" />
          Monthly User Growth
        </h2>
        <div className="w-full h-80 bg-gray-700/70 rounded-lg flex items-center justify-center border border-dashed border-gray-600">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ color: '#fff' }} />
              <Bar dataKey="users" fill="#3b82f6" name="Users" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}