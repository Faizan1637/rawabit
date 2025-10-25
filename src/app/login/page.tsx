'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Home, ChevronRight, Mail, Lock, Eye, EyeOff, CheckCircle, UserPlus, LogIn } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center space-x-2 text-slate-300 mb-6">
            <Home className="w-4 h-4" />
            <a href="#" className="hover:text-orange-400 transition-colors">Home</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-orange-400">Login</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            WELCOME BACK
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
          <p className="text-slate-300 text-lg mt-6 max-w-2xl">
            Sign in to your Al-Nikaah account and continue your journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Login Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-100">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">LOGIN</h2>
                <p className="text-slate-600">Welcome back! Please login to your account</p>
              </div>

              {isSubmitted ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Login Successful!</h3>
                  <p className="text-slate-600">Redirecting you to your dashboard...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-slate-700 font-semibold mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-slate-700 font-semibold mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 text-orange-500 border-slate-300 rounded focus:ring-2 focus:ring-orange-200"
                      />
                      <span className="ml-2 text-slate-700 text-sm group-hover:text-orange-600 transition-colors">
                        Remember Me
                      </span>
                    </label>

                    <a href="#" className="text-sm text-orange-600 hover:text-orange-700 font-semibold">
                      Forgot Password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    LOGIN
                  </button>


                </form>
              )}
            </div>

            {/* Right Side - Register CTA */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg p-8 md:p-12 text-white">
              <div className="flex flex-col items-center text-center h-full justify-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                  <UserPlus className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  NOT ALREADY OUR MEMBER?
                </h2>
                
                <p className="text-white/90 text-lg mb-8 max-w-md leading-relaxed">
                  A great opportunity to find a proposal in Pakistan or abroad. Sign up, register and start searching for your ideal match right away.
                </p>

                <div className="space-y-4 mb-8 text-left w-full max-w-md">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <p className="text-white/90">Create your profile in minutes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <p className="text-white/90">Browse thousands of verified profiles</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <p className="text-white/90">Find your perfect match In Shaa ALLAH</p>
                  </div>
                </div>

                <a
                  href="/register"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-orange-600 hover:bg-slate-50 font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>JOIN NOW</span>
                </a>

                <p className="text-white/80 text-sm mt-6">
                  Join thousands of happy couples today!
                </p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
            <div className="text-center">
              <p className="text-slate-700">
                Need help? Contact us at{' '}
                <a href="tel:+923034750787" className="text-orange-600 hover:text-orange-700 font-semibold">
                  +92-303-4750787
                </a>
                {' '}or email{' '}
                <a href="mailto:admin@al-nikaah.com" className="text-orange-600 hover:text-orange-700 font-semibold">
                  admin@al-nikaah.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}