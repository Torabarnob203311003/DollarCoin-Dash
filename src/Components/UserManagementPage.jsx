import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa'
import View from './View'

// Dummy users data (at least 20 for pagination demo)
const users = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Client' },
  { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', role: 'Client' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Client' },
  { id: 5, name: 'Eva Green', email: 'eva@example.com', role: 'Admin' },
  { id: 6, name: 'Frank White', email: 'frank@example.com', role: 'Client' },
  { id: 7, name: 'Grace Black', email: 'grace@example.com', role: 'Client' },
  { id: 8, name: 'Henry Blue', email: 'henry@example.com', role: 'Client' },
  { id: 9, name: 'Ivy Red', email: 'ivy@example.com', role: 'Admin' },
  { id: 10, name: 'Jack Orange', email: 'jack@example.com', role: 'Client' },
  { id: 11, name: 'Karen Purple', email: 'karen@example.com', role: 'Client' },
  { id: 12, name: 'Leo Silver', email: 'leo@example.com', role: 'Client' },
  { id: 13, name: 'Mona Gold', email: 'mona@example.com', role: 'Admin' },
  { id: 14, name: 'Nina Pink', email: 'nina@example.com', role: 'Client' },
  { id: 15, name: 'Oscar Gray', email: 'oscar@example.com', role: 'Client' },
  { id: 16, name: 'Paul Cyan', email: 'paul@example.com', role: 'Client' },
  { id: 17, name: 'Quinn Lime', email: 'quinn@example.com', role: 'Admin' },
  { id: 18, name: 'Rita Teal', email: 'rita@example.com', role: 'Client' },
  { id: 19, name: 'Sam Amber', email: 'sam@example.com', role: 'Client' },
  { id: 20, name: 'Tina Violet', email: 'tina@example.com', role: 'Client' },
];

const USERS_PER_PAGE = 8;

function UserManagementPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // Set status based on role: Admin = Approved, Client = Pending
  const usersWithStatus = users.map(u => ({
    ...u,
    status: u.role === 'Admin' ? 'Approved' : 'Pending',
    details: `KYC details for ${u.name}. Address: 123 Main St, City. ID: #${u.id}...`
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
          Showing <span className="text-green-400 font-bold">{currentUsers.length}</span> of <span className="text-green-400 font-bold">{filteredUsers.length}</span> users
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full divide-y divide-green-700 bg-gray-800 rounded-xl">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-green-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-green-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-green-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-green-300 uppercase tracking-wider">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-900">
            {currentUsers.map(user => (
              <tr key={user.id} className="hover:bg-green-900/20 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.status === 'Approved' ? 'bg-green-700 text-green-200' : 'bg-yellow-700 text-yellow-200'}`}>
                    {user.status}
                  </span>
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
                <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                  No users found.
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
        <View user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}

export default UserManagementPage
