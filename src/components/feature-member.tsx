import { Heart } from "lucide-react"

interface Profile {
  name: string
  gender: "Male" | "Female"
  age: number
  maritalStatus: string
  caste?: string
  sect: string
  education?: string
  profession?: string
  location: string
  serialNo: string
}

const profiles: Profile[] = [
  {
    name: "Aimen Tanveer",
    gender: "Female",
    age: 25,
    maritalStatus: "Un-Married",
    caste: "Mughal",
    sect: "Ahle Hadees",
    education: "Masters Degree",
    location: "Pakistan - Rawalpindi",
    serialNo: "009683"
  },
  {
    name: "Binte Muhammad Shehzad",
    gender: "Female",
    age: 23,
    maritalStatus: "Un-Married",
    caste: "Butt",
    sect: "Sunni (Ahle Sunnat)",
    profession: "Doctor",
    location: "Pakistan - Lahore",
    serialNo: "009664"
  },
  {
    name: "Rida Rafique",
    gender: "Female",
    age: 28,
    maritalStatus: "Un-Married",
    caste: "Bhatti-Rajpoot",
    sect: "Sunni (Ahle Sunnat)",
    education: "Bachelors Degree",
    location: "Pakistan - Lahore",
    serialNo: "009663"
  },
  {
    name: "Nimra Fiyaz",
    gender: "Female",
    age: 24,
    maritalStatus: "Un-Married",
    caste: "Rajpoot",
    sect: "Sunni (Ahle Sunnat)",
    education: "Bachelors Degree",
    location: "Pakistan - Lahore",
    serialNo: "009656"
  },
  {
    name: "Bilal Sadaqat",
    gender: "Male",
    age: 33,
    maritalStatus: "For 2nd Marriage",
    caste: "Bhatti-Rajpoot",
    sect: "Sunni (Ahle Sunnat)",
    education: "Masters Degree",
    location: "Pakistan - Rawalpindi",
    serialNo: "009691"
  },
  {
    name: "Iftikhar Ahmed",
    gender: "Male",
    age: 54,
    maritalStatus: "For 2nd Marriage",
    caste: "Gujjar",
    sect: "Deobandi",
    education: "Non Matriculation",
    location: "Pakistan - Gujrat",
    serialNo: "009682"
  }
]

export default function FeaturedProfiles() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-orange-500 fill-none stroke-2" strokeWidth={3} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Featured Profiles
          </h2>
          <p className="text-gray-500 text-lg">makes you happier :)</p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div className="w-32 h-32 mb-4 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  fill="#9CA3AF"
                >
                  {profile.gender === "Female" ? (
                    // Female avatar with hijab
                    <>
                      <ellipse cx="50" cy="45" rx="20" ry="25" fill="#9CA3AF" />
                      <path
                        d="M 30 40 Q 30 20 50 20 Q 70 20 70 40 L 70 70 Q 70 85 50 90 Q 30 85 30 70 Z"
                        fill="#9CA3AF"
                      />
                      <circle cx="50" cy="50" r="15" fill="#E5E7EB" />
                      <ellipse cx="50" cy="70" rx="25" ry="15" fill="#9CA3AF" />
                    </>
                  ) : (
                    // Male avatar
                    <>
                      <circle cx="50" cy="35" r="15" fill="#E5E7EB" />
                      <ellipse cx="50" cy="70" rx="25" ry="20" fill="#9CA3AF" />
                      <rect x="40" y="48" width="20" height="15" fill="#E5E7EB" />
                    </>
                  )}
                </svg>
              </div>

              {/* Profile Details */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-800">{profile.name}</h3>
                <p className="text-sm text-gray-600">
                  {profile.gender}, {profile.age} Years,
                </p>
                <p className="text-sm text-gray-600">{profile.maritalStatus}</p>
                {profile.caste && (
                  <p className="text-sm text-gray-600">{profile.caste}</p>
                )}
                <p className="text-sm text-gray-600">{profile.sect}</p>
                {profile.profession && (
                  <p className="text-sm text-gray-600">{profile.profession}</p>
                )}
                {profile.education && (
                  <p className="text-sm text-gray-600">{profile.education}</p>
                )}
                <p className="text-sm text-gray-600">{profile.location}</p>
                <p className="text-sm text-gray-500">Serial No: {profile.serialNo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}