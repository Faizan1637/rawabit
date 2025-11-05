import { Home, ChevronRight, Heart, Phone, Mail, Calendar, MapPin, Users } from "lucide-react"

interface SuccessStory {
  id: number
  brideName: string
  groomName: string
  weddingDate: string
  location: string
  testimonial: string
  image?: string
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    brideName: "Ayesha Khan",
    groomName: "Ahmed Ali",
    weddingDate: "June 2024",
    location: "Lahore",
    testimonial: "Alhamdulillah! We found each other through Rawabit. It was the best decision of our lives. May Allah bless this platform."
  },
  {
    id: 2,
    brideName: "Fatima Malik",
    groomName: "Usman Tariq",
    weddingDate: "May 2024",
    location: "Karachi",
    testimonial: "We are grateful to Rawabit for helping us find our perfect match. The verification process made us feel secure and confident."
  },
  {
    id: 3,
    brideName: "Zainab Ahmad",
    groomName: "Hassan Sheikh",
    weddingDate: "April 2024",
    location: "Islamabad",
    testimonial: "After months of searching, we finally found each other on Rawabit. The platform is genuine and trustworthy. Highly recommended!"
  },
  {
    id: 4,
    brideName: "Maryam Siddiqui",
    groomName: "Bilal Hussain",
    weddingDate: "March 2024",
    location: "Rawalpindi",
    testimonial: "JazakAllah to the Rawabit team for their excellent service. We are happily married now and couldn't be more grateful."
  },
  {
    id: 5,
    brideName: "Khadija Raza",
    groomName: "Farhan Iqbal",
    weddingDate: "February 2024",
    location: "Faisalabad",
    testimonial: "The best matrimonial service in Pakistan! Professional, caring staff and verified profiles made all the difference."
  },
  {
    id: 6,
    brideName: "Hira Yousaf",
    groomName: "Imran Khan",
    weddingDate: "January 2024",
    location: "Multan",
    testimonial: "We are blessed to have found each other through Rawabit. The journey was smooth and the support was excellent."
  },
  {
    id: 7,
    brideName: "Amina Baig",
    groomName: "Kashif Mahmood",
    weddingDate: "December 2023",
    location: "Sialkot",
    testimonial: "Alhamdulillah! Rawabit helped us start our beautiful journey together. Thank you for your dedication and professionalism."
  },
  {
    id: 8,
    brideName: "Sana Ashraf",
    groomName: "Adnan Malik",
    weddingDate: "November 2023",
    location: "Gujranwala",
    testimonial: "A wonderful platform with genuine people. We are happily married and recommend Rawabit to everyone looking for their match."
  },
  {
    id: 9,
    brideName: "Rabia Noor",
    groomName: "Talha Ahmad",
    weddingDate: "October 2023",
    location: "Peshawar",
    testimonial: "May Allah reward the Rawabit team for their sincere efforts. We found our soulmate here and couldn't be happier!"
  },
  {
    id: 10,
    brideName: "Bushra Jamil",
    groomName: "Hamza Ali",
    weddingDate: "September 2023",
    location: "Quetta",
    testimonial: "Professional service with genuine profiles. Rawabit made our search easy and successful. Highly recommended!"
  },
  {
    id: 11,
    brideName: "Nida Farooqui",
    groomName: "Waqas Ahmed",
    weddingDate: "August 2023",
    location: "Lahore",
    testimonial: "The verification process gave us confidence and peace of mind. Alhamdulillah, we are now happily married!"
  },
  {
    id: 12,
    brideName: "Uzma Tariq",
    groomName: "Shahid Akhtar",
    weddingDate: "July 2023",
    location: "Karachi",
    testimonial: "Excellent service and genuine profiles. We thank Allah and Rawabit for bringing us together in this beautiful bond."
  },
  {
    id: 13,
    brideName: "Saima Riaz",
    groomName: "Naveed Hassan",
    weddingDate: "June 2023",
    location: "Islamabad",
    testimonial: "From registration to marriage, the journey was smooth and blessed. Thank you Rawabit for everything!"
  },
  {
    id: 14,
    brideName: "Mehwish Khan",
    groomName: "Asif Mahmood",
    weddingDate: "May 2023",
    location: "Rawalpindi",
    testimonial: "A trustworthy platform that truly cares about finding the right match. We are grateful for their support and guidance."
  },
  {
    id: 15,
    brideName: "Iqra Saleem",
    groomName: "Zubair Ali",
    weddingDate: "April 2023",
    location: "Multan",
    testimonial: "MashaAllah! We found our perfect match through Rawabit. The team was supportive throughout our journey."
  },
  {
    id: 16,
    brideName: "Sadaf Naz",
    groomName: "Faisal Raza",
    weddingDate: "March 2023",
    location: "Faisalabad",
    testimonial: "Alhamdulillah for this blessing! Rawabit helped us find each other and start our beautiful life together."
  },
  {
    id: 17,
    brideName: "Madiha Iftikhar",
    groomName: "Rizwan Shah",
    weddingDate: "February 2023",
    location: "Sialkot",
    testimonial: "Professional, caring, and genuine service. We highly recommend Rawabit to anyone serious about finding their life partner."
  },
  {
    id: 18,
    brideName: "Arooj Fatima",
    groomName: "Junaid Iqbal",
    weddingDate: "January 2023",
    location: "Gujranwala",
    testimonial: "The best decision we made was to register with Rawabit. Thank you for helping us find our soulmate!"
  },
  {
    id: 19,
    brideName: "Rimsha Aslam",
    groomName: "Kamran Younas",
    weddingDate: "December 2022",
    location: "Lahore",
    testimonial: "May Allah bless Rawabit for their excellent work. We are happily married and forever grateful for their services."
  },
  {
    id: 20,
    brideName: "Noor Fatima",
    groomName: "Yasir Mehmood",
    weddingDate: "November 2022",
    location: "Karachi",
    testimonial: "A wonderful experience from start to finish. Rawabit truly understands the importance of finding the right match."
  }
]

export default function SuccessStoriesHero() {
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
            <span className="text-orange-400">Success Stories</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            OUR SUCCESS STORIES
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 mb-16">
            {/* Header with Islamic greeting */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-white fill-current" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Bismillah</h2>
              <p className="text-white/90 text-lg">In the name of Allah, the Most Gracious, the Most Merciful</p>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Main Message */}
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-slate-700 leading-relaxed text-lg mb-6">
                  <span className="font-semibold text-slate-900">Praise be to the Lord (Alhamdulillah)</span>, thank to Allah (Almighty) Who chose us to ensure purity of the society by providing us opportunity to bind people&apos;s home with sacred relation of Nikaah. Underneath are the details and photos of couples whose weddings are carried out through Al-Nikaah.com.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg mb-6">
                  This is the Muslim&apos;s Nikaah website through which hundreds of Muslims have been put through to marriage. If you&apos;re concerned about the relations of your loved ones, don&lsquo;t waste to log in in; order to find your match. Subsequent to registration get your required profile&apos;s number from us!
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  For more information contact us telephonically.
                </p>
              </div>

              {/* Director Info Card */}
              <div className="bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl p-8 border border-slate-200">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      HS
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Hafiz Safi Ullah Siddiqui
                    </h3>
                    <p className="text-lg text-slate-600 mb-4 font-semibold">Director Al-Nikaah</p>
                    
                    {/* Contact Details */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <a 
                        href="tel:+92-303-4750787" 
                        className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-slate-200 group"
                      >
                        <Phone className="w-5 h-5 text-orange-500 group-hover:text-red-500 transition-colors" />
                        <span className="text-slate-700 font-semibold">+92-303-4750787</span>
                      </a>
                      
                      <a 
                        href="mailto:info@al-nikaah.com" 
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <Mail className="w-5 h-5" />
                        <span className="font-semibold">Contact Us</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories Grid */}
          <div className="mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Happy Couples
              </h2>
              <p className="text-lg text-slate-600">
                Real stories from real people who found their perfect match
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 group"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 p-6">
                    <div className="flex items-center justify-center space-x-3 text-white">
                      <Users className="w-6 h-6" />
                      <h3 className="text-xl font-bold">
                        {story.brideName} & {story.groomName}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Details */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">{story.weddingDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">{story.location}</span>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-orange-500">
                      <p className="text-slate-700 italic text-sm leading-relaxed">
                        &quot;{story.testimonial}&quot;
                      </p>
                    </div>

                    {/* Heart Icon */}
                    <div className="mt-4 flex justify-end">
                      <Heart className="w-6 h-6 text-red-500 fill-current group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-slate-600 bg-orange-50 px-6 py-3 rounded-full">
              <Heart className="w-5 h-5 text-orange-500 fill-current animate-pulse" />
              <span className="font-semibold">Helping Muslims find their perfect match since years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}