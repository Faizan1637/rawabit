const MONTH_MAP: Record<string, string> = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12',
};

export const formatDateOfBirth = (day: string, month: string, year: string): string => {
  const monthNumber = MONTH_MAP[month] || '01';
  const dayPadded = day.padStart(2, '0');
  return `${year}-${monthNumber}-${dayPadded}`;
};

export const parseDateOfBirth = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  const monthName = Object.keys(MONTH_MAP).find(
    key => MONTH_MAP[key] === month
  ) || 'January';
  
  return {
    day: parseInt(day).toString(),
    month: monthName,
    year,
  };
};