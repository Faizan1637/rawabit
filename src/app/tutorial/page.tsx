"use client"
import { Home, ChevronRight, Play, Star, Video } from "lucide-react"
import Image from "next/image";

interface Tutorial {
  id: number
  name: string
  title: string
  videoId: string
  thumbnail: string
  rating: number
}

const vlogs: Tutorial[] = [
  {
    id: 1,
    name: "registration tutorial",
    title: "Tutorial",
    videoId: "P7t925cWdIw",
    thumbnail: `https://img.youtube.com/vi/P7t925cWdIw/maxresdefault.jpg`,
    rating: 5
  }
]

export default function Tutorial() {
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
            <span className="text-orange-400">Tutorial</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Tutorials
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Video className="w-16 h-16 text-orange-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Customers Assistance is our Priority
          </h2>
          <p className="text-lg text-slate-600">
            Real experiences from real people who trusted us with their journey to find their perfect match
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {vlogs.map((vlog) => (
            <div
              key={vlog.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-2"
            >
              {/* Video Thumbnail */}
              <div 
                className="relative aspect-video overflow-hidden cursor-pointer"
                onClick={() => openVideo(vlog.videoId)}
              >
                <Image
                  src={vlog.thumbnail}
                  alt={vlog.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = `https://img.youtube.com/vi/${vlog.videoId}/hqdefault.jpg`;
                  }}
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
                  {[...Array(vlog.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                  {vlog.title}
                </h3>

                {/* Name */}
                <p className="text-slate-600 font-medium mb-4">
                  {vlog.name}
                </p>

                {/* Watch Button */}
                <button
                  onClick={() => openVideo(vlog.videoId)}
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

      </div>
    </div>
  )
}