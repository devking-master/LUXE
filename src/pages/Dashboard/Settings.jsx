import React, { useState } from "react";
import useSettings from "../../hooks/useSetting";
import { Loader2, Save, X, User, Mail, Shield, Key } from "lucide-react";

const SettingsPage = () => {
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
    <div className="max-w-3xl mx-auto space-y-6">
       <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Account Settings</h1>
          <p className="text-zinc-500">Manage your profile and preferences.</p>
       </div>

      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="p-8 border-b border-zinc-100 flex flex-col md:flex-row items-center gap-6 bg-zinc-50/50">
           <img
             src={`https://ui-avatars.com/api/?name=${settings.firstname || "Admin"}+${settings.lastname || ""}&background=18181b&color=fff&size=128`}
             alt="Profile"
             className="w-24 h-24 rounded-full border-4 border-white shadow-md"
           />
           <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-zinc-900">
                 {settings.firstname} {settings.lastname}
              </h2>
              <p className="text-zinc-500 font-medium">{settings.email}</p>
              <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider">
                 {settings.role}
              </span>
           </div>
        </div>

        {/* Content */}
        <div className="p-8">
           {loading && (
             <div className="flex items-center justify-center p-4">
               <Loader2 className="w-5 h-5 animate-spin text-zinc-900 mr-2" />
               <span className="text-zinc-500 font-medium">Processing...</span>
             </div>
           )}
           {error && (
             <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
               {error}
             </div>
           )}
           {success && (
             <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 text-sm">
               {success}
             </div>
           )}

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2 flex items-center gap-2">
                       <User className="w-4 h-4 text-zinc-400" /> First Name
                    </label>
                    <input
                      name="firstname"
                      value={settings.firstname}
                      onChange={handleChange}
                      type="text"
                      className="w-full border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500"
                      disabled={loading || !editing}
                    />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2 flex items-center gap-2">
                       <User className="w-4 h-4 text-zinc-400" /> Last Name
                    </label>
                    <input
                      name="lastname"
                      value={settings.lastname}
                      onChange={handleChange}
                      type="text"
                      className="w-full border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500"
                      disabled={loading || !editing}
                    />
                 </div>

                 <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 mb-2 flex items-center gap-2">
                       <Mail className="w-4 h-4 text-zinc-400" /> Email Address
                    </label>
                    <input
                      name="email"
                      value={settings.email}
                      onChange={handleChange}
                      type="email"
                      className="w-full border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500"
                      disabled={loading || !editing}
                    />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2 flex items-center gap-2">
                       <Shield className="w-4 h-4 text-zinc-400" /> Role
                    </label>
                    <input
                      value={settings.role}
                      disabled
                      type="text"
                      className="w-full border border-zinc-200 rounded-lg px-4 py-2.5 bg-zinc-50 text-zinc-500 cursor-not-allowed"
                    />
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2 flex items-center gap-2">
                       <Key className="w-4 h-4 text-zinc-400" /> Password
                    </label>
                    <input
                      name="password"
                      value={settings.password}
                      onChange={handleChange}
                      type="password"
                      placeholder={editing ? "Enter new password" : "••••••••"}
                      className="w-full border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500"
                      disabled={loading || !editing}
                    />
                 </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 flex justify-end">
                 {!editing ? (
                   <button
                     type="button"
                     onClick={() => setEditing(true)}
                     className="bg-zinc-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/10"
                   >
                     Edit Profile
                   </button>
                 ) : (
                   <div className="flex gap-4">
                     <button
                       type="button"
                       onClick={() => setEditing(false)}
                       className="bg-zinc-100 text-zinc-700 px-6 py-2.5 rounded-lg font-medium hover:bg-zinc-200 transition"
                     >
                       Cancel
                     </button>
                     <button
                       type="submit"
                       disabled={loading}
                       className="bg-zinc-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/10 flex items-center gap-2"
                     >
                       {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />}
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

export default SettingsPage;