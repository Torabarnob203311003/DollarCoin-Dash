/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FaUsers, FaUserCheck, FaUserShield, FaChartBar, FaSearch, FaFileAlt, FaClock, FaCheck, FaTimes } from 'react-icons/fa';

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
  const diff = (now - new Date(date)) / 1000; // seconds
  if (diff < 60) return `${Math.floor(diff)} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-500 text-yellow-900', icon: FaClock },
    approved: { color: 'bg-green-500 text-green-900', icon: FaCheck },
    rejected: { color: 'bg-red-500 text-red-900', icon: FaTimes }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const IconComponent = config.icon;

  return (
    <span className={`px-2 py-1 rounded-full w-20 text-xs font-semibold flex items-center gap-1 ${config.color}`}>
      <IconComponent className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Account type badge component
const AccountTypeBadge = ({ type }) => {
  const typeConfig = {
    personal: { color: 'bg-blue-500 text-blue-900', text: 'Personal' },
    business: { color: 'bg-purple-500 text-purple-900', text: 'Business' }
  };

  const config = typeConfig[type] || typeConfig.personal;

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.color}`}>
      {config.text}
    </span>
  );
};

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken') || localStorage.getItem('token');
};

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    personalAccounts: 0,
    businessAccounts: 0,
    recentApplications: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activityFilter, setActivityFilter] = useState('24h');
  const [activitySearch, setActivitySearch] = useState('');
  const [activityPage, setActivityPage] = useState(1);

  const ACTIVITY_PER_PAGE = 8;

  // Fetch dashboard stats from API
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const authToken = getAuthToken();

        if (!authToken) {
          throw new Error('Authentication token not found. Please log in again.');
        }

        const response = await fetch('https://fairly-distributions-enquiry-announcement.trycloudflare.com/api/v1/admin/dashboard/stats', {
          method: 'GET',
          headers: {
            'Authorization': `${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication failed. Please log in again.');
          } else if (response.status === 403) {
            throw new Error('Access denied. You do not have permission to view dashboard statistics.');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const result = await response.json();

        if (result.success) {
          setStats(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch dashboard statistics');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching dashboard stats:', err);

        // If it's an authentication error, you might want to redirect to login
        if (err.message.includes('Authentication') || err.message.includes('unauthorized')) {
          // Optional: Redirect to login page or show login modal
          console.warn('Authentication issue detected');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  // Filter logic for recent applications
  const now = new Date();
  const filterMap = {
    '24h': 1,
    '3d': 3,
    '7d': 7,
    '15d': 15,
  };

  const days = filterMap[activityFilter] || 1;
  const filteredActivity = stats.recentApplications.filter(
    app =>
      (now - new Date(app.submittedAt)) / (1000 * 60 * 60 * 24) <= days &&
      (app.email.toLowerCase().includes(activitySearch.toLowerCase()) ||
        app.status.toLowerCase().includes(activitySearch.toLowerCase()) ||
        app.accountType.toLowerCase().includes(activitySearch.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredActivity.length / ACTIVITY_PER_PAGE);
  const startIdx = (activityPage - 1) * ACTIVITY_PER_PAGE;
  const currentActivity = filteredActivity.slice(startIdx, startIdx + ACTIVITY_PER_PAGE);

  // Reset to first page when filter/search changes
  useEffect(() => {
    setActivityPage(1);
  }, [activityFilter, activitySearch]);

  // Function to handle retry with token refresh (if needed)
  const handleRetry = () => {
    // Clear error and retry fetching
    setError(null);
    setLoading(true);

    // You might want to add token refresh logic here if needed
    const fetchData = async () => {
      try {
        const authToken = getAuthToken();

        if (!authToken) {
          throw new Error('Authentication token not found. Please log in again.');
        }

        const response = await fetch('https://neighbor-sleeping-information-duck.trycloudflare.com/api/v1/admin/dashboard/stats', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setStats(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch dashboard statistics');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  // Function to handle logout or redirect to login
  const handleGoToLogin = () => {
    // Clear local storage and redirect to login
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    // You can redirect to your login page here
    window.location.href = '/login'; // Adjust the path as needed
  };

  if (loading) {
    return (
      <div className="space-y-8 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-green-400 text-xl">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8 p-6">
        <div className="bg-red-900/20 border border-red-700 rounded-xl p-6 text-center">
          <div className="text-red-400 text-xl mb-2">Error Loading Dashboard</div>
          <div className="text-gray-400 mb-4">{error}</div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg font-semibold transition"
            >
              Retry
            </button>
            {(error.includes('Authentication') || error.includes('unauthorized') || !getAuthToken()) && (
              <button
                onClick={handleGoToLogin}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
              >
                Go to Login
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Dashboard Overview</h1>

      {/* --- 1. Application Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={FaFileAlt}
          color={{ border: 'border-green-500', bg: 'bg-gray-800', icon: 'text-green-500' }}
        />
        <DashboardCard
          title="Pending Applications"
          value={stats.pendingApplications}
          icon={FaClock}
          color={{ border: 'border-yellow-500', bg: 'bg-gray-800', icon: 'text-yellow-500' }}
        />
        <DashboardCard
          title="Approved Applications"
          value={stats.approvedApplications}
          icon={FaCheck}
          color={{ border: 'border-blue-500', bg: 'bg-gray-800', icon: 'text-blue-500' }}
        />
      </div>

      {/* --- 2. Additional Stats Row --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Rejected Applications"
          value={stats.rejectedApplications}
          icon={FaTimes}
          color={{ border: 'border-red-500', bg: 'bg-gray-800', icon: 'text-red-500' }}
        />
        <DashboardCard
          title="Personal Accounts"
          value={stats.personalAccounts}
          icon={FaUserCheck}
          color={{ border: 'border-purple-500', bg: 'bg-gray-800', icon: 'text-purple-500' }}
        />
        <DashboardCard
          title="Business Accounts"
          value={stats.businessAccounts}
          icon={FaUsers}
          color={{ border: 'border-indigo-500', bg: 'bg-gray-800', icon: 'text-indigo-500' }}
        />
      </div>

      {/* --- 3. Recent Applications Activity --- */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-green-700/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 border-b border-gray-700 pb-3 gap-4">
          <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by email, status, or type..."
                value={activitySearch}
                onChange={e => setActivitySearch(e.target.value)}
                className="p-2 pl-10 rounded bg-gray-700 text-white border border-green-700 focus:outline-none focus:border-green-400 transition w-64"
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

        <div className="overflow-x-auto">
          <table className="w-full text-gray-400">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-2">Email</th>
                <th className="text-left py-3 px-2">Account Type</th>
                <th className="text-left py-3 px-2">Status</th>
                <th className="text-left py-3 px-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {currentActivity.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No applications found matching the filter.
                  </td>
                </tr>
              ) : (
                currentActivity.map(app => (
                  <tr key={app._id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition">
                    <td className="py-3 px-2">
                      <span className="text-green-400 font-semibold">{app.email}</span>
                    </td>
                    <td className="py-3 px-2">
                      <AccountTypeBadge type={app.accountType} />
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="py-3 px-2 text-xs text-gray-500">
                      {timeAgo(app.submittedAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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
    </div>
  );
}