import { Home, ChevronRight, AlertCircle, Info } from "lucide-react"

export default function Disclaimer() {
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
            <span className="text-orange-400">Disclaimer / ڈس کلیمر</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">DISCLAIMER / ڈس کلیمر</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Important Disclaimer / اہم ڈس کلیمر</h2>
              <p className="text-white/90 text-lg mt-2">Please read this carefully / براہ کرم غور سے پڑھیں</p>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 space-y-8">
              {/* Main Disclaimer */}
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
                <div className="flex gap-4">
                  <Info className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-slate-800 leading-relaxed text-lg font-semibold">
                      rawabit.pk is a matrimonial platform for Muslim proposals. By using this website, you acknowledge and accept the disclaimers outlined below.
                    </p>
                    <p className="text-slate-800 leading-relaxed text-lg font-semibold mt-2">
                      راوابِط ڈاٹ کام مسلم شادیوں کے لیے ایک میٹرِمونیئل پلیٹ فارم ہے۔ اس ویب سائٹ کو استعمال کرنے سے، آپ نیچے دیے گئے ڈس کلیمرز کو قبول کرتے ہیں۔
                    </p>
                  </div>
                </div>
              </div>

              {/* Platform Overview */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">About Our Platform / ہمارے پلیٹ فارم کے بارے میں</h3>
                <p className="text-slate-700 leading-relaxed">
                  Through this website, you can find matches of any caste, your required education, Islamic Education, Marital Status, and the choice of any city or country. We provide a platform to connect individuals seeking marriage while maintaining Islamic principles and ethical standards.
                </p>
                <p className="text-slate-700 leading-relaxed mt-2">
                  اس ویب سائٹ کے ذریعے، آپ کسی بھی قبیلے، مطلوبہ تعلیم، اسلامی تعلیم، ازدواجی حیثیت، اور کسی بھی شہر یا ملک کی پسند کے مطابق میچ تلاش کر سکتے ہیں۔ ہمارا مقصد افراد کو اسلامی اصولوں اور اخلاقی معیار کے تحت شادی کے لیے جوڑنا ہے۔
                </p>
              </div>

              {/* Liability Sections */}
              <div className="space-y-6">
                {/* Section 1 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">No Responsibility for User Actions / صارف کی کارروائیوں کی ذمہ داری نہیں</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Rawabit Ribat uz Zawaj is <span className="font-semibold">NOT responsible</span> for any misfortune, fraud, or incident caused by any particular user or any false information provided by any person. Users are solely responsible for their interactions on the platform.
                  </p>
                  <p className="text-slate-700 leading-relaxed mt-2">
                    راوابِط رِباتُ الزواج کسی بھی مخصوص صارف کی وجہ سے ہونے والے نقصانات، دھوکہ یا حادثات کے لیے <span className="font-semibold">ذمہ دار نہیں</span>۔ صارفین اپنی کارروائیوں کے لیے خود ذمہ دار ہیں۔
                  </p>
                </div>

                {/* Section 2 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">User Due Diligence / صارف کی جانچ پڑتال</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Families must conduct thorough investigations and due diligence based on their knowledge and satisfaction before pursuing marriage. We cannot be held responsible for marriages or relationships that result from user interactions on our platform.
                  </p>
                  <p className="text-slate-700 leading-relaxed mt-2">
                    خاندانوں کو شادی کے لیے اپنی معلومات اور اطمینان کی بنیاد پر مکمل تحقیق اور جانچ پڑتال کرنی چاہیے۔ ہم صارف کے تعاملات کے نتیجے میں ہونے والی شادیوں یا تعلقات کے لیے ذمہ دار نہیں ہیں۔
                  </p>
                </div>

                {/* Section 3 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">Fraud Prevention / دھوکہ دہی کی روک تھام</h4>
                  <p className="text-slate-700 leading-relaxed">
                    To avoid encountering cheaters and fraudulent profiles, you must investigate thoroughly and exercise caution with every interaction. Once you finalize a proposal, please inform us immediately so we can close that profile and prevent misuse.
                  </p>
                  <p className="text-slate-700 leading-relaxed mt-2">
                    دھوکہ باز یا جعلی پروفائلز سے بچنے کے لیے، ہر تعامل سے پہلے مکمل تحقیق اور احتیاط ضروری ہے۔ جب آپ اپنی پروپوزل فائنل کریں، تو فوراً ہمیں اطلاع دیں تاکہ پروفائل بند کی جا سکے۔
                  </p>
                </div>

                {/* Section 4 */}
                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">Personal Responsibility / ذاتی ذمہ داری</h4>
                  <p className="text-slate-700 leading-relaxed">
                    You are responsible for verifying the authenticity of all information provided by other users. Meeting in public places, involving family members, and conducting background checks are strongly recommended before establishing any personal relationship.
                  </p>
                  <p className="text-slate-700 leading-relaxed mt-2">
                    آپ دوسرے صارفین کی دی گئی معلومات کی تصدیق کرنے کے ذمہ دار ہیں۔ عوامی مقامات پر ملاقات، خاندان کے افراد کو شامل کرنا، اور پس منظر کی تحقیقات کرنا انتہائی ضروری ہے۔
                  </p>
                </div>
              </div>

              {/* User Obligations */}
              <div className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">User Obligations / صارف کی ذمہ داریاں</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold text-xl mt-0">✓</span>
                    <span className="text-slate-700">Provide truthful and accurate information in your profile / اپنی پروفائل میں درست اور سچ معلومات فراہم کریں</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold text-xl mt-0">✓</span>
                    <span className="text-slate-700">Conduct proper investigation before pursuing any relationship / کسی بھی تعلق سے پہلے مکمل تحقیق کریں</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold text-xl mt-0">✓</span>
                    <span className="text-slate-700">Report fraudulent or inappropriate profiles immediately / جعلی یا غیر مناسب پروفائلز فوری رپورٹ کریں</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold text-xl mt-0">✓</span>
                    <span className="text-slate-700">Inform us when you have finalized your proposal / جب پروپوزل فائنل ہو جائے تو ہمیں اطلاع دیں</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold text-xl mt-0">✓</span>
                    <span className="text-slate-700">Follow Islamic principles and platform guidelines / اسلامی اصول اور پلیٹ فارم کے رہنما خطوط پر عمل کریں</span>
                  </div>
                </div>
              </div>

              {/* Closing Statement */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
                <p className="leading-relaxed text-lg">
                  <span className="font-bold block mb-3">Thank you for your understanding / آپ کے تعاون کا شکریہ۔</span>
                  By using rawabit.pk, you acknowledge that you have read and accepted this disclaimer. We are committed to providing a platform that facilitates genuine connections while maintaining ethical standards. Your trust and responsible usage are essential to our community&apos;s success.
                </p>
                <p className="leading-relaxed text-lg mt-2">
                  راوابِط ڈاٹ کام استعمال کرنے سے، آپ اس ڈس کلیمر کو پڑھ کر قبول کرتے ہیں۔ ہم ایک ایسا پلیٹ فارم فراہم کرنے کے لیے پرعزم ہیں جو حقیقی روابط قائم کرے اور اخلاقی معیار برقرار رکھے۔
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
