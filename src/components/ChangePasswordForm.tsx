// src/components/ChangePasswordForm.tsx
'use client';

import { useState } from 'react';
import { authApi } from '@/client/api/auth.api';
import { message } from 'antd';

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      message.error('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await authApi.changePassword(formData);
      message.success('Password changed successfully!');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      // Remove : any
      const errorMessage = err instanceof Error ? err.message : 'Failed to change password';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-white bg-orange-600 rounded-t-xl px-6 py-3 -mx-8 -mt-8">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div>
          <label className="block font-semibold text-slate-700 mb-2">Current Password</label>
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
          <label className="block font-semibold text-slate-700 mb-2">New Password</label>
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
          <label className="block font-semibold text-slate-700 mb-2">Confirm New Password</label>
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
          className="bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition-all disabled:opacity-60 w-full"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}