function sunnySunday(date) {
  // the 6 day week
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // get the date parts
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // js months are 0-indexed
  const day = date.getDate();

  // calculate total days since 01/01/0001
  let totalDays = 0;

  // add days for complete years
  for (let y = 1; y < year; y++) {
    if (isLeapYear(y)) {
      totalDays += 366;
    } else {
      totalDays += 365;
    }
  }

  // add days for complete months in the current year
  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  for (let m = 1; m < month; m++) {
    totalDays += daysInMonth[m - 1];
  }

  // add the days in the current month (minus 1 since we start from day 1)
  totalDays += day - 1;

  // get the weekday index in our 6-day system
  const weekdayIndex = totalDays % 6;

  return weekdays[weekdayIndex];
}

// helper function to check if a year is a leap year
function isLeapYear(year) {
  // leap year rules:
  // divisible by 4 AND (not divisible by 100 OR divisible by 400)
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}