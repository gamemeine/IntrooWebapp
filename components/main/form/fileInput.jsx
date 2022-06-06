import { UploadIcon } from "../icons/upload";

export const FileInput = ({ ...props }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col justify-center items-center w-full h-40 bg-neutral-50 rounded-lg border-2 border-neutral-300 border-dashed cursor-pointer   hover:bg-neutral-100   "
      >
        <div className="flex flex-col justify-center items-center pt-5 pb-6 ">
          <div className="text-neutral-500 py-2">
            <UploadIcon w={12} h={12} />
          </div>
          <p className="mb-2 text-sm text-neutral-500">
            <span className="font-semibold">Kliknij aby przesłać</span> lub
            przeciągnij i upuść
          </p>
        </div>
        <input {...props} id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
};
