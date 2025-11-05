// components/ForgotPasswordForm.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  const { forgotPassword, verifyOTP, resetPassword, loading, error, clearError } = useAuth();

  const [step, setStep] = useState(1);  // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSendOTP = async () => {
    if (!email.trim()) {
      setLocalError('Please enter your email address');
      return;
    }

    setLocalError('');
    clearError();
    
    try {
      await forgotPassword(email);
      setSuccessMessage('OTP sent to your email successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        setStep(2);
      }, 1500);
    } catch (err) {
      console.error(err)
      setLocalError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerify = async () => {
    if (!otp.trim() || otp.length !== 6) {
      setLocalError('Please enter a valid 6-digit OTP');
      return;
    }

    setLocalError('');
    clearError();

    try {
      await verifyOTP(email, otp);
      setSuccessMessage('OTP verified successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        setStep(3);
      }, 1500);
    } catch (err) {
      console.error(err)
      setLocalError('Invalid OTP. Please try again.');
    }
  };

  const handleReset = async () => {
    if (!newPassword || newPassword.length < 8) {
      setLocalError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    setLocalError('');
    clearError();

    try {
      await resetPassword(email, otp, newPassword, confirmPassword);
      setSuccessMessage('Password reset successfully!');
    } catch (err) {
      console.error(err)
      setLocalError('Failed to reset password. Please try again.');
    }
  };

  const handleResendOTP = () => {
    handleSendOTP();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">Reset Your Password</h2>
        <p className="text-white/90 mt-1 text-sm">
          {step === 1 && "Enter your email to receive an OTP"}
          {step === 2 && "Enter the OTP sent to your email"}
          {step === 3 && "Create a new password for your account"}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="px-8 py-4 bg-slate-50">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                step >= s 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                  : 'bg-slate-200 text-slate-400'
              }`}>
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                  step > s ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs font-medium">
          <span className={step >= 1 ? 'text-orange-600' : 'text-slate-400'}>Email</span>
          <span className={step >= 2 ? 'text-orange-600' : 'text-slate-400'}>Verify</span>
          <span className={step >= 3 ? 'text-orange-600' : 'text-slate-400'}>Reset</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-8 py-8">
        {/* Error Message */}
        {(error || localError) && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm font-medium">{error || localError}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-green-700 text-sm font-medium">{successMessage}</p>
          </div>
        )}

        {/* Step 1: Email Input */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendOTP()}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-400"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              onClick={handleSendOTP}
              disabled={loading || !email.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending OTP...
                </span>
              ) : (
                'Send OTP'
              )}
            </button>
          </div>
        )}

        {/* Step 2: OTP Input */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Enter OTP
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <KeyRound className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-slate-900 text-center text-2xl tracking-widest font-semibold placeholder:text-slate-400 placeholder:text-base placeholder:tracking-normal placeholder:font-normal"
                  maxLength={6}
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                OTP sent to <span className="font-semibold text-slate-700">{email}</span>
              </p>
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : (
                'Verify OTP'
              )}
            </button>

            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="w-full text-orange-600 hover:text-orange-700 font-medium text-sm py-2 transition-colors disabled:opacity-50"
            >
              Didn&apos;t receive OTP? Resend
            </button>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-400"
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleReset()}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-400"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              onClick={handleReset}
              disabled={loading || !newPassword || !confirmPassword}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Resetting Password...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-600">
            Remember your password?{' '}
            <Link href="/login" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}