'use client';

import { useState, ChangeEvent } from 'react';
import { SearchFilters as SearchFiltersType } from '@/types/search';

interface SearchFiltersProps {
  onSearch: (filters: Partial<SearchFiltersType>) => void;
  onClear: () => void;
  loading?: boolean;
}

export default function SearchFilters({ onSearch, onClear, loading }: SearchFiltersProps) {
  const [filters, setFilters] = useState<Partial<SearchFiltersType>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClear();
  };

  // Age options (18-80)
  const ageOptions = Array.from({ length: 63 }, (_, i) => i + 18);

  return (
    <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl shadow-xl mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Country */}
        <div>
          <label className="block text-white font-semibold mb-2">Country</label>
          <select
            name="country"
            value={filters.country || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            <option value="PK">Pakistan</option>
            <option value="SA">Saudi Arabia</option>
            <option value="AE">UAE</option>
            <option value="UK">United Kingdom</option>
            <option value="US">United States</option>
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-white font-semibold mb-2">State</label>
          <select
            name="state"
            value={filters.state || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            <option value="PB">Punjab</option>
            <option value="SD">Sindh</option>
            <option value="KP">Khyber Pakhtunkhwa</option>
            <option value="BA">Balochistan</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-white font-semibold mb-2">City</label>
          <select
            name="city"
            value={filters.city || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Faisalabad">Faisalabad</option>
          </select>
        </div>

        {/* Religion */}
        <div>
          <label className="block text-white font-semibold mb-2">Religion</label>
          <select
            name="religion"
            value={filters.religion || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            <option value="muslim">Muslim</option>
          </select>
        </div>

        {/* Maslak */}
        <div>
          <label className="block text-white font-semibold mb-2">Maslak</label>
          <select
            name="maslak"
            value={filters.maslak || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            <option value="ahleHadith">Ahle Hadith</option>
            <option value="ahleSunnat">Ahle Sunnat</option>
            <option value="deobandi">Deobandi</option>
            <option value="barelvi">Barelvi</option>
          </select>
        </div>

        {/* Islamic Education */}
        <div>
          <label className="block text-white font-semibold mb-2">Islamic Education</label>
          <select
            name="islamicEducation"
            value={filters.islamicEducation || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            <option value="qaidaNoorani">Qaida Noorani</option>
            <option value="nazirah">Nazirah</option>
            <option value="hifz">Hifz</option>
            <option value="aalim">Aalim</option>
            <option value="darseNizami">Darse Nizami</option>
          </select>
        </div>

        {/* Minimum Qualification */}
        <div>
          <label className="block text-white font-semibold mb-2">Minimum Qualification</label>
          <select
            name="minQualification"
            value={filters.minQualification || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            <option value="matric">Matric</option>
            <option value="intermediate">Intermediate</option>
            <option value="bachelors">Bachelors</option>
            <option value="masters">Masters</option>
            <option value="phd">PhD</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-white font-semibold mb-2">Marital-Status</label>
          <select
            name="maritalStatus"
            value={filters.maritalStatus || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            <option value="single">Single</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        {/* Caste */}
        <div>
          <label className="block text-white font-semibold mb-2">Caste</label>
          <select
            name="caste"
            value={filters.caste || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            <option value="rajput">Rajput</option>
            <option value="jat">Jat</option>
            <option value="arain">Arain</option>
            <option value="malik">Malik</option>
            <option value="sheikh">Sheikh</option>
            <option value="syed">Syed</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Minimum Age */}
        <div>
          <label className="block text-white font-semibold mb-2">Minimum Age</label>
          <select
            name="minAge"
            value={filters.minAge || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            {ageOptions.map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>

        {/* Maximum Age */}
        <div>
          <label className="block text-white font-semibold mb-2">Maximum Age</label>
          <select
            name="maxAge"
            value={filters.maxAge || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            {ageOptions.map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>

        {/* Serial No */}
        <div>
          <label className="block text-white font-semibold mb-2">Serial No</label>
          <input
            type="text"
            name="serialNo"
            value={filters.serialNo || ''}
            onChange={handleChange}
            placeholder="Serial No"
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-white text-orange-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
        >
          {loading ? 'SEARCHING...' : 'SEARCH'}
        </button>
        <button
          onClick={handleClear}
          disabled={loading}
          className="bg-white/20 text-white font-bold py-4 px-8 rounded-lg hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
        >
          CLEAR APPLIED FILTERS
        </button>
      </div>
    </div>
  );
}