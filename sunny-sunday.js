function sunnySunday(date) {
  // Define the 6-day week days
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // calculate the number of days since 01/01/0001
  // javaScript Date object uses year 1 as minimum, not year 0
  const referenceDate = new Date(1, 0, 1); // January 1, 0001
  referenceDate.setFullYear(1); // Ensure year 1

  // get the input date at midnight to avoid time issues
  const inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0);

  // calculate difference in milliseconds
  const diffMs = inputDate - referenceDate;

  // convert to days (1 day = 24 * 60 * 60 * 1000 ms)
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  // in a 6-day week system, we use modulo 6
  // since 01/01/0001 is Monday (index 0), we can directly use the remainder
  const weekdayIndex = diffDays % 6;

  // handle negative dates (before 01/01/0001)
  const adjustedIndex = weekdayIndex < 0 ? weekdayIndex + 6 : weekdayIndex;

  return weekdays[adjustedIndex];
}
