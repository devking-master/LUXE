import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUser";
import { Loader2, ArrowLeft, User, Mail, Shield, Calendar, Save } from "lucide-react";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserById, updateUserRole, user, loading, error } = useUsers();
  const [role, setRole] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedUser = await getUserById(id);
      if (fetchedUser) setRole(fetchedUser.role);
    })();
  }, [id, getUserById]);

  const handleRoleUpdate = async () => {
    setSaving(true);
    await updateUserRole(id, role);
    setSaving(false);
    alert("User role updated successfully!");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900 mr-3" />
        <span className="text-zinc-500 font-medium text-sm md:text-base">Loading user...</span>
      </div>
    );
  if (error)
    return (
      <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-sm text-center mt-8">
        {error}
      </div>
    );
  if (!user)
    return (
      <div className="text-center py-12 text-zinc-500 text-sm md:text-base">
        User not found
      </div>
    );

  return (
    <div className="max-w-xl mx-auto space-y-4 md:space-y-6">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 md:p-2 hover:bg-zinc-100 rounded-full transition-colors -ml-1.5 md:-ml-2"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-zinc-600" />
        </button>
        <h1 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900">User Details</h1>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col items-center bg-zinc-50/50 border-b border-zinc-100">
          <img
            src={`https://ui-avatars.com/api/?name=${user.email}&background=18181b&color=fff`}
            alt={user.email}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-md mb-3 md:mb-4"
          />
          <h2 className="text-lg md:text-xl font-bold text-zinc-900 text-center break-all px-4">{user.email}</h2>
          <p className="text-zinc-500 text-xs md:text-sm mt-1 flex items-center gap-1.5 md:gap-2">
            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="p-4 md:p-8 space-y-4 md:space-y-6">
          <div>
            <label className="block text-xs md:text-sm font-medium text-zinc-700 mb-2 flex items-center gap-2">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-zinc-400" /> Role Management
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-zinc-200 rounded-lg px-3 md:px-4 py-2.5 md:py-3 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <button
            onClick={handleRoleUpdate}
            disabled={saving}
            className="w-full bg-zinc-900 text-white px-6 py-2.5 md:py-3 rounded-lg font-medium hover:bg-zinc-800 transition flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/10 disabled:opacity-50 text-sm md:text-base"
          >
            {saving ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : <Save className="w-4 h-4 md:w-5 md:h-5" />}
            Update Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;