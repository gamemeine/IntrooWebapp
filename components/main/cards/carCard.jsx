import { CarIcon } from "../icons/car";

export const CarCard = ({ car }) => {
  const label = car?.plate;
  const sublabel = car?.model;

  return (
    <div className="flex items-center space-x-4 pr-8">
      <div className="w-10 h-10 bg-neutral-200 text-neutral-500 flex justify-center items-center rounded-lg">
        <CarIcon w={6} h={6} />
      </div>

      <div className="space-y-1 text-neutral-900 font-medium">
        <div>{label}</div>
        <div className="text-sm text-neutral-500">{sublabel}</div>
      </div>
    </div>
  );
};
