function sunnySunday(date) {
  // Parse date parts manually
  const [y, m, d] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ];

  // Check for leap year
  function isLeapYear(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
  }

  // Days in each month (non-leap year)
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Total days in full years before this one
  let days = (y - 1) * 365
    + Math.floor((y - 1) / 4)
    - Math.floor((y - 1) / 100)
    + Math.floor((y - 1) / 400);

  // Add days in months of current year
  for (let i = 0; i < m - 1; i++) {
    days += monthDays[i];
  }

  // Add leap day if this year is leap and past Feb
  if (m > 2 && isLeapYear(y)) {
    days += 1;
  }

  // Add days in current month
  days += d - 1;

  // Remove Sundays (every 7th day)
  const sundays = Math.floor(days / 7);
  const effectiveDays = days - sundays;

  // Return weekday in 6-day week (no Sunday)
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekday = weekdays[effectiveDays % 6];
  return weekday;
}
