"use client";

import { useState } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  SearchOutlined,
  SettingOutlined,
  CreditCardOutlined,
  WalletOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { Button, Avatar } from "antd";
import MembershipPlans from "@/components/membership-plans";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext"; // ✅ Import global state

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // ✅ Get logged-in user from AuthContext
  const { user, isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-orange-600">
        Loading your dashboard...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // ✅ Redirect or message for unauthenticated users
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
        <p className="text-xl text-slate-700 font-semibold">
          Please log in to access your dashboard.
        </p>
        <Button
          type="primary"
          className="bg-orange-500 hover:bg-orange-600 font-semibold"
          onClick={() => router.push("/login")}
        >
          Go to Login
        </Button>
      </div>
    );
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
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome! {user.firstName}
              </h1>
              <p className="text-orange-100 text-lg">
                Let's find your perfect match today
              </p>
            </div>

            {/* Alerts */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile Alert */}
              {!user.profileCompleted && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserOutlined className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-amber-900 mb-2">
                        Create Profile
                      </h3>
                      <p className="text-amber-800 mb-4">
                        You don't have a <span className="font-semibold">Profile</span> yet.
                        Please create one to start finding matches.
                      </p>
                      <Button
                        type="primary"
                        size="large"
                        className="bg-amber-500 hover:bg-amber-600 border-none font-semibold shadow-md"
                        onClick={() => router.push("/account/createprofile")}
                      >
                        Create Profile Now
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Subscription Alert
              {user.subscriptionExpired && (
                <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <ClockCircleOutlined className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-red-900 mb-2">
                        Subscription Expired!
                      </h3>
                      <p className="text-red-800 mb-4">
                        Your plan <span className="font-semibold text-orange-600">{user.subscription}</span>{" "}
                        expired <span className="font-semibold">{user.daysExpired} days ago</span>. Please renew it.
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
              )} */}
            </div>
          </div>
        );
      case "profile":
        // router.push('/account/createprofile')
      default:
        return (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Coming Soon</h2>
            <p className="text-slate-600">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-0">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside
            className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] lg:h-auto
              w-72 lg:w-64 bg-white rounded-2xl shadow-xl border border-slate-200 
              transition-transform duration-300 z-30
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
              lg:flex-shrink-0 overflow-y-auto`}
          >
            {/* Mobile Close */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-10"
            >
              <CloseOutlined className="text-xl" />
            </button>

            {/* User Info */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col items-center text-center">
                <Avatar
                  size={80}
                  icon={<UserOutlined />}
                  className="bg-gradient-to-br from-orange-500 to-orange-600 mb-4 shadow-lg"
                />
                <h3 className="text-lg font-bold text-slate-800 mb-1">{user.firstName}</h3>
                {/* <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    user.subscriptionExpired
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.subscriptionExpired ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
                  {user.subscription || "Free Plan"}
                </div> */}
              </div>
            </div>

            {/* Sidebar Menu */}
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                          onClick={() => {
                            setIsSidebarOpen(false);
                            if (item.id === "profile") {
                              router.push("/account/createprofile");
                            } else {
                              setActiveTab(item.id);
                            }
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl
                            transition-all duration-200 font-medium
                            ${
                              isActive
                                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                                : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                            }`}
                        >
                          <Icon className="text-lg" />
                          <span>{item.label}</span>
                        </button>

                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-20 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">{renderContent()}
          </main>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
