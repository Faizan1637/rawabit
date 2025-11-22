'use client';

import { useSearch } from '@/hooks/useSearch';
import { useAuthContext } from '@/context/AuthContext';
import SearchFilters from '@/components/search/SearchFilter';
import ProfileCard from '@/components/search/ProfileCard';

export default function FindPartnerPage() {
  const { user, loading: authLoading } = useAuthContext();
  const {
    profiles,
    loading,
    error,
    pagination,
    updateFilters,
    clearFilters,
    changePage,
  } = useSearch();

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show message if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <svg
            className="w-20 h-20 mx-auto text-orange-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-slate-600 mb-6">
            Please login to search for your perfect match
          </p>
          <a
            href="/login"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
          >
            Login Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-3">
            Find Your Partner
          </h1>
          <p className="text-slate-600 text-lg">
            Browse profiles and find your perfect match In Shaa ALLAH
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Logged in as: <span className="font-semibold text-orange-600">{user.fullName}</span>
          </p>
        </div>

        {/* Search Filters */}
        <SearchFilters
          onSearch={updateFilters}
          onClear={clearFilters}
          loading={loading}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
              <p className="text-slate-600">Searching for profiles...</p>
            </div>
          </div>
        )}

        {/* Profile Grid */}
        {!loading && profiles.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {profiles.map(profile => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mb-4">
              <button
                onClick={() => changePage(pagination.page - 1)}
                disabled={pagination.page === 1 || loading}
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
              >
                «
              </button>

              {Array.from({ length: Math.min(pagination.totalPages, 6) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 6) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 5 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => changePage(pageNum)}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg transition-all font-semibold ${
                      pagination.page === pageNum
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : 'bg-white border border-slate-300 hover:bg-slate-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => changePage(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages || loading}
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
              >
                »
              </button>
            </div>

            {/* Page Info */}
            <p className="text-center text-slate-600">
              Page {pagination.page} of {pagination.totalPages}
            </p>
          </>
        )}

        {/* No Results */}
        {!loading && profiles.length === 0 && (
          <div className="text-center py-20">
            <svg
              className="w-24 h-24 mx-auto text-slate-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No {user.gender === 'male' ? 'Female' : 'Male'} Profiles Found
            </h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your search filters to find more matches
            </p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}