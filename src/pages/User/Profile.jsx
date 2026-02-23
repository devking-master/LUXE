import React from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { User, Mail, Shield } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">Profile</h1>
        <p className="text-zinc-500">View your account information</p>
      </div>

      {user ? (
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="bg-zinc-950 text-white p-8 text-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-white/20">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {user.firstname} {user.lastname}
            </h2>
            <p className="text-zinc-400 text-sm">{user.email}</p>
          </div>

          {/* Details Section */}
          <div className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-500">First Name</label>
                <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                  <User className="w-5 h-5 text-zinc-400" />
                  <span className="text-zinc-900 font-medium">{user.firstname || "N/A"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-500">Last Name</label>
                <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                  <User className="w-5 h-5 text-zinc-400" />
                  <span className="text-zinc-900 font-medium">{user.lastname || "N/A"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-500">Email Address</label>
                <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                  <Mail className="w-5 h-5 text-zinc-400" />
                  <span className="text-zinc-900 font-medium">{user.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-500">Account Role</label>
                <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                  <Shield className="w-5 h-5 text-zinc-400" />
                  <span className="px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100">
              <p className="text-xs text-zinc-400 text-center">
                To update your profile information, please visit the Settings page.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-50 border border-dashed border-zinc-200 rounded-xl p-12 text-center">
          <User className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <p className="text-zinc-500">No user data found.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
