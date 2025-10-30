export interface SearchFilters {
  // Location
  country?: string;
  state?: string;
  city?: string;
  
  // Religious & Cultural
  religion?: string;
  maslak?: string;
  islamicEducation?: string;
  caste?: string;
  
  // Personal
  maritalStatus?: string;
  minAge?: number;
  maxAge?: number;
  serialNo?: string;
  
  // Education
  minQualification?: string;
  
  // Pagination
  page?: number;
  limit?: number;
}

export interface ProfileSearchResult {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  age: number;
  maritalStatus: string;
  city: string;
  state: string;
  country: string;
  qualification: string;
  profession: string;
  caste: string;
  religion: string;
  islamicEducation: string;
  serialNo?: string;
}

export interface SearchResponse {
  profiles: ProfileSearchResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}