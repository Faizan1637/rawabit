// components/Subscription.tsx
'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { CheckCircle, XCircle, Clock, Eye, Calendar, Crown, AlertCircle } from 'lucide-react';

export default function Subscription() {
  const { list, active, loading, error } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-red-900 mb-1">Error Loading Subscriptions</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string, expired: boolean) => {
    if (expired) return 'bg-red-100 text-red-700 border-red-300';
    if (status === 'active') return 'bg-green-100 text-green-700 border-green-300';
    if (status === 'cancelled') return 'bg-slate-100 text-slate-700 border-slate-300';
    return 'bg-amber-100 text-amber-700 border-amber-300';
  };

  const getStatusIcon = (status: string, expired: boolean) => {
    if (expired) return <XCircle className="w-4 h-4" />;
    if (status === 'active') return <CheckCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Crown className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">My Subscriptions</h1>
            <p className="text-orange-100 text-sm">Manage your active plans and view history</p>
          </div>
        </div>
      </div>

      {/* Active Subscription Card */}
      {active ? (
        <div className="bg-white rounded-xl shadow-lg border-2 border-orange-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Active Subscription</h2>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                Active
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Package Name */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{active.packageName}</h3>
                <p className="text-slate-600 text-sm">Your current plan</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-semibold mb-1">Status</p>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(active.status, active.expired)}`}>
                  {getStatusIcon(active.status, active.expired)}
                  {active.expired ? 'Expired' : active.status}
                </span>
              </div>
            </div>

            {/* Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-0.5">Start Date</p>
                    <p className="text-sm font-bold text-slate-900">{formatDate(active.startDate)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-0.5">End Date</p>
                    <p className="text-sm font-bold text-slate-900">{formatDate(active.endDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Views Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-semibold text-slate-700">Profile Views</span>
                </div>
                <span className="text-sm font-bold text-slate-900">
                  {active.viewedCount} / {active.totalCount}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((active.viewedCount / active.totalCount) * 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500">
                  {Math.round((active.viewedCount / active.totalCount) * 100)}% used
                </span>
                <span className="text-xs font-semibold text-orange-600">
                  {active.remainingCount} views remaining
                </span>
              </div>
            </div>

            {/* Channel Badge */}
            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-2 font-semibold">Subscription Channel</p>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                {active.channel === 'web' ? '🌐 Web' : '📱 Mobile'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-amber-900 mb-2">No Active Subscription</h3>
          <p className="text-amber-700 text-sm mb-4">
            Subscribe to a package to start viewing contact details of profiles
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg">
            View Packages
          </button>
        </div>
      )}

      {/* Subscription History */}
      {list && list.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900">Subscription History</h2>
            <p className="text-slate-600 text-sm">All your past and current subscriptions</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Channel
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {list.map((subscription: any) => (
                  <tr key={subscription.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{subscription.packageName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {formatDate(subscription.startDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {formatDate(subscription.endDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(subscription.status, subscription.expired)}`}>
                        {getStatusIcon(subscription.status, subscription.expired)}
                        {subscription.expired ? 'Expired' : subscription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-900">
                          {subscription.viewedCount}/{subscription.totalCount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                        {subscription.channel === 'web' ? '🌐 Web' : '📱 Mobile'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State for No History */}
      {(!list || list.length === 0) && !active && (
        <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-12 text-center">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No Subscription History</h3>
          <p className="text-slate-500 text-sm">
            You haven't subscribed to any packages yet
          </p>
        </div>
      )}
    </div>
  );
}