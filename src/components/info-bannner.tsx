import { Users, UserCheck, Heart, MapPin } from "lucide-react"

interface StatItem {
  icon: React.ReactNode
  count: string
  label: string
  gradient: string
  iconBg: string
}

const stats: StatItem[] = [
  {
    icon: <Users className="w-8 h-8" />,
    count: "199",
    label: "Boys Active Profiles",
    gradient: "from-purple-600 via-pink-600 to-pink-700",
    iconBg: "bg-white/20"
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    count: "90",
    label: "Girls Active Profiles",
    gradient: "from-red-600 via-red-700 to-rose-700",
    iconBg: "bg-white/20"
  },
  {
    icon: <Heart className="w-8 h-8 fill-current" />,
    count: "801",
    label: "Success Stories",
    gradient: "from-red-500 via-red-600 to-pink-600",
    iconBg: "bg-white/20"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    count: "2",
    label: "Our Branches",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    iconBg: "bg-white/20"
  }
]

export default function InfoBanner() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className={`relative h-full rounded-2xl bg-gradient-to-br ${stat.gradient} p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className={`${stat.iconBg} rounded-full p-4 backdrop-blur-sm`}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>

                  {/* Count */}
                  <div className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                    {stat.count}
                  </div>

                  {/* Label */}
                  <div className="text-white text-lg font-semibold drop-shadow-md">
                    {stat.label}
                  </div>
                </div>

                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}