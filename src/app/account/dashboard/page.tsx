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
} from "@ant-design/icons";
import { Button, Avatar, Spin, Alert } from "antd";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext"; 
import ChangePasswordForm from "@/components/ChangePasswordForm";
import PaymentMethods from "@/components/PaymentMethod";
import PackageList from '@/components/packages/PackageList';
import Subscription from '@/components/subscription/Subscription';
import Transaction from '@/components/transaction/Transaction';
import { usePackages } from '@/hooks/usePackage';
import { useTransaction } from "@/hooks/useTransaction";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { packages, packagesLoading, error } = usePackages();
  
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
          <div className="space-y-4">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                Welcome! {user.firstName}
              </h1>
              <p className="text-orange-100">
                Let's find your perfect match today
              </p>
            </div>

            {/* Profile Alert */}
            {!user.profileCompleted && (
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-4 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserOutlined className="text-xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-amber-900 mb-1">
                      Create Profile
                    </h3>
                    <p className="text-amber-800 text-sm mb-3">
                      You don't have a <span className="font-semibold">Profile</span> yet.
                      Please create one to start finding matches.
                    </p>
                    <Button
                      type="primary"
                      className="bg-amber-500 hover:bg-amber-600 border-none font-semibold shadow-md"
                      onClick={() => router.push("/account/createprofile")}
                    >
                      Create Profile Now
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Packages Section */}
            <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200">
              <h2 className="text-xl font-bold text-center text-slate-800 mb-1">
                Choose Your Package
              </h2>
              <p className="text-center text-slate-600 text-sm mb-5">
                Unlock contact details of verified profiles
              </p>

              {packagesLoading && (
                <div className="text-center py-8">
                  <Spin size="large" />
                </div>
              )}

              {error && (
                <Alert 
                  message={error} 
                  type="error" 
                  showIcon 
                  className="mb-4" 
                />
              )}

              {!packagesLoading && !error && (
                <PackageList packages={packages} packagesLoading={packagesLoading} />
              )}
            </div>
          </div>
        );

      case "profile":
        return null;

      case "account":
        return <ChangePasswordForm />;

      case "subscriptions":
        return <Subscription />;

      case "payments":
        return <Transaction />;

      case "payment-methods":
        return (
          <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200">
            <PaymentMethods />
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200 text-center">
            <div className="text-5xl mb-3">🚧</div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Coming Soon</h2>
            <p className="text-slate-600 text-sm">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-0">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Fixed Height */}
          <aside
            className={`fixed lg:sticky top-20 left-0 
              w-72 lg:w-64 bg-white rounded-xl shadow-lg border border-slate-200 
              transition-transform duration-300 z-30
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
              lg:flex-shrink-0
              h-[calc(100vh-7rem)] lg:h-[calc(100vh-7rem)]
              overflow-hidden flex flex-col`}
          >
            {/* Mobile Close */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-10"
            >
              <CloseOutlined className="text-xl" />
            </button>

            {/* User Info - Fixed at top */}
            <div className="p-5 border-b border-slate-200 flex-shrink-0">
              <div className="flex flex-col items-center text-center">
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  className="bg-gradient-to-br from-orange-500 to-orange-600 mb-3 shadow-md"
                />
                <h3 className="text-base font-bold text-slate-800">{user.firstName}</h3>
              </div>
            </div>

            {/* Sidebar Menu - Scrollable */}
            <nav className="p-3 flex-1 overflow-y-auto">
              <ul className="space-y-1">
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
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                          transition-all duration-200 font-medium text-sm
                          ${
                            isActive
                              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                              : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                          }`}
                      >
                        <Icon className="text-base" />
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

          {/* Main Content - Scrollable */}
          <main className="flex-1 min-w-0 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;