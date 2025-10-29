import { ObjectId } from 'mongodb';
import {
  findProfileByUserId,
  findProfileById,
  createProfile,
  updateProfile,
  updateProfileByUserId,
  deleteProfile,
  findAllProfiles,
  checkProfileCompletion,
} from '@/repositries/profile.repositories';
import { findUserById, updateUser } from '@/repositries/user.repositories';
import { CreateProfileInput, UpdateProfileInput, Profile, ProfileResponse } from '@/types/profile';
import { AppError } from '@/lib/utils/error-handler';
import {ERROR_MESSAGES} from "@/constants/responseConstant/message"
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export const sanitizeProfile = (profile: Profile): ProfileResponse => {
  return {
    id: profile._id!.toString(),
    userId: profile.userId.toString(),
    firstName: profile.firstName,
    lastName: profile.lastName,
    fullName: `${profile.firstName} ${profile.lastName}`,
    email: profile.email,
    gender: profile.gender,
    dateOfBirth: profile.dateOfBirth.toISOString().split('T')[0],
    height: profile.height,
    bodyType: profile.bodyType,
    complexion: profile.complexion,
    hasBeard: profile.hasBeard,
    disabilities: profile.disabilities,
    fathersName: profile.fathersName,
    fatherAlive: profile.fatherAlive,
    fathersOccupation: profile.fathersOccupation,
    numberOfBrothers: profile.numberOfBrothers,
    numberOfSisters: profile.numberOfSisters,
    numberOfMarriedBrothers: profile.numberOfMarriedBrothers,
    numberOfSons: profile.numberOfSons,
    numberOfDaughters: profile.numberOfDaughters,
    parentsMobileNo: profile.parentsMobileNo,
    parentsPhone: profile.parentsPhone,
    address: profile.address,
    fromCountry: profile.fromCountry,
    fromState: profile.fromState,
    fromCity: profile.fromCity,
    livesInCountry: profile.livesInCountry,
    livesInState: profile.livesInState,
    livesInCity: profile.livesInCity,
    religion: profile.religion,
    caste: profile.caste,
    islamicEducation: profile.islamicEducation,
    qualification: profile.qualification,
    degree: profile.degree,
    profession: profile.profession,
    designation: profile.designation,
    monthlyIncome: profile.monthlyIncome,
    maritalStatus: profile.maritalStatus,
    lifeStyle: profile.lifeStyle,
    houseStatus: profile.houseStatus,
    requirements: profile.requirements,
    isComplete: profile.isComplete,
  };
};

export const createUserProfile = async (
  input: CreateProfileInput
): Promise<{ profile: ProfileResponse; profileId: string }> => {
  // Check if user exists
  const user = await findUserById(input.userId);
  if (!user) {
    throw new AppError('User not found', HTTP_STATUS.NOT_FOUND);
  }

  // Check if profile already exists
  const existingProfile = await findProfileByUserId(input.userId);
  if (existingProfile) {
    throw new AppError('Profile already exists for this user', HTTP_STATUS.CONFLICT);
  }

  // Create profile
  const profileData: Omit<Profile, '_id'> = {
    userId: new ObjectId(input.userId),  
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    gender: input.gender,
    dateOfBirth: new Date(input.dateOfBirth),
    height: input.height,
    bodyType: input.bodyType,
    complexion: input.complexion,
    hasBeard: input.hasBeard,
    disabilities: input.disabilities,
    fathersName: input.fathersName,
    fatherAlive: input.fatherAlive,
    fathersOccupation: input.fathersOccupation,
    numberOfBrothers: input.numberOfBrothers,
    numberOfSisters: input.numberOfSisters,
    numberOfMarriedBrothers: input.numberOfMarriedBrothers,
    numberOfSons: input.numberOfSons,
    numberOfDaughters: input.numberOfDaughters,
    parentsMobileNo: input.parentsMobileNo,
    parentsPhone: input.parentsPhone,
    address: input.address,
    fromCountry: input.fromCountry,
    fromState: input.fromState,
    fromCity: input.fromCity,
    livesInCountry: input.livesInCountry,
    livesInState: input.livesInState,
    livesInCity: input.livesInCity,
    religion: input.religion,
    caste: input.caste,
    islamicEducation: input.islamicEducation,
    qualification: input.qualification,
    degree: input.degree,
    profession: input.profession,
    designation: input.designation,
    monthlyIncome: input.monthlyIncome,
    maritalStatus: input.maritalStatus,
    lifeStyle: input.lifeStyle,
    houseStatus: input.houseStatus,
    requirements: input.requirements,
    createdAt: new Date(),
    updatedAt: new Date(),
    isComplete: false,
  };


  // Check completion status
  profileData.isComplete = checkProfileCompletion(profileData as Profile);

  const profileId = await createProfile(profileData);

  const profile = await findProfileById(profileId);
  if (!profile) {
    throw new AppError(ERROR_MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_ERROR);
  }
  await updateUser(user?._id?.toString() ?? "", { ...user, profileCompleted: true })

  return {
    profile: sanitizeProfile(profile),
    profileId,
  };
};

export const getProfileByUserId = async (userId: string): Promise<ProfileResponse> => {
  const profile = await findProfileByUserId(userId);
  if (!profile) {
    throw new AppError('Profile not found', HTTP_STATUS.NOT_FOUND);
  }
  return sanitizeProfile(profile);
};

export const getProfileById = async (id: string): Promise<ProfileResponse> => {
  const profile = await findProfileById(id);
  if (!profile) {
    throw new AppError('Profile not found', HTTP_STATUS.NOT_FOUND);
  }
  return sanitizeProfile(profile);
};

export const updateUserProfile = async (
  userId: string,
  input: UpdateProfileInput
): Promise<ProfileResponse> => {
  const existingProfile = await findProfileByUserId(userId);
  if (!existingProfile) {
    throw new AppError('Profile not found', HTTP_STATUS.NOT_FOUND);
  }

  const updated = await updateProfileByUserId(userId, input);
  if (!updated) {
    throw new AppError('Failed to update profile', HTTP_STATUS.INTERNAL_ERROR);
  }

  const profile = await findProfileByUserId(userId);
  
  // Update completion status
  if (profile) {
    const isComplete = checkProfileCompletion(profile);
    if (isComplete !== profile.isComplete) {
      await updateProfileByUserId(userId, { isComplete });
      profile.isComplete = isComplete;
    }
  }

  return sanitizeProfile(profile!);
};

export const removeProfile = async (userId: string): Promise<boolean> => {
  const profile = await findProfileByUserId(userId);
  if (!profile) {
    throw new AppError('Profile not found', HTTP_STATUS.NOT_FOUND);
  }

  const deleted = await deleteProfile(profile._id!.toString());
  if (!deleted) {
    throw new AppError('Failed to delete profile', HTTP_STATUS.INTERNAL_ERROR);
  }
  return true;
};

export const getAllProfiles = async (
  page = 1,
  limit = 10,
  filters?: any
) => {
  const skip = (page - 1) * limit;
  const { profiles, total } = await findAllProfiles(skip, limit, filters);

  return {
    data: profiles.map(sanitizeProfile),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};