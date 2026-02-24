import React, { useState } from "react";
import useSettings from "../../hooks/useSetting";
import { Loader2, Save, X, User, Mail, Shield, Key } from "lucide-react";

const StaffSettings = () => {
  const {
    settings,
    loading,
    error,
    success,
    handleChange,
    updateSettings,
  } = useSettings();

  const [editing, setEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings();
    setEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Account Settings</h1>
        <p className="text-zinc-500 text-sm md:text-base mt-1">Manage your profile and preferences.</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 md:p-8 border-b border-zinc-100 flex flex-col sm:flex-row items-center gap-4 md:gap-6 bg-zinc-50/50">
          <img
            src={`https://ui-avatars.com/api/?name=${settings.firstname || "Staff"}+${settings.lastname || ""}&background=18181b&color=fff&size=128`}
            alt="Profile"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-md mx-auto sm:mx-0"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
              {settings.firstname} {settings.lastname}
            </h2>
            <p className="text-zinc-500 text-sm md:text-base font-medium">{settings.email}</p>
            <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full bg-zinc-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider">
              {settings.role}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8">
          {loading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="w-5 h-5 animate-spin text-zinc-900 mr-2" />
              <span className="text-zinc-500 text-sm md:text-base font-medium">Processing...</span>
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 md:p-4 rounded-lg mb-4 md:mb-6 text-xs md:text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 p-3 md:p-4 rounded-lg mb-4 md:mb-6 text-xs md:text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium text-zinc-700 mb-1.5 md:mb-2 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-400" /> First Name
                </label>
                <input
                  name="firstname"
                  value={settings.firstname}
                  onChange={handleChange}
                  type="text"
                  className="w-full border border-zinc-200 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500 text-sm"
                  disabled={loading || !editing}
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-zinc-700 mb-1.5 md:mb-2 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-400" /> Last Name
                </label>
                <input
                  name="lastname"
                  value={settings.lastname}
                  onChange={handleChange}
                  type="text"
                  className="w-full border border-zinc-200 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500 text-sm"
                  disabled={loading || !editing}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs md:text-sm font-medium text-zinc-700 mb-1.5 md:mb-2 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-400" /> Email Address
                </label>
                <input
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full border border-zinc-200 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500 text-sm break-all"
                  disabled={loading || !editing}
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-zinc-700 mb-1.5 md:mb-2 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-400" /> Role
                </label>
                <input
                  value={settings.role}
                  disabled
                  type="text"
                  className="w-full border border-zinc-200 rounded-lg px-3 md:px-4 py-2 md:py-2.5 bg-zinc-50 text-zinc-500 cursor-not-allowed text-sm"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-zinc-700 mb-1.5 md:mb-2 flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-400" /> Password
                </label>
                <input
                  name="password"
                  value={settings.password}
                  onChange={handleChange}
                  type="password"
                  placeholder={editing ? "Enter new password" : "••••••••"}
                  className="w-full border border-zinc-200 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500 text-sm"
                  disabled={loading || !editing}
                />
              </div>
            </div>

            <div className="pt-4 md:pt-6 border-t border-zinc-100 flex flex-col sm:flex-row justify-end gap-3">
              {!editing ? (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="w-full sm:w-auto bg-zinc-900 text-white px-4 md:px-6 py-2.5 rounded-lg font-medium hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/10 text-sm md:text-base"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="w-full sm:w-auto bg-zinc-100 text-zinc-700 px-4 md:px-6 py-2.5 rounded-lg font-medium hover:bg-zinc-200 transition text-sm md:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-zinc-900 text-white px-4 md:px-6 py-2.5 rounded-lg font-medium hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/10 flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffSettings;