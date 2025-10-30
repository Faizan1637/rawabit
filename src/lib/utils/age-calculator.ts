export const calculateAge = (dateOfBirth: Date | string): number => {
  const dob = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age;
};

export const getAgeRange = (minAge?: number, maxAge?: number) => {
  const today = new Date();
  
  let minDate: Date | undefined;
  let maxDate: Date | undefined;
  
  if (maxAge) {
    // Max age means minimum date of birth
    minDate = new Date(today.getFullYear() - maxAge - 1, today.getMonth(), today.getDate());
  }
  
  if (minAge) {
    // Min age means maximum date of birth
    maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  }
  
  return { minDate, maxDate };
};