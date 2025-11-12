import { Home, ChevronRight, Shield, Lock, Eye } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Breadcrumb and Title */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-slate-300 mb-6">
            <Home className="w-4 h-4" />
            <a href="#" className="hover:text-orange-400 transition-colors">
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-orange-400">Privacy Policy</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">PRIVACY POLICY</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Your Privacy Matters</h2>
              <p className="text-white/90 text-lg mt-2">How we protect your information</p>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 space-y-8">
              {/* Introduction */}
              <div className="bg-slate-50 rounded-2xl p-6 border-l-4 border-orange-500">
                <p className="text-slate-700 leading-relaxed text-lg">
                  Al-Nikaah.com is the best website for Muslim proposals. Through this website, you can find matches of
                  any caste, your required education, Islamic Education, Marital Status, and the choice of any city or
                  country.
                </p>
              </div>

              {/* Responsibility Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-orange-500" />
                  <h3 className="text-2xl font-bold text-slate-900">Our Responsibility</h3>
                </div>
                <div className="space-y-4 pl-9">
                  <p className="text-slate-700 leading-relaxed">
                    Al-Nikaah Ribat uz Zawaj is <span className="font-semibold">not responsible</span> for any
                    misfortune or incident caused by any particular person or any false information provided by any
                    user. We cannot be held liable for actions taken by users outside of our platform.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Families must conduct thorough investigations and marriages after proper due diligence and
                    satisfying their own grounds. Al-Nikaah will not be responsible for any consequences arising from
                    user interactions or personal decisions.
                  </p>
                </div>
              </div>

              {/* Safety & Verification */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-orange-500" />
                  <h3 className="text-2xl font-bold text-slate-900">Safety & Verification</h3>
                </div>
                <div className="space-y-4 pl-9">
                  <p className="text-slate-700 leading-relaxed">
                    To avoid encountering fraudulent profiles, we strongly advise that you investigate thoroughly before
                    engaging with any profile. Our verification process helps maintain platform integrity, but user
                    discretion is essential.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Once your proposal is finalized with another user, please inform us immediately so we can mark the
                    profile as inactive. This helps protect you and other users from scams and misuse of the platform.
                  </p>
                </div>
              </div>

              {/* Data Protection */}
              <div className="bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Data Protection Commitment</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">
                      Your personal information is handled with utmost confidentiality
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">
                      We do not share your information with third parties without consent
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">All communications are encrypted and secure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">You have the right to access and modify your personal data</span>
                  </li>
                </ul>
              </div>

              {/* Final Note */}
              <div className="border-l-4 border-red-500 pl-6 py-4">
                <p className="text-slate-700 leading-relaxed text-lg">
                  <span className="font-bold text-red-600">Thank you</span> for choosing Al-Nikaah.com as your
                  matrimonial partner. We are committed to providing a safe and secure platform for finding your perfect
                  match while respecting your privacy and security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
