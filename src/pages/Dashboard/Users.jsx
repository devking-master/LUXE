import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUser";
import { Loader2, Trash2, Eye } from "lucide-react";

const Users = () => {
  const { users, loading, error, getUsers, deleteUser } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900 mr-3" />
        <span className="text-zinc-500 text-lg">Loading users...</span>
      </div>
    );
    
  if (error)
    return (
      <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-center mt-8">
        {error}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Users</h1>
            <p className="text-zinc-500">Manage system users and access roles.</p>
         </div>
         {/* <button className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium">Add User</button> */}
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-zinc-100">
              {!Array.isArray(users) || users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">
                    No users found in the system.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900">{u.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-zinc-100 text-zinc-800"
                      }`}>
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
                         year: 'numeric',
                         month: 'short',
                         day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/dashboard/users/${u._id}`)}
                        className="p-1.5 text-zinc-500 hover:bg-zinc-100 rounded-md transition"
                        title="View Details"
                      >
                         <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                           if(window.confirm('Are you sure?')) deleteUser(u._id);
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition"
                         title="Delete User"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;