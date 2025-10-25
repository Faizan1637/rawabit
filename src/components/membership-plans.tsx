"use client"

import { Info } from "lucide-react"
import { Button } from "antd"

interface MembershipPlan {
  name: string
  price: number
  duration: string
  contacts: number
  badge: string
  badgeColor: string
  gradient: string
  isPopular?: boolean
}

const plans: MembershipPlan[] = [
  {
    name: "Gold",
    price: 5000,
    duration: "3 Months",
    contacts: 20,
    badge: "GOLD",
    badgeColor: "bg-amber-400",
    gradient: "from-amber-100 to-yellow-100"
  },
  {
    name: "Platinum",
    price: 10000,
    duration: "6 Months",
    contacts: 45,
    badge: "PLATINUM",
    badgeColor: "bg-cyan-400",
    gradient: "from-cyan-100 to-blue-100",
    isPopular: true
  },
  {
    name: "Diamond",
    price: 16000,
    duration: "12 Months",
    contacts: 100,
    badge: "DIAMOND",
    badgeColor: "bg-slate-300",
    gradient: "from-slate-100 to-gray-100"
  },
]

export default function MembershipPlans() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-slate-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Premium Membership Plans</h2>
          <p className="text-xl text-slate-300 text-balance">Flexible Plans That Fit Your Needs</p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-300 ${plan.isPopular ? "md:scale-105" : ""}`}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative h-full rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  plan.isPopular ? "ring-2 ring-cyan-400 shadow-xl shadow-cyan-500/20" : "hover:shadow-xl"
                }`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient}`}></div>

                {/* Content */}
                <div className="relative p-8 flex flex-col h-full">
                  {/* Badge */}
                  <div className="mb-6">
                    <span
                      className={`inline-block ${plan.badgeColor} text-white px-4 py-1 rounded-lg text-sm font-bold`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">PKR {plan.price.toLocaleString()}</div>
                    <div className="text-gray-700 font-semibold mb-1">{plan.duration}</div>
                    <div className="text-gray-600 flex items-center gap-2">
                      <span>{plan.contacts} Contacts</span>
                      <Info size={16} className="text-gray-500" />
                    </div>
                  </div>

                  {/* Button */}
                  <Button
                    type="primary"
                    size="large"
                    block
                    className={`font-bold ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    style={{
                      height: '48px',
                      borderRadius: '8px',
                      background: plan.isPopular 
                        ? 'linear-gradient(to right, #ef4444, #dc2626)' 
                        : '#ef4444'
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terms and conditions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-amber-400 mt-1">•</span>
              <span>
                For your convenience we also post your profile at all our branches, so anyone who likes your proposal
                can contact with you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400 mt-1">•</span>
              <span>We cannot offer any match instead of website.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400 mt-1">•</span>
              <span>We are responsible that we provide you basic information and phone numbers.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400 mt-1">•</span>
              <span>All the procedure like contact, meeting and any other queries is your own responsibility.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}