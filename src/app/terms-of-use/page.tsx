import { Home, ChevronRight } from "lucide-react";

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
            <span className="text-orange-400">Terms of Use | استعمال کی شرائط</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            TERMS OF USE <br /> <span className="text-orange-300 text-2xl md:text-3xl">استعمال کی شرائط</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                User Agreement & Terms <br />
                <span className="text-orange-100 text-xl">صارف کا معاہدہ اور شرائط</span>
              </h2>
              <p className="text-white/90 text-lg mt-2">
                Please read carefully before using our platform <br />
                <span className="text-orange-100">پلیٹ فارم استعمال کرنے سے پہلے براہ کرم توجہ سے پڑھیں</span>
              </p>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 space-y-8">
              {/* Introduction */}
              <div>
                <p className="text-slate-700 leading-relaxed text-lg">
                  By registering on our platform, you agree to the following terms and conditions. We are committed to
                  providing a safe and secure environment for finding your perfect match.
                  <br />
                  <span className="block text-right mt-2 text-slate-900">
                    ہمارے پلیٹ فارم پر رجسٹر ہو کر آپ درج ذیل شرائط و ضوابط سے اتفاق کرتے ہیں۔
                    ہم آپ کو محفوظ اور قابل اعتماد ماحول فراہم کرنے کے پابند ہیں تاکہ آپ بہترین رشتہ تلاش کرسکیں۔
                  </span>
                </p>
              </div>

              {/* Terms List */}
              <div className="space-y-6">
                {/* Term 1 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Profile Information  
                    <br />
                    <span className="text-orange-600 text-lg">پروفائل معلومات</span>
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Through this website, you can find matches of any caste, education, Islamic background,
                    marital status, and your preferred city or country. Provide accurate and complete information
                    while creating your profile. Any false information may result in automatic suspension.
                    <br />
                    <span className="block text-right mt-2 text-slate-900">
                      اس ویب سائٹ کے ذریعے آپ کسی بھی ذات، تعلیم، اسلامی پس منظر،
                      ازدواجی حیثیت اور پسندیدہ شہر یا ملک کے رشتے تلاش کرسکتے ہیں۔
                      پروفائل بناتے وقت درست اور مکمل معلومات فراہم کریں۔
                      غلط معلومات کی صورت میں پروفائل بغیر اطلاع کے بند کر دی جائے گی۔
                    </span>
                  </p>
                </div>

                {/* Term 2 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Registration Fee Payment  
                    <br />
                    <span className="text-orange-600 text-lg">رجسٹریشن فیس کی ادائیگی</span>
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    The registration fee must be paid within 3 days of profile creation. Failure to pay will result
                    in temporary closure. The profile will reopen immediately upon payment.
                    <br />
                    <span className="block text-right mt-2 text-slate-900">
                      پروفائل بنانے کے 3 دن کے اندر رجسٹریشن فیس ادا کرنا ضروری ہے۔
                      فیس جمع نہ کروانے پر پروفائل عارضی طور پر بند کر دی جائے گی،
                      جو فیس ادا کرتے ہی دوبارہ فعال کر دی جائے گی۔
                    </span>
                  </p>
                </div>

                {/* Term 3 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Profile Visibility & Access  
                    <br />
                    <span className="text-orange-600 text-lg">پروفائل دیکھنے کی حد اور رسائی</span>
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Registered users can view up to 10 profiles. Viewing additional profiles requires an extra fee
                    and must follow platform guidelines.
                    <br />
                    <span className="block text-right mt-2 text-slate-900">
                      رجسٹرڈ صارفین 10 پروفائلز تک دیکھ سکتے ہیں۔
                      مزید پروفائلز دیکھنے کے لیے اضافی فیس درکار ہوتی ہے،
                      اور تمام درخواستیں پلیٹ فارم کے اصولوں کے مطابق ہونی چاہئیں۔
                    </span>
                  </p>
                </div>

                {/* Term 4 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Profile Closure After Engagement  
                    <br />
                    <span className="text-orange-600 text-lg">منگنی کے بعد پروفائل بند کرنا</span>
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    If your proposal is finalized or engagement takes place, inform us immediately so your profile
                    can be closed to maintain platform authenticity.
                    <br />
                    <span className="block text-right mt-2 text-slate-900">
                      اگر آپ کا رشتہ فائنل ہو جائے یا منگنی ہو جائے،
                      تو فوراً اطلاع دیں تاکہ آپ کی پروفائل بند کی جا سکے۔
                      یہ پلیٹ فارم کی شفافیت برقرار رکھنے کے لیے ضروری ہے۔
                    </span>
                  </p>
                </div>

                {/* Term 5 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Data Accuracy  
                    <br />
                    <span className="text-orange-600 text-lg">درست معلومات فراہم کرنا</span>
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    You must ensure all information provided is truthful and updated. False data may lead to permanent
                    suspension.
                    <br />
                    <span className="block text-right mt-2 text-slate-900">
                      آپ کی فراہم کردہ تمام معلومات درست، سچی اور تازہ ہونی چاہئیں۔
                      غلط معلومات کی صورت میں پروفائل مستقل طور پر بلاک کی جا سکتی ہے۔
                    </span>
                  </p>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-orange-50 border border-orange-300 rounded-2xl p-6">
                <p className="text-slate-800 text-lg">
                  <span className="font-bold text-orange-600">Important: </span>
                  By using our platform, you agree to all terms and conditions. We may update these terms anytime.
                  <br />
                  <span className="block text-right text-orange-700 font-semibold mt-2">
                    اہم: پلیٹ فارم استعمال کرتے ہوئے آپ تمام شرائط و ضوابط سے اتفاق کرتے ہیں۔
                    ہم کسی بھی وقت ان شرائط میں تبدیلی کر سکتے ہیں۔
                  </span>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
