'use client';

import { User, MapPin, Briefcase, GraduationCap, Heart, Home, Users, BookOpen, Calendar, Crown } from 'lucide-react';
import { calculateAge } from '@/lib/utils/age-calculator';

interface ProfileDetailViewProps {
  profile: any;
}

export default function ProfileDetailView({ profile }: ProfileDetailViewProps) {
    const profileData=profile.data.profile
  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <User className="w-20 h-20 text-white" />
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{profileData.fullName}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-lg">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {calculateAge(profileData.dateOfBirth)} Years
              </span>
              <span>•</span>
              <span className="capitalize">{profileData.gender}</span>
              <span>•</span>
              <span className="capitalize">{profileData.maritalStatus}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-3 text-white/90">
              <MapPin className="w-5 h-5" />
              <span>{profileData.livesInCity}, {profileData.livesInState}, {profileData.livesInCountry}</span>
            </div>
            <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
             <span className="text-sm font-semibold">
                Serial No: {profileData.serialNo || (profileData?.id ? profileData.id.slice(-6) : 'N/A')}
            </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Full Name</p>
              <p className="text-slate-900 text-lg font-medium">{profileData.fullName}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Gender</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.gender}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Date of Birth</p>
              <p className="text-slate-900 text-lg font-medium">{profileData.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Age</p>
              <p className="text-slate-900 text-lg font-medium">{calculateAge(profileData.dateOfBirth)} Years</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Height</p>
              <p className="text-slate-900 text-lg font-medium">{profileData.height}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Body Type</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.bodyType}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Complexion</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.complexion}</p>
            </div>
            {profileData.hasBeard && (
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">Has Beard</p>
                <p className="text-slate-900 text-lg font-medium capitalize">{profileData.hasBeard}</p>
              </div>
            )}
            {profileData.disabilities && (
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">Disabilities</p>
                <p className="text-slate-900 text-lg font-medium capitalize">{profileData.disabilities}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Religious & Cultural Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Religious & Cultural Background</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Religion</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.religion}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Caste</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.caste}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Islamic Education</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.islamicEducation}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Marital Status</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.maritalStatus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Education & Career */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Education & Career</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Qualification</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.qualification}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Degree</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.degree}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Profession</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.profession}</p>
            </div>
          </div>

          <div className="space-y-4">
            {profile.designation && (
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">Designation</p>
                <p className="text-slate-900 text-lg font-medium capitalize">{profileData.designation}</p>
              </div>
            )}
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Monthly Income</p>
              <p className="text-slate-900 text-lg font-medium">PKR {profileData.monthlyIncome?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Family Background */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Family Background</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Father's Name</p>
              <p className="text-slate-900 text-lg font-medium">{profileData.fathersName}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Father Status</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.fatherAlive}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Father's Occupation</p>
              <p className="text-slate-900 text-lg font-medium capitalize">{profileData.fathersOccupation}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Number of Brothers</p>
              <p className="text-slate-900 text-lg font-medium">{profileData.numberOfBrothers}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Number of Sisters</p>
              <p className="text-slate-900 text-lg font-medium">{profileData.numberOfSisters}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">Married Brothers</p>
              <p className="text-slate-900 text-lg font-medium">{profileData.numberOfMarriedBrothers}</p>
            </div>
            {profileData.numberOfSons !== undefined && (
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">Number of Sons</p>
                <p className="text-slate-900 text-lg font-medium">{profileData.numberOfSons}</p>
              </div>
            )}
            {profileData.numberOfDaughters !== undefined && (
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">Number of Daughters</p>
                <p className="text-slate-900 text-lg font-medium">{profileData.numberOfDaughters}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Location Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-orange-500" />
              Origin Location
            </h3>
            <div className="space-y-3 pl-7">
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">Country</p>
                <p className="text-slate-900 font-medium">{profileData.fromCountry}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">State/Province</p>
                <p className="text-slate-900 font-medium">{profileData.fromState}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">City</p>
                <p className="text-slate-900 font-medium">{profileData.fromCity}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              Current Location
            </h3>
            <div className="space-y-3 pl-7">
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">Country</p>
                <p className="text-slate-900 font-medium">{profileData.country}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">State/Province</p>
                <p className="text-slate-900 font-medium">{profileData.state}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">City</p>
                <p className="text-slate-900 font-medium">{profileData.city}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <div>
            <p className="text-slate-500 text-sm font-semibold mb-1">Complete Address</p>
            <p className="text-slate-900 font-medium">{profileData.address}</p>
          </div>
        </div>
      </div>

      {/* Lifestyle */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Lifestyle</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-500 text-sm font-semibold mb-1">Lifestyle</p>
            <p className="text-slate-900 text-lg font-medium capitalize">{profileData.lifeStyle}</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-semibold mb-1">House Status</p>
            <p className="text-slate-900 text-lg font-medium capitalize">{profileData.houseStatus}</p>
          </div>
        </div>
      </div>

      {/* Requirements */}
      {profile.requirements && (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Partner Requirements</h2>
          </div>

          <div className="bg-slate-50 rounded-xl p-6">
            <p className="text-slate-900 text-lg leading-relaxed whitespace-pre-wrap">
              {profileData.requirements}
            </p>
          </div>
        </div>
      )}

      {/* Contact Note - Premium Feature */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg flex-shrink-0">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Want to Connect?
            </h3>
            <p className="text-slate-700 text-lg mb-4">
              Phone numbers and direct contact information are available to <span className="font-bold text-orange-600">Premium Members</span> only.
            </p>
            <p className="text-slate-600 mb-6">
              Upgrade to our membership package to unlock contact details and connect with your potential life partner.
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}