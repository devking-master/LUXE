// src/pages/User/Settings.jsx
import React, { useState, useEffect } from "react";
import { privateApiClient } from "../../lib/client";
import { Settings, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const UserSettings = () => {
  const [settings, setSettings] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // 'success' or 'error'

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await privateApiClient.get("/api/auth/profile");
        setSettings({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
        });
        setLoading(false);
      } catch (err) {
        setMsg("Failed to load settings");
        setMsgType("error");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMsg("");
      await privateApiClient.put("/api/auth/profile", settings);
      setMsg("Settings updated successfully!");
      setMsgType("success");
      setLoading(false);
    } catch (err) {
      setMsg("Update failed. Please try again.");
      setMsgType("error");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-zinc-900" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Account Settings</h1>
          <p className="text-zinc-500 text-sm">Manage your profile information</p>
        </div>
      </div>

      {/* Message Alert */}
      {msg && (
        <div className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${
          msgType === 'success' 
            ? 'bg-green-50 border-green-200 text-green-700' 
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {msgType === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="font-medium">{msg}</p>
        </div>
      )}

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-zinc-50 px-8 py-6 border-b border-zinc-200">
          <h2 className="text-lg font-bold text-zinc-900">Personal Information</h2>
          <p className="text-sm text-zinc-500 mt-1">Update your account details below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstname" className="block text-sm font-semibold text-zinc-700">
                First Name
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={settings.firstname}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all bg-white text-zinc-900"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastname" className="block text-sm font-semibold text-zinc-700">
                Last Name
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={settings.lastname}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all bg-white text-zinc-900"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-zinc-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all bg-white text-zinc-900"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="pt-6 border-t border-zinc-100 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-zinc-900 text-white py-3.5 rounded-lg font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/10"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
