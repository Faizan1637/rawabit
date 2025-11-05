'use client';

import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

interface SubscriptionStatusProps {
  subscription: {
    packageName: string;
    startDate: string;
    endDate: string;
    totalCount: number;
    viewedCount: number;
    remainingCount: number;
    status: string;
    expired: boolean;
  } | null;
}

export default function SubscriptionStatus({ subscription }: SubscriptionStatusProps) {
  if (!subscription) {
    return (
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 text-center">
        <XCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">No Active Subscription</h3>
        <p className="text-slate-600 mb-6">
          Purchase a package to start viewing contact details
        </p>
        <a
          href="/account/packages"
          className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
        >
          View Packages
        </a>
      </div>
    );
  }

  const isActive = subscription.status === 'active' && !subscription.expired;

  return (
    <div className={`rounded-2xl p-8 ${
      isActive
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500'
        : 'bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300'
    }`}>
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-slate-900">
          {subscription.packageName} Package
        </h3>
        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
          isActive
            ? 'bg-green-500 text-white'
            : 'bg-orange-500 text-white'
        }`}>
          {isActive ? (
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              ACTIVE
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {subscription.expired ? 'EXPIRED' : subscription.status.toUpperCase()}
            </span>
          )}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-slate-600 text-sm mb-2">Total Views</p>
          <p className="text-3xl font-bold text-slate-900">{subscription.totalCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-slate-600 text-sm mb-2">Used</p>
          <p className="text-3xl font-bold text-orange-600">{subscription.viewedCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-slate-600 text-sm mb-2">Remaining</p>
          <p className="text-3xl font-bold text-green-600">{subscription.remainingCount}</p>
        </div>
      </div>

      {/* Date Range */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            <span className="text-slate-700 font-semibold">Validity Period</span>
          </div>
          <div className="text-right">
            <p className="text-slate-900 font-medium">
              {subscription.startDate} to {subscription.endDate}
            </p>
          </div>
        </div>
      </div>

      {/* Warning if low on views */}
      {isActive && subscription.remainingCount <= 5 && subscription.remainingCount > 0 && (
        <div className="mt-4 bg-amber-100 border-2 border-amber-300 rounded-xl p-4">
          <p className="text-amber-800 font-semibold text-center">
            ⚠️ Only {subscription.remainingCount} views remaining! Consider renewing soon.
          </p>
        </div>
      )}

      {/* Expired message */}
      {subscription.expired && (
        <div className="mt-4 text-center">
          <p className="text-slate-700 mb-4">Your subscription has expired</p>
          <a
            href="/account/packages"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
          >
            Renew Now
          </a>
        </div>
      )}
    </div>
  );
}