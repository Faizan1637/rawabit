'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RegisterFormData } from '@/types/auth.types';
import { calculateAge } from '@/lib/utils/age-calculator';
import {
  Home,
  ChevronRight,
  User,
  Mail,
  Lock,
  Calendar,
  UserCircle,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export default function RegisterPage() {
  const { register, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    day: '1',
    month: 'January',
    year: '2000',
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ageError, setAgeError] = useState<string | null>(null);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear age error when date fields change
    if (name === 'day' || name === 'month' || name === 'year') {
      setAgeError(null);
    }
  };

  const validateAge = (): boolean => {
    const monthIndex = months.indexOf(formData.month);
    const dateOfBirth = new Date(
      parseInt(formData.year),
      monthIndex,
      parseInt(formData.day)
    );

    const age = calculateAge(dateOfBirth);

    if (age < 18) {
      setAgeError(`You must be at least 18 years old to register. Your current age is ${age} years.`);
      return false;
    }

    setAgeError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setAgeError(null);

    // Validate age first
    if (!validateAge()) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the terms of service and privacy policy.');
      return;
    }

    try {
      await register(formData);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center space-x-2 text-slate-300 mb-6">
            <Home className="w-4 h-4" />
            <a href="#" className="hover:text-orange-400 transition-colors">
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-orange-400">Register</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            CREATE YOUR ACCOUNT
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
          <p className="text-slate-300 text-lg mt-6 max-w-2xl">
            Join Rawabit today and start your journey to find your perfect life partner
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4">
                <UserCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">REGISTER</h2>
              <p className="text-slate-600">
                It takes less than a minute to create an account
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {ageError && (
              <div className="bg-amber-50 text-amber-800 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Age Requirement Not Met</p>
                  <p className="text-sm">{ageError}</p>
                </div>
              </div>
            )}

            {isSubmitted ? (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Registration Successful!
                </h3>
                <p className="text-slate-600">
                  Welcome to Rawabit. We&apos;ll send you a confirmation email shortly In Shaa ALLAH.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="First Name"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Last Name"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter password"
                      className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirm password"
                      className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Birthday */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    <Calendar className="inline w-5 h-5 mr-2" /> Birthday <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-slate-600 mb-3">You must be at least 18 years old to register</p>
                  <div className="grid grid-cols-3 gap-4">
                    <select
                      name="day"
                      value={formData.day}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    >
                      {days.map(day => (
                        <option key={day}>{day}</option>
                      ))}
                    </select>
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    >
                      {months.map(month => (
                        <option key={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    >
                      {years.map(year => (
                        <option key={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-3">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-6">
                    {['male', 'female', 'other'].map(g => (
                      <label key={g} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleChange}
                          className="w-5 h-5 text-orange-500 border-slate-300 focus:ring-2 focus:ring-orange-200"
                        />
                        <span className="ml-3 text-slate-700 font-medium group-hover:text-orange-600 transition-colors capitalize">
                          {g}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 text-orange-500 border-slate-300 rounded focus:ring-2 focus:ring-orange-200"
                    />
                    <span className="ml-3 text-slate-700 text-sm leading-relaxed">
                      By clicking &quot;Sign up&quot;, you agree to our{' '}
                      <a href="/terms-of-use" className="text-orange-600 font-semibold hover:text-orange-700">
                        terms of service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-orange-600 font-semibold hover:text-orange-700">
                        privacy policy
                      </a>.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {loading ? 'Creating account...' : 'JOIN'}
                </button>
              </form>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
            <p className="text-slate-700 text-center text-sm">
              Need help with registration? Contact us at{' '}
              <a
                href="tel:+923334829932"
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                +92-333-4829932
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}