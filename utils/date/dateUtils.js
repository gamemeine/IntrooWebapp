import moment from "moment";

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

  const beautiDate = `${momentDate.day() + 1} ${
    months[momentDate.month()].full
  } ${momentDate.year()}`;
  return beautiDate;
};

const months = [
  { full: "Styczeń", short: "sty" },
  { full: "Luty", short: "lut" },
  { full: "Marzec", short: "mar" },
  { full: "Kwiecień", short: "kwie" },
  { full: "Maj", short: "maj" },
  { full: "Czerwiec", short: "cze" },
  { full: "Lipiec", short: "lip" },
  { full: "Sierpień", short: "sie" },
  { full: "Wrzesień", short: "wrz" },
  { full: "Październik", short: "paź" },
  { full: "Listopad", short: "lis" },
  { full: "Grudzień", short: "gru" },
];

const weekDays = [
  { full: "Niedziela", short: "Nd" },
  { full: "Poniedziałek", short: "Pn" },
  { full: "Wtorek", short: "Wt" },
  { full: "Środa", short: "Śr" },
  { full: "Czwartek", short: "Cz" },
  { full: "Piątek", short: "Pt" },
  { full: "Sobota", short: "Sb" },
];
