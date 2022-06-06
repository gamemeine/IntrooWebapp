import { Input } from "../main/form/input";
import { Submit } from "../main/form/submit";
import { PlusIcon } from "../main/icons/plus";
import { UploadIcon } from "../main/icons/upload";
import { Modal } from "../main/modals/modal";

export const EventAddFormModal = ({ onClose, onAdd, repair }) => {
  return (
    <Modal onClose={onClose} title="Nowe zdarzenie">
      <form>
        <Input name="Nazwa zdarzenia" id="title" />
        <div className="h-28 w-72">
          <div class="flex justify-center items-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col justify-center items-center w-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer   hover:bg-gray-100   "
            >
              <div class="flex flex-col justify-center items-center pt-5 pb-6 px-5 text-neutral-600">
                <div className="mb-3">
                  <UploadIcon />
                </div>
                <p class="mb-2 text-sm text-center">
                  <span class="font-semibold">Kliknij aby wybrać</span> lub
                  przeciągnij pliki tutaj
                </p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <Submit title="Dodaj" />
        </div>
      </form>
    </Modal>
  );
};
