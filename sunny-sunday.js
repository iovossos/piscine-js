function sunnySunday(date) {
  const start = new Date(1, 0, 1); // 01/01/0001
  const msPerDay = 24 * 60 * 60 * 1000;

  // Calculate total days since 01/01/0001
  const totalDays = Math.floor((date - start) / msPerDay);

  // Count how many Sundays would have occurred since then
  const sundays = Math.floor(totalDays / 7);

  // Adjust total days by removing Sundays
  const effectiveDays = totalDays - sundays;

  // Determine weekday index in 6-day week (0 = Monday, ..., 5 = Saturday)
  const dayIndex = effectiveDays % 6;

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekdays[dayIndex];
}
