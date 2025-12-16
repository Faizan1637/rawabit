import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-xl">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Rawabit
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              Building meaningful connections and helping individuals find their
              perfect life partner through our trusted matrimonial services.
            </p>

            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="bg-slate-800/50 hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 p-3 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <div className="space-y-5">
              <div className="flex items-start space-x-3 group">
                <div className="bg-slate-800/60 p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-slate-300 leading-relaxed">
                  2nd Floor, Sanawar Center, Samnabad<br />
                  Lahore, Punjab, Pakistan
                </p>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="bg-slate-800/60 p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <a
                  href="tel:tel:+923334829932"
                  className="text-slate-300 hover:text-orange-400 transition-colors"
                >
                  +923334829932
                </a>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="bg-slate-800/60 p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <a
                  href="mailto:info@rawabit.pk"
                  className="text-slate-300 hover:text-orange-400 transition-colors"
                >
                  info@rawabit.pk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
