import { CustomerIcon } from "../icons/customer";

export const CustomerCard = ({ customer }) => {
  const label = `${customer?.name} ${customer?.surname}`;
  const sublabel = customer?.phoneNumber;

  return (
    <div className="flex items-center space-x-4 pr-4">
      <div className="w-10 h-10 rounded-full bg-neutral-200 flex justify-center overflow-hidden text-neutral-500">
        <div className="mt-1">
          <CustomerIcon />
        </div>
      </div>
      <div className="space-y-1 text-neutral-900 font-medium">
        <div>{label}</div>
        <div className="text-sm text-neutral-500">{sublabel}</div>
      </div>
    </div>
  );
};
