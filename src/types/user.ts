export interface User {
  _id?: Object;
  firstName: string;     
  lastName: string;      
  email: string;
  password: string;
  gender: string;         
  dateOfBirth: string;    
  role: 'user' | 'admin';
  profileCompleted:boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id?: string;
  email: string;
  firstName: string;      
  lastName: string;       
  fullName?: string;       
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
  dateOfBirth: string;    
  profileCompleted?:boolean;
}
export interface UpdateUserInput {
  name?: string;
  email?: string;
  profileCompleted?:boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}