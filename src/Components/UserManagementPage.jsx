import React, { useState, useEffect } from 'react'
import { FaEye, FaSpinner } from 'react-icons/fa'
import View from './View'

const USERS_PER_PAGE = 8;
const API_BASE_URL = 'https://fairly-distributions-enquiry-announcement.trycloudflare.com';
const API_URL = `${API_BASE_URL}/api/v1/admin/applications`;

function UserManagementPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch applications from API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        // Get token from localStorage (you'll need to set this from your auth context)
        const token = localStorage.getItem('authToken');

        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch applications: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          // Transform API data to match your existing structure
          const transformedUsers = result.data.map(application => ({
            id: application._id,
            name: application.accountType === 'business'
              ? application.businessAccount.legalEntityName
              : application.personalAccount.fullName,
            email: application.email,
            role: application.accountType === 'business' ? 'Business' : 'Individual',
            userType: 'Client', // All applications are from clients
            status: application.status.charAt(0).toUpperCase() + application.status.slice(1),
            details: `Application submitted on ${new Date(application.submittedAt).toLocaleDateString()}`,
            // Include the full application data for the View component
            applicationData: application
          }));
          setUsers(transformedUsers);
        } else {
          throw new Error(result.message || 'Failed to fetch applications');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Set status based on userType: Admin = Approved, Client = Pending
  const usersWithStatus = users.map(u => ({
    ...u,
    status: u.userType === 'Admin' ? 'Approved' : u.status,
    details: `KYC details for ${u.name}. Submitted: ${new Date(u.applicationData.submittedAt).toLocaleDateString()}`
  }));

  // Filter users by name or email
  const filteredUsers = usersWithStatus.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIdx = (page - 1) * USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIdx, startIdx + USERS_PER_PAGE);

  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-green-700/30 flex justify-center items-center h-64">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-green-400 mx-auto mb-4" />
          <p className="text-green-300 text-lg">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-red-700/30">
        <div className="text-center text-red-400">
          <h3 className="text-xl font-bold mb-2">Error Loading Applications</h3>
          <p>{error}</p>
          <p className="text-sm text-gray-400 mt-2">
            Please check your authentication token and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-green-700/30">
      <h2 className="text-3xl font-extrabold text-green-400 mb-6 tracking-tight">User Management</h2>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 p-3 rounded-lg bg-gray-800 text-white border border-green-700 focus:outline-none focus:border-green-400 transition"
        />
        <div className="text-sm text-gray-400 mt-2 md:mt-0">
          Showing <span className="text-green-400 font-bold">{currentUsers.length}</span> of <span className="text-green-400 font-bold">{filteredUsers.length}</span> applications
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full divide-y divide-green-700 bg-gray-800 rounded-xl">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-green-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-green-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-green-300 uppercase tracking-wider">Account Type</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-green-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-green-300 uppercase tracking-wider">Submitted</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-green-300 uppercase tracking-wider">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-900">
            {currentUsers.map(user => (
              <tr key={user.id} className="hover:bg-green-900/20 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'Individual' ? 'bg-blue-700 text-blue-200' : 'bg-purple-700 text-purple-200'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.status === 'Approved' ? 'bg-green-700 text-green-200' :
                      user.status === 'Rejected' ? 'bg-red-700 text-red-200' :
                        'bg-yellow-700 text-yellow-200'
                    }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(user.applicationData.submittedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="flex items-center gap-2 text-green-400 hover:text-green-200 font-semibold px-3 py-1 rounded-lg bg-green-900/30 hover:bg-green-800/40 transition"
                    onClick={() => setSelectedUser(user)}
                  >
                    View <FaEye />
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <button
          className="px-6 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg font-semibold transition disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-gray-300 font-semibold">
          Page <span className="text-green-400">{page}</span> of <span className="text-green-400">{totalPages}</span>
        </span>
        <button
          className="px-6 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg font-semibold transition disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      {/* View Modal */}
      {selectedUser && (
        <View
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          baseUrl={API_BASE_URL}
        />
      )}
    </div>
  )
}

export default UserManagementPage