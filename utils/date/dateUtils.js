import moment from "moment";
import { months } from "./months";
import { weekDays } from "./weekDays";

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getMonthAndBesideDates = (year, month) => {
  const list = [];

  const previousMonthDC = getDaysInMonth(year, month - 1);
  const monthDC = getDaysInMonth(year, month);
  const firstDayWeekDay = new Date(year, month, 1).getDay();
  const earliestDayFromPreviousMonth = new Date(
    year,
    month - 1,
    previousMonthDC - firstDayWeekDay + 1
  ).getDate();

  if (earliestDayFromPreviousMonth > previousMonthDC - 7) {
    for (let i = earliestDayFromPreviousMonth; i <= previousMonthDC; i++) {
      list.push({ date: new Date(year, month - 1, i) });
    }
  }

  for (let i = 1; i <= monthDC; i++) {
    list.push({ date: new Date(year, month, i) });
  }

  for (let i = 1; list.length % 7 > 1; i++) {
    list.push({ date: new Date(year, month + 1, i) });
  }

  return list;
};

export const getMonthFullName = (monthNum) => months[monthNum].full;
export const getMonthShortName = (monthNum) => months[monthNum].short;

export const getWeekDayFullName = (dayNum) => weekDays[dayNum].full;
export const getWeekDayShortName = (dayNum) => weekDays[dayNum].short;

export const getUTCDate = (date) => {
  date = new Date(date);

  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
};

export const toDateWithoutTimezone = (date) => {
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset);
};

export const toStringDate = (date) => new Date(date).toLocaleDateString();

export const toApiDate = (date) => toDateWithoutTimezone(date).toJSON();

export const toShownDate = (date) => {
  const momentDate = moment(date);
  const formatedDate = momentDate.format("DD-MM-YYYY");

  if (formatedDate == moment().format("DD-MM-YYYY")) return "Dzisiaj";

  if (formatedDate == moment().subtract(1, "days").format("DD-MM-YYYY"))
    return "Wczoraj";

  if (formatedDate == moment().subtract(2, "days").format("DD-MM-YYYY"))
    return "Przedwczoraj";

  const day = momentDate.day() + 1;
  const month = months[momentDate.month()].full;
  const year = moment().year() !== momentDate.year() ? momentDate.year() : "";

  const beautiDate = `${day} ${month} ${year}`;
  return beautiDate;
};
