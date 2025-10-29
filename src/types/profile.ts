import { ObjectId } from 'mongodb';

export interface Profile {
  _id?: ObjectId;
  userId: ObjectId;                    // Foreign key to User
  
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  
  // Physical Attributes
  height: string;
  bodyType: string;
  complexion: string;
  hasBeard?: string;                   // Optional, only for males
  disabilities?: string;
  
  // Family Information
  fathersName: string;
  fatherAlive: string;
  fathersOccupation: string;
  numberOfBrothers: number;
  numberOfSisters: number;
  numberOfMarriedBrothers: number;
  numberOfSons?: number;               // For divorced/widowed
  numberOfDaughters?: number;          // For divorced/widowed
  parentsMobileNo: string;
  parentsPhone: string;
  
  // Location Information
  address: string;
  fromCountry: string;
  fromState: string;
  fromCity: string;
  livesInCountry: string;
  livesInState: string;
  livesInCity: string;
  
  // Religious & Cultural
  religion: string;
  caste: string;
  islamicEducation: string;
  
  // Education & Career
  qualification: string;
  degree: string;
  profession: string;
  designation?: string;
  monthlyIncome: number;
  
  // Lifestyle
  maritalStatus: string;
  lifeStyle: string;
  houseStatus: string;
  
  // Requirements
  requirements?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isComplete: boolean;                 // Profile completion status
}

export interface ProfileResponse {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  height: string;
  bodyType: string;
  complexion: string;
  hasBeard?: string;
  disabilities?: string;
  fathersName: string;
  fatherAlive: string;
  fathersOccupation: string;
  numberOfBrothers: number;
  numberOfSisters: number;
  numberOfMarriedBrothers: number;
  numberOfSons?: number;
  numberOfDaughters?: number;
  parentsMobileNo: string;
  parentsPhone: string;
  address: string;
  fromCountry: string;
  fromState: string;
  fromCity: string;
  livesInCountry: string;
  livesInState: string;
  livesInCity: string;
  religion: string;
  caste: string;
  islamicEducation: string;
  qualification: string;
  degree: string;
  profession: string;
  designation?: string;
  monthlyIncome: number;
  maritalStatus: string;
  lifeStyle: string;
  houseStatus: string;
  requirements?: string;
  isComplete: boolean;
}

export interface CreateProfileInput {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  height: string;
  bodyType: string;
  complexion: string;
  hasBeard?: string;
  disabilities?: string;
  fathersName: string;
  fatherAlive: string;
  fathersOccupation: string;
  numberOfBrothers: number;
  numberOfSisters: number;
  numberOfMarriedBrothers: number;
  numberOfSons?: number;
  numberOfDaughters?: number;
  parentsMobileNo: string;
  parentsPhone: string;
  address: string;
  fromCountry: string;
  fromState: string;
  fromCity: string;
  livesInCountry: string;
  livesInState: string;
  livesInCity: string;
  religion: string;
  caste: string;
  islamicEducation: string;
  qualification: string;
  degree: string;
  profession: string;
  designation?: string;
  monthlyIncome: number;
  maritalStatus: string;
  lifeStyle: string;
  houseStatus: string;
  requirements?: string;
}

export interface UpdateProfileInput {
  height?: string;
  bodyType?: string;
  complexion?: string;
  hasBeard?: string;
  disabilities?: string;
  fathersName?: string;
  fatherAlive?: string;
  fathersOccupation?: string;
  numberOfBrothers?: number;
  numberOfSisters?: number;
  numberOfMarriedBrothers?: number;
  numberOfSons?: number;
  numberOfDaughters?: number;
  parentsMobileNo?: string;
  parentsPhone?: string;
  address?: string;
  fromCountry?: string;
  fromState?: string;
  fromCity?: string;
  livesInCountry?: string;
  livesInState?: string;
  livesInCity?: string;
  caste?: string;
  islamicEducation?: string;
  qualification?: string;
  degree?: string;
  profession?: string;
  designation?: string;
  monthlyIncome?: number;
  maritalStatus?: string;
  lifeStyle?: string;
  houseStatus?: string;
  requirements?: string;
}

export interface ProfileFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date | string;
  
  // Physical Attributes
  height: string;
  bodyType: string;
  complexion: string;
  hasBeard?: string;
  disabilities?: string;
  
  // Family Information
  fathersName: string;
  fatherAlive: string;
  fathersOccupation: string;
  numberOfBrothers: number;
  numberOfSisters: number;
  numberOfMarriedBrothers: number;
  numberOfSons?: number;
  numberOfDaughters?: number;
  parentsMobileNo: string;
  parentsPhone: string;
  
  // Location Information
  address: string;
  fromCountry: string;
  fromState: string;
  fromCity: string;
  livesInCountry: string;
  livesInState: string;
  livesInCity: string;
  
  // Religious & Cultural
  religion: string;
  caste: string;
  islamicEducation: string;
  
  // Education & Career
  qualification: string;
  degree: string;
  profession: string;
  designation?: string;
  monthlyIncome: number;
  
  // Lifestyle
  maritalStatus: string;
  lifeStyle: string;
  houseStatus: string;
  
  // Requirements
  requirements?: string;
}

export interface ProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string; // ISO format for API
  height: string;
  bodyType: string;
  complexion: string;
  hasBeard?: string;
  disabilities?: string;
  fathersName: string;
  fatherAlive: string;
  fathersOccupation: string;
  numberOfBrothers: number;
  numberOfSisters: number;
  numberOfMarriedBrothers: number;
  numberOfSons?: number;
  numberOfDaughters?: number;
  parentsMobileNo: string;
  parentsPhone: string;
  address: string;
  fromCountry: string;
  fromState: string;
  fromCity: string;
  livesInCountry: string;
  livesInState: string;
  livesInCity: string;
  religion: string;
  caste: string;
  islamicEducation: string;
  qualification: string;
  degree: string;
  profession: string;
  designation?: string;
  monthlyIncome: number;
  maritalStatus: string;
  lifeStyle: string;
  houseStatus: string;
  requirements?: string;
}