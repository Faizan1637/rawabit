"use client"
import { Home, ChevronRight, User, Search, CreditCard, MessageSquare, CheckCircle, Phone, Mail, Building2} from "lucide-react"
import Image from "next/image";

export default function HowToRegister() {
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
            <a href="#" className="hover:text-orange-400 transition-colors">Home</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-orange-400">How to Register</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            HOW TO REGISTER
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Sidebar - Director Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 sticky top-8">
              {/* Profile Image */}
              <div className="mb-6">
                <div className="w-full aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden">
                  <div className="relative w-full h-full">
                  <Image
                    src="https://al-nikaah.com/Content/images/hafiz-saifi-ullah-siddiqui-full.jpg"
                    alt="Hafiz Safi Ullah Siddiqui"
                    fill
                    className="object-cover"
                    priority  // optional: ensures faster load for above-the-fold images
                  />
                </div>
                </div>
                <p className="text-center text-sm text-slate-600 mt-3 italic">need more details</p>
              </div>

              {/* Name and Title */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Babar Khursheed
                </h3>
                <p className="text-slate-600 font-medium">
                  CEO Rawabit Babar Khursheed
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">Helpline Numbers:</p>
                  <div className="space-y-2">
                    <a href="tel:+923034750787" className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">+92-333-4829932</span>
                    </a>
                    <a href="tel:+923015467752" className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">+92-333-4829932</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Registration Steps */}
          <div className="lg:col-span-2 space-y-8">
            {/* Steps Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Following these steps for Registration
              </h2>

              <div className="space-y-4">
                {[
                  { icon: User, text: "Create your profile" },
                  { icon: Search, text: "Understand qualities you are looking in desired partner" },
                  { icon: CreditCard, text: "Select your membership package" },
                  { icon: Building2, text: "Pay your package amount via Bank Account or via Easy Paisa" },
                  { icon: Mail, text: "Contact to director with your transaction details" },
                  { icon: CheckCircle, text: "Your Profile will be registered soon In Shaa ALLAH" },
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg flex-shrink-0">
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-slate-700 text-lg flex-1 pt-2">{step.text}</p>
                  </div>
                ))}
                
                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-slate-700 text-lg flex-1 pt-2">
                    Select your matches, Send SMS to helpline number{' '}
                    <a href="tel:+923034750787" className="text-orange-600 font-semibold hover:text-orange-700">
                      (+92-3034750787)
                    </a>{' '}
                    and get details of second party
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Transfer Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="bg-red-600 text-white px-4 py-2 rounded-lg inline-block mb-6 font-bold text-lg">
                For Bank Transfer:
              </div>

              <div className="flex items-center justify-center mb-6">
                <Image 
                  src="/meezan.png"
                  alt="Meezan Bank"
                  width={200}   // You must specify width and height (or use fill)
                  height={64}
                  className="h-16 w-auto"
                  priority      // optional: ensures faster loading for above-the-fold images
                />
              </div>

              <div className="space-y-3 text-slate-700">
                <p><span className="font-semibold">Bank:</span> Meezan Bank Limited</p>
                <p><span className="font-semibold">Title:</span> Babar Khursheed</p>
                <p>
                  <span className="font-semibold">Account No:</span>{' '}
                  <span className="text-orange-600 font-semibold">0215-0101643530</span>
                </p>
                <p>
                  <span className="font-semibold">IBAN:</span>{' '}
                  <span className="text-orange-600 font-semibold">PK12MEZN0002150101643530</span>
                </p>
                <p>
                  <span className="font-semibold">Swift Code:</span>{' '}
                  <span className="text-orange-600 font-semibold">MEZNPKKA</span>
                </p>
              </div>
            </div>

            {/* Pakistani Clients Payment */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="bg-red-600 text-white px-4 py-2 rounded-lg inline-block mb-6 font-bold text-lg">
                Payment Details for Pakistani Clients:
              </div>

              <div className="space-y-3 text-slate-700">
                <p>
                  <span className="font-semibold">Easypaisa Account No:</span>{' '}
                  <a href="tel:+923034750787" className="text-orange-600 font-semibold hover:text-orange-700">
                    +92-3034750787
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Jazz Cash Account No:</span>{' '}
                  <a href="tel:+923015467752" className="text-orange-600 font-semibold hover:text-orange-700">
                    +92-3015467752
                  </a>
                </p>
              </div>
            </div>

            {/* International Clients Payment */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="bg-red-600 text-white px-4 py-2 rounded-lg inline-block mb-6 font-bold text-lg">
                Payment Details for International Clients:
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-center">
                    <Image 
                      src="/westernUnion.png" 
                      alt="Western Union" 
                      width={120} 
                      height={48} 
                      className="h-12 w-auto"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-center">
                    <Image 
                      src="/xpressMoney.jpeg" 
                      alt="Xpress Money" 
                      width={120} 
                      height={48} 
                      className="h-12 w-auto"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-center">
                    <Image 
                      src="/ria.png" 
                      alt="Ria" 
                      width={120} 
                      height={48} 
                      className="h-12 w-auto"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-center">
                    <span className="text-green-700 font-bold text-lg">HBL FastTransfer</span>
                  </div>
                </div>

              <div className="space-y-2 text-slate-700">
                <p><span className="font-semibold">First Name:</span> Hafiz Muhammad</p>
                <p><span className="font-semibold">Last Name:</span> Safi Ullah</p>
                <p><span className="font-semibold">City:</span> Lahore</p>
                <p><span className="font-semibold">Country:</span> Pakistan</p>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Need Help?</h3>
              <p className="text-slate-700 mb-6">
                If you have any questions or need assistance with the registration process, feel free to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:info@rawabit.com"
                  className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-slate-300"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}