import { getFeaturedProfiles } from '@/repositries/profile.repositories';
import { Profile } from '@/types/profile';
import { calculateAge } from '@/lib/utils/age-calculator';

export interface FeaturedProfileResult {
  id: string;
  name: string;
  gender: string;
  age: number;
  maritalStatus: string;
  caste?: string;
  sect: string;
  education?: string;
  profession?: string;
  location: string;
  serialNo: string;
}

/**
 * Get featured profiles for homepage display
 * Returns sanitized profile data for public viewing
 */
export const getFeaturedProfilesForHomepage = async (): Promise<FeaturedProfileResult[]> => {
  const profiles = await getFeaturedProfiles(8);

  return profiles.map((profile: Profile) => ({
    id: profile._id!.toString(),
    name: `${profile.firstName} ${profile.lastName}`,
    gender: profile.gender === 'male' ? 'Male' : 'Female',
    age: calculateAge(profile.dateOfBirth),
    maritalStatus: profile.maritalStatus,
    caste: profile.caste,
    sect: profile.islamicEducation, // Using islamicEducation as sect
    education: profile.qualification,
    profession: profile.profession,
    location: `${profile.livesInCountry} - ${profile.livesInCity}`,
    serialNo: profile._id!.toString().slice(-6), // Last 6 chars as serial
  }));
};