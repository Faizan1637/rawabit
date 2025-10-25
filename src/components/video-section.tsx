"use client"

interface VideoCard {
  id: number
  title: string
  videoUrl: string
}

const videos: VideoCard[] = [
  {
    id: 1,
    title: "Munasib Rishton Ki Talash...",
    videoUrl: "https://youtu.be/k1aDXuToAHs",
  },
  {
    id: 2,
    title: "How to create account on AL-NIKAAH",
    videoUrl: "https://youtu.be/mfIuw2ZDOrA",
  },
  {
    id: 3,
    title: "Aj ki baat | Subh-e-Watan EP-24",
    videoUrl: "https://youtu.be/p7vDBGJSQ0g",
  },
]

function getYouTubeEmbedUrl(url: string): string {
  const videoId = url.split("youtu.be/")[1] || url.split("v=")[1]
  return `https://www.youtube.com/embed/${videoId}`
}

export default function VideoSection() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-foreground mb-2 text-balance">Featured Videos</h2>
        <p className="text-muted-foreground mb-12">Watch our latest content and tutorials</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-full aspect-video bg-muted overflow-hidden">
                <iframe
                  src={getYouTubeEmbedUrl(video.videoUrl)}
                  title={video.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Title */}
              <div className="bg-card p-4 border-t border-border">
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
