function sunnySunday(date) {
  // Helper to check for leap year
  function isLeapYear(y) {
    return (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0));
  }

  // Helper to count leap years before the given year
  function countLeapYears(y, m) {
    if (m <= 2) y--; // exclude current year if Jan/Feb
    return Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  const day = date.getDate();

  // Days in each month
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust February for leap year
  if (isLeapYear(year)) {
    monthDays[1] = 29;
  }

  // Total days from 01/01/0001 to the start of current year
  let totalDays = (year - 1) * 365 + countLeapYears(year, month);

  // Add days for months in current year
  for (let i = 0; i < month - 1; i++) {
    totalDays += monthDays[i];
  }

  // Add days in current month
  totalDays += day - 1;

  // Eliminate Sundays
  const sundays = Math.floor(totalDays / 7);
  const effectiveDays = totalDays - sundays;

  // Return weekday (0 = Monday)
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayIndex = effectiveDays % 6;

  return weekdays[dayIndex];
}
