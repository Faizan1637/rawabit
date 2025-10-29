'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Home, ChevronRight, Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useInquiry } from '@/hooks/useInquiry'; 
import { InquiryFormData } from '@/client/api/inquiry.api'; 

export default function ContactUs() {
  const { sendInquiry, loading, error, success, clearError, clearSuccess } = useInquiry();
  
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (error) clearError();
    if (success) clearSuccess();
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await sendInquiry(formData);
      
      // Clear form on success
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
      
    } catch (err) {
      console.error('Failed to send inquiry:', err);
    }
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
            <a href="/" className="hover:text-orange-400 transition-colors">Home</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-orange-400">Contact Us</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            GET IN TOUCH
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
          <p className="text-slate-300 text-lg mt-6 max-w-2xl">
            We would love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form - Left Side (2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-slate-600 mb-8">
                Fill out the form below and we'll get back to you shortly
              </p>

              {/* Success Message */}
              {success && (
                <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-6 animate-fadeIn">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent Successfully! ✅</h3>
                      <p className="text-green-700">
                        Thank you for contacting us. We'll get back to you within 24-48 hours In Shaa ALLAH.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-500 rounded-xl p-6 animate-fadeIn">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-red-900 mb-2">Error Sending Message ❌</h3>
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-slate-700 font-semibold mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-slate-700 font-semibold mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="+92-XXX-XXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-slate-700 font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-slate-700 font-semibold mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none disabled:bg-slate-100 disabled:cursor-not-allowed"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info - Right Side (1 column) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-700 font-semibold mb-2">Phone Numbers</p>
                    <a href="tel:+923034750787" className="text-orange-600 hover:text-orange-700 block mb-1">
                      +92-303-4750787
                    </a>
                    <a href="tel:+923015467752" className="text-orange-600 hover:text-orange-700 block">
                      +92-301-5467752
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-700 font-semibold mb-2">Email</p>
                    <a href="mailto:admin@al-nikaah.com" className="text-orange-600 hover:text-orange-700">
                      admin@al-nikaah.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-700 font-semibold mb-2">Office Hours</p>
                    <p className="text-slate-600">Monday to Saturday</p>
                    <p className="text-orange-600 font-semibold">12:00PM to 8:00PM</p>
                    <p className="text-slate-600 mt-1">Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-700 font-semibold mb-2">Head Office</p>
                    <p className="text-slate-600">
                      29-Aaqa Tower, Near Fazal Banquet Hall, Moon Market, Gulshan e Ravi, Lahore 54000, Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Find Us on Map</h3>
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.7397267819847!2d74.30768831513384!3d31.48903658139858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903e8c8c8c8c9%3A0x1c1c1c1c1c1c1c1c!2sGulshan-e-Ravi%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Important Note</h3>
            <p className="text-slate-700 leading-relaxed">
              For urgent matters or immediate assistance with your registration, please feel free to call us directly at our helpline numbers. 
              Our team is available during office hours to help you with any questions about our matrimonial services, membership packages, 
              or the registration process. We look forward to helping you find your perfect match In Shaa ALLAH.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}