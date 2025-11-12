import { Home, ChevronRight } from "lucide-react"

export default function UseTerms() {
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
            <span className="text-orange-400">Terms of Use</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">TERMS OF USE</h1>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white">User Agreement & Terms</h2>
              <p className="text-white/90 text-lg mt-2">Please read carefully before using our platform</p>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 space-y-8">
              {/* Introduction */}
              <div>
                <p className="text-slate-700 leading-relaxed text-lg">
                  By registering on our platform, you agree to the following terms and conditions. We are committed to
                  providing a safe and secure environment for finding your perfect match.
                </p>
              </div>

              {/* Terms List */}
              <div className="space-y-6">
                {/* Term 1 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Profile Information</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Through this website, you can find matches of any caste, your required education, Islamic Education,
                    Marital Status, and the choice of any city or country. Make sure to provide appropriate information
                    before making your profile and complete it to the last detail. Any profile with wrong or false
                    information will be automatically shut down without prior notification.
                  </p>
                </div>

                {/* Term 2 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Registration Fee Payment</h3>
                  <p className="text-slate-700 leading-relaxed">
                    You must pay your registration fee within 3 days of profile creation. If payment is not received
                    within this period, your profile will be temporarily closed. Temporarily closed profiles can be
                    reopened immediately upon payment of the registration fee.
                  </p>
                </div>

                {/* Term 3 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Profile Visibility & Access</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Registered profiles can view a maximum of 10 profile numbers. To view additional profiles, a
                    separate fee will be charged. Each profile view request must follow our platform guidelines.
                  </p>
                </div>

                {/* Term 4 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Profile Closure After Engagement</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Once you have finalized your proposal with another user, you must inform us immediately so that we
                    can close your profile. This helps maintain the integrity and authenticity of our platform.
                  </p>
                </div>

                {/* Term 5 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Data Accuracy</h3>
                  <p className="text-slate-700 leading-relaxed">
                    You are responsible for ensuring that all information provided in your profile is accurate,
                    truthful, and up-to-date. Providing false information may result in permanent suspension from our
                    platform.
                  </p>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-orange-50 border border-orange-300 rounded-2xl p-6">
                <p className="text-slate-800 text-lg">
                  <span className="font-bold text-orange-600">Important: </span>
                  By using our platform, you acknowledge that you have read, understood, and agreed to all terms and
                  conditions. We reserve the right to update these terms at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
