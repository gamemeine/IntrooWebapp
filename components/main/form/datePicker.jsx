import { useState, useEffect } from "react";
import {
  getMonthFullName,
  getWeekDayShortName,
  getMonthAndBesideDates,
} from "../../../utils/date/dateUtils";
import { LeftArrowIcon, RightArrowIcon } from "../icons/Arrows";

export const DatePicker = ({ onChange }) => {
  const currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const availableDates = getMonthAndBesideDates(currentYear, currentMonth);
  const weekDayList = [0, 1, 2, 3, 4, 5, 6];

  useEffect(() => onChange(currentDate), []);

  const handleSelect = (e, date) => {
    e.preventDefault();

    setSelectedDate(date);
    onChange(date);
  };

  const changeMonth = (value) => {
    const date = new Date(currentYear, currentMonth);
    date.setMonth(currentMonth + value);
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
  };

  const setPreviousMonth = () => changeMonth(-1);
  const setNextMonth = () => changeMonth(1);

  return (
    <div inline-datepicker="">
      <div className="datepicker datepicker-inline active block">
        <div className="datepicker-picker inline-block rounded-lg bg-white  shadow-lg p-4">
          <div className="datepicker-header">
            <div className="datepicker-controls flex justify-between mb-2">
              <PreviousButton onClick={setPreviousMonth} />
              <MonthHeader>
                {getMonthFullName(currentMonth)} {currentYear}
              </MonthHeader>
              <NextButton onClick={setNextMonth} />
            </div>
          </div>
          <div className="datepicker-main p-1">
            <div className="datepicker-view flex">
              <div className="days">
                <div className="days-of-week grid grid-cols-7 mb-1">
                  {weekDayList.map((day) => (
                    <HeaderCell key={day}>
                      {getWeekDayShortName(day)}
                    </HeaderCell>
                  ))}
                </div>
                <div className="datepicker-grid w-64 grid grid-cols-7">
                  {availableDates.map(({ date }) => (
                    <Cell
                      key={date}
                      active={
                        date.toDateString() === selectedDate.toDateString()
                      }
                      onClick={(e) => handleSelect(e, date)}
                    >
                      {date.getDate()}
                    </Cell>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const NextButton = (props) => {
  return (
    <SwitchButton {...props}>
      <RightArrowIcon />
    </SwitchButton>
  );
};

const PreviousButton = (props) => {
  return (
    <SwitchButton {...props}>
      <LeftArrowIcon />
    </SwitchButton>
  );
};

const SwitchButton = (props) => {
  return (
    <button
      type="button"
      className="bg-white rounded-lg text-nuetral-500  hover:bg-nuetral-200  hover:text-nuetral-900  text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-500"
      {...props}
    >
      {props.children}
    </button>
  );
};

const MonthHeader = ({ children }) => {
  return (
    <h1 className="text-sm font-semibold py-2.5 px-5 text-neutral-900">
      {children}
    </h1>
  );
};

const HeaderCell = ({ children }) => {
  const style =
    "dow text-center h-6 leading-6 text-sm font-medium text-nuetral-500";
  return <span className={style}>{children}</span>;
};

const Cell = ({ onClick, active = false, children }) => {
  const [normalStyle, activeStyle] = [
    "datepicker-cell hover:bg-nuetral-300  block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center font-semibold text-sm day prev text-neutral-700",
    "datepicker-cell hover:bg-neutral-800  block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center font-semibold text-sm day prev text-neutral-100 bg-neutral-900 rounded-lg",
  ];

  return (
    <span className={active ? activeStyle : normalStyle} onClick={onClick}>
      {children}
    </span>
  );
};
