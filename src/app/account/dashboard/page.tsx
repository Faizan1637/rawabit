"use client"

import { useState } from "react"
import { 
  UserOutlined, 
  DashboardOutlined, 
  SearchOutlined, 
  SettingOutlined, 
  CreditCardOutlined, 
  WalletOutlined,
  DeleteOutlined,
  CloseOutlined,
  LogoutOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from "@ant-design/icons"
import { Button, Avatar } from "antd"
import MembershipPlans from "@/components/membership-plans"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Mock user data
  const user = {
    name: "Hanan Ahmad",
    email: "faizanakram116@gmail.com",
    avatar: null,
    subscription: "Free Trial",
    subscriptionExpired: true,
    daysExpired: 2,
    profileCompleted: false
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: DashboardOutlined },
    { id: "profile", label: "Profile", icon: UserOutlined },
    { id: "find-match", label: "Find Match", icon: SearchOutlined },
    { id: "account", label: "Account", icon: SettingOutlined },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCardOutlined },
    { id: "payments", label: "Payments", icon: WalletOutlined },
    { id: "payment-methods", label: "Payment Methods", icon: CreditCardOutlined },
    { id: "delete-account", label: "Delete Account", icon: DeleteOutlined },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome! {user.name}</h1>
              <p className="text-orange-100 text-lg">Let's find your perfect match today</p>
            </div>

            {/* Alert Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile Alert */}
              {!user.profileCompleted && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserOutlined className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-amber-900 mb-2">Create Profile</h3>
                      <p className="text-amber-800 mb-4">
                        You don't have any <span className="font-semibold">Profile</span> created yet. We recommend you create profile first. 
                        Without profile you can not find match. Updating your profile with your name, location, and a profile picture helps other users get to know you.
                      </p>
                      <Button 
                        type="primary"
                        size="large"
                        className="bg-amber-500 hover:bg-amber-600 border-none font-semibold shadow-md"
                        onClick={() => setActiveTab("profile")}
                      >
                        Create Profile Now
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Subscription Alert */}
              {user.subscriptionExpired && (
                <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <ClockCircleOutlined className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-red-900 mb-2">Subscription Expired!</h3>
                      <p className="text-red-800 mb-4">
                        Dear customer your profile has been temporarily closed because your current package{" "}
                        <span className="font-semibold text-orange-600">{user.subscription}</span> has been expired{" "}
                        <span className="font-semibold">{user.daysExpired} days ago</span>. Please buy package as soon as possible, 
                        so you can utilize your profile.
                      </p>
                      <Button 
                        type="primary"
                        size="large"
                        className="bg-red-500 hover:bg-red-600 border-none font-semibold shadow-md"
                        onClick={() => setActiveTab("subscriptions")}
                      >
                        View Plans
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
                <div className="text-sm text-slate-600 font-medium">Profile Views</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
                <div className="text-sm text-slate-600 font-medium">Matches Found</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
                <div className="text-sm text-slate-600 font-medium">Contacts Used</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
                <div className="text-sm text-slate-600 font-medium">Favorites</div>
              </div>
            </div>
          </div>
        )
      
      case "subscriptions":
        return <MembershipPlans />
      
      default:
        return (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Coming Soon</h2>
            <p className="text-slate-600">This section is under development</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-0">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`
            fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] lg:h-auto
            w-72 lg:w-64 bg-white rounded-2xl shadow-xl border border-slate-200 
            transition-transform duration-300 z-30
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:flex-shrink-0 overflow-y-auto
          `}>
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-10"
            >
              <CloseOutlined className="text-xl" />
            </button>

            {/* User Profile Section */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col items-center text-center">
                <Avatar 
                  size={80} 
                  icon={<UserOutlined />} 
                  className="bg-gradient-to-br from-orange-500 to-orange-600 mb-4 shadow-lg"
                />
                <h3 className="text-lg font-bold text-slate-800 mb-1">{user.name}</h3>
                <div className={`
                  inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold
                  ${user.subscriptionExpired 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                  }
                `}>
                  {user.subscriptionExpired ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
                  {user.subscription}
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id)
                          setIsSidebarOpen(false)
                        }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-2 rounded-xl
                          transition-all duration-200 font-medium
                          ${isActive 
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' 
                            : 'text-slate-700 hover:bg-orange-50 hover:text-orange-600'
                          }
                        `}
                      >
                        <Icon className="text-lg" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* Logout Button */}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mt-4 text-red-600 hover:bg-red-50 transition-all duration-200 font-medium">
                <LogoutOutlined className="text-lg" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-20 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard