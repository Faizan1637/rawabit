import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-xl">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Rawabit
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Building meaningful connections and helping individuals find their perfect life partner through our trusted matrimonial services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-slate-700/50 hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-700/50 hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-700/50 hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-700/50 hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Services', 'Success Stories', 'Membership Plans', 'Privacy Policy', 'Terms & Conditions'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-300 hover:text-orange-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              {['Profile Creation', 'Partner Search', 'Verified Profiles', 'Personalized Matching', 'Consultation Services', 'Event Management'].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-300 hover:text-orange-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="bg-slate-700/50 p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300">
                    123 Main Street, Model Town<br />
                    Lahore, Punjab, Pakistan
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="bg-slate-700/50 p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:+923001234567" className="text-slate-300 hover:text-orange-400 transition-colors">
                  +92 300 1234567
                </a>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="bg-slate-700/50 p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:info@rawabit.com" className="text-slate-300 hover:text-orange-400 transition-colors">
                  info@rawabit.com
                </a>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  )
}