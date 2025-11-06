'use client';

import { useState, useMemo, ChangeEvent } from 'react';
import { SearchFilters as SearchFiltersType } from '@/types/search';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
import { 
  CASTE_OPTIONS,
  MASLAK_OPTIONS,
  RELIGION_OPTIONS
} from "@/constants/createProfile/background-family-const";
import {
  maritalStatusOptions,
  qualificationOptions,
  islamicEducationOptions
} from "@/constants/createProfile/personal-info-const";

interface SearchFiltersProps {
  onSearch: (filters: Partial<SearchFiltersType>) => void;
  onClear: () => void;
  loading?: boolean;
}

export default function SearchFilters({ onSearch, onClear, loading }: SearchFiltersProps) {
  const [filters, setFilters] = useState<Partial<SearchFiltersType>>({});

  // Memoize countries - only compute once
  const allCountries = useMemo<ICountry[]>(() => {
    return Country.getAllCountries();
  }, []);

  // Memoize states based on selected country
  const states = useMemo<IState[]>(() => {
    if (!filters.country) return [];
    return State.getStatesOfCountry(filters.country);
  }, [filters.country]);

  // Memoize cities based on selected country and state
  const cities = useMemo<ICity[]>(() => {
    if (!filters.country || !filters.state) return [];
    return City.getCitiesOfState(filters.country, filters.state);
  }, [filters.country, filters.state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle country change - reset state and city
    if (name === 'country') {
      setFilters(prev => ({
        ...prev,
        country: value || undefined,
        state: undefined,
        city: undefined,
      }));
    }
    // Handle state change - reset city
    else if (name === 'state') {
      setFilters(prev => ({
        ...prev,
        state: value || undefined,
        city: undefined,
      }));
    }
    // Handle other fields normally
    else {
      setFilters(prev => ({
        ...prev,
        [name]: value || undefined,
      }));
    }
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClear();
  };

  // Memoize age options
  const ageOptions = useMemo(() => {
    return Array.from({ length: 63 }, (_, i) => i + 18);
  }, []);

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
            {allCountries.map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-white font-semibold mb-2">State</label>
          <select
            name="state"
            value={filters.state || ''}
            onChange={handleChange}
            disabled={!filters.country || states.length === 0}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none disabled:opacity-60"
          >
            <option value="">
              {filters.country ? 'Select' : 'Select a country first'}
            </option>
            {states.map((s) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-white font-semibold mb-2">City</label>
          <select
            name="city"
            value={filters.city || ''}
            onChange={handleChange}
            disabled={!filters.state || cities.length === 0}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none disabled:opacity-60"
          >
            <option value="">
              {filters.state ? 'Select' : 'Select a state first'}
            </option>
            {cities.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
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
            {RELIGION_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
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
            {MASLAK_OPTIONS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
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
            {islamicEducationOptions.map((edu) => (
              <option key={edu.value} value={edu.value}>
                {edu.label}
              </option>
            ))}
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
            {qualificationOptions.map((q) => (
              <option key={q.value} value={q.value}>
                {q.label}
              </option>
            ))}
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-white font-semibold mb-2">Marital Status</label>
          <select
            name="maritalStatus"
            value={filters.maritalStatus || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">Select</option>
            {maritalStatusOptions.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
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
            {CASTE_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
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