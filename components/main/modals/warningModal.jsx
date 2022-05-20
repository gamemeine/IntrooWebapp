import { Button } from "../buttons/button";
import { IconButton } from "../buttons/iconButton";
import { ExitIcon } from "../icons/exit";

export const WarningModal = ({ text, icon, onSubmit, onCancel, onClose }) => {
  return (
    <div class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full flex justify-center items-center bg-neutral-800/25">
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow ">
          <div className="px-4 pt-4 w-full flex justify-end">
            <IconButton icon={<ExitIcon />} onClick={onClose} transparent />
          </div>
          <div class="px-6 pb-6 text-center text-gray-400">
            <div className="flex justify-center pb-4 max-h-32">{icon}</div>
            <h3 class="mb-5 text-lg font-normal text-gray-500 ">
              {text}
            </h3>
            <div className="space-x-4">
              <Button title="Tak, jestem pewny" onClick={onSubmit} />
              <Button title="Nie, wróć" onClick={onCancel} secondary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
