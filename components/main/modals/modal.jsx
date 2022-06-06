import { IconButton } from "../buttons/iconButton";
import { ExitIcon } from "../icons/exit";

export const Modal = ({ title, children, onClose }) => {
  const Heading = (
    <div className="flex justify-between items-center p-8 rounded-t ">
      <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
      <CloseBtn onClick={onClose} />
    </div>
  );

  const Body = (
    <div className="px-8 pb-8 space-y-6 max-h-[36rem] overflow-x-scroll">
      {children}
    </div>
  );

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed z-50 bg-neutral-800/25 w-full md:inset-0 h-modal md:h-full flex justify-center items-center">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          {Heading}
          {Body}
        </div>
      </div>
    </div>
  );
};

const CloseBtn = ({ onClick }) => {
  return <IconButton transparent onClick={onClick} icon={<ExitIcon />} />;
};
