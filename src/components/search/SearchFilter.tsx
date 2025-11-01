'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { SearchFilters as SearchFiltersType } from '@/types/search';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';

interface SearchFiltersProps {
  onSearch: (filters: Partial<SearchFiltersType>) => void;
  onClear: () => void;
  loading?: boolean;
}

export default function SearchFilters({ onSearch, onClear, loading }: SearchFiltersProps) {
  const [filters, setFilters] = useState<Partial<SearchFiltersType>>({});

  // Country-State-City dynamic data
  const [allCountries, setAllCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    setAllCountries(Country.getAllCountries());
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (filters.country) {
      const countryStates = State.getStatesOfCountry(filters.country);
      setStates(countryStates);
      setCities([]); // reset cities
      setFilters((prev) => ({ ...prev, state: '', city: '' }));
    }
  }, [filters.country]);

  // Load cities when state changes
  useEffect(() => {
    if (filters.country && filters.state) {
      const stateCities = City.getCitiesOfState(filters.country, filters.state);
      setCities(stateCities);
      setFilters((prev) => ({ ...prev, city: '' }));
    }
  }, [filters.state]);

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
    setStates([]);
    setCities([]);
    onClear();
  };

  // Age options (18–80)
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
          <label className="block text-white font-semibold mb-2">Marital Status</label>
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
