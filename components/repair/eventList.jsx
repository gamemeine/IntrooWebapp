import { months } from "../../utils/months";

const Event = ({ active, date, title, onSelected }) => {
  const getMonthDay = () => {
    const _date = new Date(date);
    return { month: months[_date.getMonth()], day: _date.getUTCDate() };
  };
  const { month, day } = getMonthDay();

  return (
    <div
      className={`${
        active
          ? "bg-neutral-900 text-gray-100"
          : " bg-transparent text-neutral-800 hover:bg-neutral-900 hover:text-gray-100"
      }  rounded-lg btn anim grid grid-cols-5 p-4`}
      onClick={onSelected}
    >
      <div className="border-r-2 text-center">
        <h1 className="font-medium  text-md mr-2">{month}</h1>
        <h1 className="font-semibold  text-2xl mr-2">{day}</h1>
      </div>
      <div className="col-span-4 px-5 grid content-center">
        <h1 className="font-medium text-xl">{title}</h1>
      </div>
    </div>
  );
};
