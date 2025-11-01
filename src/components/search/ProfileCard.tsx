'use client';

import { ProfileSearchResult } from '@/types/search';
import Link from 'next/link';

interface ProfileCardProps {
  profile: ProfileSearchResult;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Profile Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-slate-300 flex items-center justify-center overflow-hidden">
          {/* Female/Male Avatar SVG */}
          {profile.gender === 'female' ? (
            <svg
              className="w-24 h-24 text-slate-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          ) : (
            <svg
              className="w-24 h-24 text-slate-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6">
        {/* Name */}
        <h3 className="text-xl font-bold text-slate-900 mb-1 truncate">
          {profile.fullName}
        </h3>
        
        {/* Gender & Age */}
        <p className="text-slate-600 mb-4 capitalize">
          {profile.gender}, {profile.age} Years
        </p>

        {/* Details */}
        <div className="space-y-2 text-sm mb-4">
          <p className="text-slate-700">
            <span className="font-semibold">Status:</span>{' '}
            <span className="capitalize">{profile.maritalStatus}</span>
          </p>
          <p className="text-slate-700 truncate">
            <span className="font-semibold">Location:</span> {profile.city}, {profile.state}
          </p>
          <p className="text-slate-700 truncate">
            <span className="font-semibold">Caste:</span>{' '}
            <span className="capitalize">{profile.caste}</span>
          </p>
          <p className="text-slate-700 truncate">
            <span className="font-semibold">Education:</span>{' '}
            <span className="capitalize">{profile.qualification}</span>
          </p>
          <p className="text-slate-700">
            <span className="font-semibold">Country:</span> {profile.country}
          </p>
          <p className="text-slate-600 text-xs">
            <span className="font-semibold">Serial No:</span> {profile.serialNo}
          </p>
        </div>

        {/* View Details Button */}
        <Link
          href={`/account/profile/${profile.id}`}
          className="block mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-center font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}