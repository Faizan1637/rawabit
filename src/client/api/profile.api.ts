import apiClient from '@/hooks/useAxios';
import { ProfileFormData, ProfilePayload, ProfileResponse } from '@/types/profile';
import { User } from "@/types"

interface ProfileApiResponse {
  success?: boolean;
  data: {
    profile: ProfileResponse;
    updatedUser: User | null | boolean
  };
  message?: string;
  error?: string;
}

const transformFormDataToPayload = (formData: ProfileFormData): ProfilePayload => {
  // Convert Date to ISO string if it's a Date object
  const dateOfBirth = formData.dateOfBirth instanceof Date 
    ? formData.dateOfBirth.toISOString().split('T')[0]
    : formData.dateOfBirth;

  return {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email: formData.email.trim().toLowerCase(),
    gender: formData.gender,
    dateOfBirth,
    height: formData.height,
    bodyType: formData.bodyType,
    complexion: formData.complexion,
    hasBeard: formData.hasBeard,
    hasHijab: formData.hasHijab,
    disabilities: formData.disabilities,
    rishtaCreatedBy: formData.rishtaCreatedBy,
    fathersName: formData.fathersName.trim(),
    fatherAlive: formData.fatherAlive,
    fathersOccupation: formData.fathersOccupation.trim(),
    numberOfBrothers: Number(formData.numberOfBrothers),
    numberOfSisters: Number(formData.numberOfSisters),
    numberOfMarriedBrothers: Number(formData.numberOfMarriedBrothers),
    numberOfSons: formData.numberOfSons ? Number(formData.numberOfSons) : undefined,
    numberOfDaughters: formData.numberOfDaughters ? Number(formData.numberOfDaughters) : undefined,
    parentsMobileNo: formData.parentsMobileNo,
    parentsPhone: formData.parentsPhone,
    address: formData.address.trim(),
    fromCountry: formData.fromCountry,
    fromState: formData.fromState,
    fromCity: formData.fromCity,
    livesInCountry: formData.livesInCountry,
    livesInState: formData.livesInState,
    livesInCity: formData.livesInCity,
    religion: formData.religion,
    caste: formData.caste,
    islamicEducation: formData.islamicEducation,
    qualification: formData.qualification,
    degree: formData.degree,
    profession: formData.profession,
    designation: formData.designation,
    monthlyIncome: Number(formData.monthlyIncome),
    maritalStatus: formData.maritalStatus,
    lifeStyle: formData.lifeStyle,
    houseStatus: formData.houseStatus,
    requirements: formData.requirements,
  };
};

export const profileApi = {
  // Create Profile
  createProfile: async (formData: ProfileFormData): Promise<ProfileApiResponse> => {
    const payload = transformFormDataToPayload(formData);
    const response = await apiClient.post<ProfileApiResponse>('/api/profile', payload);
    return response.data;
  },

  // Get My Profile
  getMyProfile: async (): Promise<ProfileApiResponse> => {
    const response = await apiClient.get<ProfileApiResponse>('/api/profile');
    return response.data;
  },

  // Get Profile by ID
  getProfileById: async (id: string): Promise<ProfileApiResponse> => {
    const response = await apiClient.get<ProfileApiResponse>(`/api/profile/${id}`);
    return response.data;
  },

  // Update Profile
  updateProfile: async (
    id: string,
    formData: Partial<ProfileFormData>
  ): Promise<ProfileApiResponse> => {
    const payload = formData.dateOfBirth 
      ? transformFormDataToPayload(formData as ProfileFormData)
      : formData;
      
    const response = await apiClient.put<ProfileApiResponse>(`/api/profile/${id}`, payload);
    return response.data;
  },

  // Delete Profile
  deleteProfile: async (): Promise<void> => {
    await apiClient.delete(`/api/profile`);
  },
};