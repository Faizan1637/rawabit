"use client"
import { Home, ChevronRight, Play, Star, Quote } from "lucide-react"
import Image from 'next/image'

interface Feedback {
  id: number
  name: string
  title: string
  videoId: string
  thumbnail: string
  rating: number
}

const feedbacks: Feedback[] = [
  {
    id: 1,
    name: "Customer Testimonial",
    title: "Feedback for Al-Nikaah",
    videoId: "UBYSNn3gfVI",
    thumbnail: `https://img.youtube.com/vi/UBYSNn3gfVI/maxresdefault.jpg`,
    rating: 5
  },
  {
    id: 2,
    name: "Customer Review",
    title: "Feedback about Al-Nikaah Services",
    videoId: "z2F127-FHvE",
    thumbnail: `https://img.youtube.com/vi/z2F127-FHvE/maxresdefault.jpg`,
    rating: 5
  },
  {
    id: 3,
    name: "Prof. Dr. Asim Hafeez",
    title: "Professional Feedback",
    videoId: "EgGL4TQs3s8",
    thumbnail: `https://img.youtube.com/vi/EgGL4TQs3s8/maxresdefault.jpg`,
    rating: 5
  },
  {
    id: 4,
    name: "Ahmad Shakeel",
    title: "Customer Experience",
    videoId: "MucMzBy-ZXU",
    thumbnail: `https://img.youtube.com/vi/MucMzBy-ZXU/maxresdefault.jpg`,
    rating: 5
  },
  {
    id: 5,
    name: "Client Testimonial",
    title: "Feedback about Al-Nikaah",
    videoId: "B1SUcVvJoK0",
    thumbnail: `https://img.youtube.com/vi/B1SUcVvJoK0/maxresdefault.jpg`,
    rating: 5
  },
  {
    id: 6,
    name: "Muhammad Umar Abideen",
    title: "Success Story Feedback",
    videoId: "kLrO1oZP-Vk",
    thumbnail: `https://img.youtube.com/vi/kLrO1oZP-Vk/maxresdefault.jpg`,
    rating: 5
  },
  {
    id: 7,
    name: "Customer Review",
    title: "Al-Nikaah Services Feedback",
    videoId: "RAhrVDjAnkY",
    thumbnail: `https://img.youtube.com/vi/RAhrVDjAnkY/maxresdefault.jpg`,
    rating: 5
  }
]

export default function CustomerFeedback() {
  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
  }

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
            <span className="text-orange-400">Customer&apos;s Feedback</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            CUSTOMER&apos;S FEEDBACK
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Quote className="w-16 h-16 text-orange-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-slate-600">
            Real experiences from real people who trusted us with their journey to find their perfect match
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-2"
            >
              {/* Video Thumbnail */}
              <div 
                className="relative aspect-video overflow-hidden cursor-pointer"
                onClick={() => openVideo(feedback.videoId)}
              >
              <Image
                src={feedback.thumbnail || `https://img.youtube.com/vi/${feedback.videoId}/hqdefault.jpg`}
                alt={feedback.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  // Fallback logic (optional)
                  const target = e.target as HTMLImageElement
                  target.src = `https://img.youtube.com/vi/${feedback.videoId}/hqdefault.jpg`
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-5 transform group-hover:scale-110 transition-transform shadow-2xl">
                    <Play className="w-10 h-10 text-white fill-current" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <span className="text-white text-sm font-semibold">Video</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                  {feedback.title}
                </h3>

                {/* Name */}
                <p className="text-slate-600 font-medium mb-4">
                  {feedback.name}
                </p>

                {/* Watch Button */}
                <button
                  onClick={() => openVideo(feedback.videoId)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Watch Feedback</span>
                </button>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-br-full"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200 max-w-4xl mx-auto">
            <p className="text-slate-600 mb-6">
              We&apos;d love to hear about your success story and how we helped you find your perfect match
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}