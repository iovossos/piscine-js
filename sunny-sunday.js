function sunnySunday(date) {
  // Helper to count leap years before the given year
  function countLeapYears(y, m) {
    if (m <= 2) y--; // if Jan or Feb, don't count current year
    return Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  const day = date.getDate();

  // Days in months (non-leap year)
  const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Total days from 01/01/0001 to the given date
  let totalDays = (year - 1) * 365 + countLeapYears(year - 1, 12);

  // Add days for months in current year
  for (let i = 1; i < month; i++) {
    totalDays += monthDays[i];
  }

  // Add leap day if this year is leap and month > Feb
  if (month > 2 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    totalDays += 1;
  }

  // Add day of current month
  totalDays += day - 1;

  // Subtract Sundays (every 7th day)
  const sundays = Math.floor(totalDays / 7);
  const effectiveDays = totalDays - sundays;

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = effectiveDays % 6;

  return weekdays[dayIndex];
}
