export interface PersonalInfoFormData {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  gender: "male" | "female" | "other"
  profileImage?: string
  height?: string
  complexion?: string
  bodyType?: string
  hasBeard?: string
  disabilities?: string
  profileBy?: string
  lifeStyle?: string
  maritalStatus?: string
  qualification?: string
  degree?: string
  islamicEducation?: string
  numberOfSons?: number
  numberOfDaughters?: number
}

export interface FamilyBackgroundFormData {
  fathersName: string
  fathersOccupation: string
  fatherAlive: "yes" | "no"
  numberOfBrothers: number
  numberOfMarriedBrothers: number
  numberOfSisters: number
  numberOfMarriedSisters: number
  religion: string
  maslak: string
  caste: string
  profession: string
  designation: string
  monthlyIncome: number
  requirements: string
}

export interface ContactInfoFormData {
  livesInCountry: string
  livesInState: string
  livesInCity: string
  fromCountry: string
  fromState: string
  fromCity: string
  parentsPhone: string
  parentsMobileNo: string
  houseStatus: string
  address: string
}

export interface FormData extends PersonalInfoFormData, FamilyBackgroundFormData, ContactInfoFormData {
  id?: string
  createdAt?: string
  updatedAt?: string
}

export interface StepperFormProps {
  onSubmit?: (data: FormData) => void
  initialData?: Partial<FormData>
}

export interface StepProps {
  data: Partial<FormData>
  onDataChange: (newData: Partial<FormData>) => void
  onNext?: () => void
  onPrevious?: () => void
}
