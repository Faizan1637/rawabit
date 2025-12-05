import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  firstName: string;     
  lastName: string;      
  email: string;
  password: string;
  gender: string;   
  status: 'active' | 'blocked';      
  dateOfBirth: string;    
  role: 'user' | 'admin';
  profileCompleted:boolean;
  resetOTP?:string;
  resetOTPExpires?:Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id?: string;
  email: string;
  firstName: string;      
  lastName: string;       
  fullName?: string;       
  status?: 'active' | 'blocked'
  createdAt?:string;
  gender: string;         
  dateOfBirth: string;    
  role: string;
  profileCompleted?:boolean;
}

export interface CreateUserInput {
  firstName: string;      
  lastName: string;       
  email: string;
  password: string;
  gender: string;     
  status?: 'active' | 'blocked'    
  dateOfBirth: string;    
  profileCompleted?:boolean;
}
export interface UpdateUserInput {
  name?: string;
  status?: 'active' | 'blocked'
  email?: string;
  profileCompleted?:boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}