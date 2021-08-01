export const salaryCalculation = (
  salary = 0,
  dayHours = 0,
  nightHours = 0,
  holidayDayHours = 0,
  holidayNightHours = 0
) => {
  const hourValue = 908526 / (30 * 8);
  const hourRate = {
    day: hourValue,
    night: hourValue * 1.35,
    'day-holiday': hourValue * 1.75,
    'night-holiday': hourValue * 2.1,
  };

  return (
    salary ||
    dayHours * hourRate.day +
      nightHours * hourRate.night +
      holidayDayHours * hourRate['day-holiday'] +
      holidayNightHours * hourRate['night-holiday']
  );
};

export const companyContributions = (salary = 0, risk = 1) => {
  const arlRate = { 1: 0.00522, 2: 0.01044, 3: 0.02436, 4: 0.0435, 5: 0.0696 };
  return {
    health: salary * 0.085,
    pension: salary * 0.12,
    arl: salary * arlRate[risk],
    compensation: salary * 0.04,
  };
};

export const workerContributions = (salary = 0) => {
  return {
    health: salary * 0.04,
    pension: salary * 0.04,
  };
};
