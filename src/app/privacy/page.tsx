import { Home, ChevronRight, Shield, Lock, Eye } from "lucide-react";

export default function PrivacyPolicy() {
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
            <span className="text-orange-400">Privacy Policy</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">PRIVACY POLICY</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">

            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Your Privacy Matters</h2>
              <p className="text-white/90 text-lg mt-2">How we protect your information</p>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 space-y-8">

              {/* Introduction */}
              <div className="bg-slate-50 rounded-2xl p-6 border-l-4 border-orange-500 space-y-2">
                <p className="text-slate-700 leading-relaxed text-lg">
                  Rawabit.com is the best website for Muslim proposals. Through this website, you can find matches of any caste, your required education, Islamic education, marital status, and the choice of any city or country.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg font-semibold text-right">
                  Rawabit.com مسلمانوں کے رشتوں کے لیے بہترین ویب سائٹ ہے۔ اس ویب سائٹ کے ذریعے آپ کسی بھی ذات، مطلوبہ تعلیم، اسلامی تعلیم، ازدواجی حیثیت اور کسی بھی شہر یا ملک کے مناسب رشتے حاصل کرسکتے ہیں۔
                </p>
              </div>

              {/* Responsibility Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-orange-500" />
                  <h3 className="text-2xl font-bold text-slate-900">Our Responsibility</h3>
                </div>

                <div className="space-y-4 pl-9">
                  <div className="space-y-2">
                    <p className="text-slate-700">
                      Rawabit Ribat uz Zawaj is not responsible for any misfortune or incident caused by any person or any false information provided by any user. We cannot be held liable for actions taken by users outside of our platform.
                    </p>
                    <p className="text-slate-700 font-semibold text-right">
                      روا بط رابط از الزواج کسی بھی شخص کے غلط طرزِ عمل یا غلط معلومات فراہم کرنے کی صورت میں کسی قسم کی ذمہ داری قبول نہیں کرتا۔ صارفین کے پلیٹ فارم سے باہر کیے گئے کسی بھی عمل کی ذمہ داری ہماری نہیں ہوگی۔
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-slate-700">
                      Families must conduct thorough investigations and marriages after proper verification and satisfaction. Rawabit will not be responsible for any consequences arising from user interactions or personal decisions.
                    </p>
                    <p className="text-slate-700 font-semibold text-right">
                      خاندانوں کو چاہیے کہ وہ مکمل تحقیق کے بعد ہی رشتہ فائنل کریں۔ کسی بھی قسم کے نتائج یا مسائل کے لیے Rawabit ذمہ دار نہیں ہوگا۔
                    </p>
                  </div>
                </div>
              </div>

              {/* Safety & Verification */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-orange-500" />
                  <h3 className="text-2xl font-bold text-slate-900">Safety & Verification</h3>
                </div>

                <div className="space-y-4 pl-9">
                  <div className="space-y-2">
                    <p className="text-slate-700">
                      To avoid fraudulent profiles, we strongly advise conducting proper verification before interacting with any profile. Our verification system helps maintain safety, but user discretion is essential.
                    </p>
                    <p className="text-slate-700 font-semibold text-right">
                      جعلی پروفائلز سے بچنے کے لیے ضروری ہے کہ آپ کسی بھی پروفائل سے رابطہ کرنے سے پہلے خود مکمل تحقیق اور تصدیق کریں۔ ہمارا ویری فیکیشن سسٹم مدد فراہم کرتا ہے مگر احتیاط ضروری ہے۔
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-slate-700">
                      Once your proposal is finalized, please inform us immediately so we can mark your profile inactive to prevent misuse.
                    </p>
                    <p className="text-slate-700 font-semibold text-right">
                      جب آپ کا رشتہ فائنل ہوجائے تو فوراً ہمیں اطلاع دیں تاکہ آپ کی پروفائل کو غیر فعال کیا جا سکے اور کسی غلط استعمال سے بچا جا سکے۔
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Protection */}
              <div className="bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Data Protection Commitment</h3>
                <ul className="space-y-3">

                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">•</span>
                    <div>
                      <p className="text-slate-700">Your personal information is handled with utmost confidentiality.</p>
                      <p className="text-slate-700 font-semibold text-right">آپ کی ذاتی معلومات کو مکمل رازداری کے ساتھ محفوظ رکھا جاتا ہے۔</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">•</span>
                    <div>
                      <p className="text-slate-700">We do not share your information with third parties without consent.</p>
                      <p className="text-slate-700 font-semibold text-right">آپ کی معلومات آپ کی اجازت کے بغیر کسی بھی تیسرے فریق کے ساتھ شیئر نہیں کی جاتی۔</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">•</span>
                    <div>
                      <p className="text-slate-700">All communications are encrypted and secure.</p>
                      <p className="text-slate-700 font-semibold text-right">تمام رابطے انکرپٹڈ اور محفوظ ہیں۔</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">•</span>
                    <div>
                      <p className="text-slate-700">You have the right to access and modify your personal data.</p>
                      <p className="text-slate-700 font-semibold text-right">آپ کو اپنی ذاتی معلومات دیکھنے اور تبدیل کرنے کا پورا حق حاصل ہے۔</p>
                    </div>
                  </li>

                </ul>
              </div>

              {/* Final Note */}
              <div className="border-l-4 border-red-500 pl-6 py-4 space-y-2">
                <p className="text-slate-700 leading-relaxed text-lg">
                  Thank you for choosing Rawabit.com. We are committed to providing a safe and trusted platform while respecting your privacy.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg font-semibold text-right">
                  Rawabit.com کے انتخاب کا شکریہ۔ ہم آپ کی پرائیویسی کا مکمل احترام کرتے ہوئے ایک محفوظ اور قابل اعتماد پلیٹ فارم فراہم کرنے کے لیے پرعزم ہیں۔
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
