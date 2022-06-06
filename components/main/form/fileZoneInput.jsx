import { UploadIcon } from "../icons/upload";

export const FileZoneInput = ({ ...props }) => {
  return (
    <div>
      <label className="flex flex-col justify-center items-center w-full bg-neutral-900 rounded-lg cursor-pointer hover:bg-neutral-800">
        <div className="flex flex-col justify-center items-center py-5 px-4 text-neutral-100">
          <UploadIcon w={8} h={8} />
        </div>
        <input type="file" multiple className="hidden" {...props} />
      </label>
    </div>
  );
};
