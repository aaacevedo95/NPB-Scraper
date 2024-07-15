import dayjs from "dayjs";

export function isToday({ day, month }: { day: string; month: string }) {
  const dayNumber = parseInt(day, 10); // Convert day to a number
  const monthNumber = parseInt(month, 10); // Convert month to a number

  const today = dayjs();
  const givenDate = dayjs()
    .set("date", dayNumber)
    .set("month", monthNumber - 1); // Month is 0-indexed

  return today.isSame(givenDate, "day");
}
