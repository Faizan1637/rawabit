"use client"

import { Info } from "lucide-react"


interface MembershipPlan {
  name: string
  price: number
  duration: string
  contacts: number
  badge: string
  badgeColor: string
  gradient: string
  borderColor: string
  isPopular?: boolean
}

const plans: MembershipPlan[] = [
  {
    name: "Gold",
    price: 2000,
    duration: "3 Months",
    contacts: 20,
    badge: "GOLD",
    badgeColor: "bg-amber-500",
    gradient: "from-orange-50 to-amber-50",
    borderColor: "border-amber-200"
  },
  {
    name: "Platinum",
    price: 3000,
    duration: "6 Months",
    contacts: 45,
    badge: "PLATINUM",
    badgeColor: "bg-orange-500",
    gradient: "from-orange-100 to-red-50",
    borderColor: "border-orange-300",
    isPopular: true
  },
  {
    name: "Diamond",
    price: 5000,
    duration: "12 Months",
    contacts: 100,
    badge: "DIAMOND",
    badgeColor: "bg-red-500",
    gradient: "from-red-50 to-orange-50",
    borderColor: "border-red-200"
  },
]

export default function MembershipPlans() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-orange-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Premium Membership Plans
          </h2>
          <p className="text-xl text-slate-600 text-balance">
            Flexible Plans That Fit Your Needs
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-300 ${
                plan.isPopular ? "md:scale-105" : ""
              }`}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Most Popular
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative h-full rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                  plan.borderColor
                } ${
                  plan.isPopular
                    ? "ring-2 ring-orange-400 shadow-2xl shadow-orange-500/20"
                    : "hover:shadow-xl hover:border-orange-300"
                }`}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient}`}
                ></div>

                {/* Content */}
                <div className="relative p-8 flex flex-col h-full bg-white/60 backdrop-blur-sm">
                  {/* Badge */}
                  <div className="mb-6">
                    <span
                      className={`inline-block ${plan.badgeColor} text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                      PKR {plan.price.toLocaleString()}
                    </div>
                    <div className="text-slate-700 font-semibold mb-2">
                      {plan.duration}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="font-semibold">{plan.contacts} Contacts</span>
                      <Info size={16} className="text-orange-500" />
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-6 flex-grow">
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">✓</span>
                        <span>Full profile access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">✓</span>
                        <span>Contact details unlock</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">✓</span>
                        <span>Profile visibility boost</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terms and conditions */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200 shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Info className="text-orange-500" />
            Important Information
          </h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1 font-bold">•</span>
              <span>
                For your convenience we also post your profile at all our branches, so anyone who likes your proposal
                can contact with you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1 font-bold">•</span>
              <span>We cannot offer any match instead of website.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1 font-bold">•</span>
              <span>We are responsible that we provide you basic information and phone numbers.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1 font-bold">•</span>
              <span>All the procedure like contact, meeting and any other queries is your own responsibility.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}