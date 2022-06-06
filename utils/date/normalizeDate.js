import { months } from "./dateUtils";
export const normalizeDate = (date) => {
  const _date = new Date(date);

  const today = new Date();
  if (today.toDateString() === _date.toDateString()) {
    return "dzisiaj";
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (yesterday.toDateString() === _date.toDateString()) {
    return "wczoraj";
  }

  return `${_date.getUTCDate()} ${months[_date.getMonth()]}`;
};
