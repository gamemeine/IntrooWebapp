import { CalendarSolidIcon } from "../icons/calendar";

export const EventCard = ({ event }) => {
  const dateText = new Date(event?.startDate).toLocaleDateString();
  const title = event?.title;

  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-1">
        <span className="bg-neutral-200 text-neutral-900 text-xs font-bold inline-flex items-center px-2 p-1 space-x-1 rounded mr-2">
          <CalendarSolidIcon w={3} h={3} />
          <p>{dateText}</p>
        </span>
        <h1 className="font-semibold text-neutral-900 text-base">{title}</h1>
      </div>
    </div>
  );
};
