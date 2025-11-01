"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ You can replace this with your actual API call
      console.log("Password updated:", formData);
      alert("Password updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 max-w-lg mx-auto">
      {/* Header */}
      <h2 className="text-xl font-bold text-white bg-orange-600 rounded-t-xl px-6 py-3 -mx-8 -mt-8">
        Change Password
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div>
          <label className="block font-semibold text-slate-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition-all disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
