import React from 'react'

// Dummy users data
const users = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Client' },
  { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', role: 'Client' },
];

function UserManagementPage() {
  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-400 mb-4">User Management</h2>
      <table className="min-w-full divide-y divide-gray-700 bg-gray-800 rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManagementPage
