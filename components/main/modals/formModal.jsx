export const FormModal = ({
  title,
  submitBtnText,
  children,
  disabled = false,
  onClose,
  onSubmit,
}) => {
  const [submitButtonDisabledStyle, submitButtonNormalStyle] = [
    "text-white bg-neutral-200 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
    "text-white bg-neutral-900 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
  ];

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed z-50 bg-neutral-800/25 w-full md:inset-0 h-modal md:h-full flex justify-center items-center">
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex justify-between items-start p-8 rounded-t ">
            <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
            <button
              type="button"
              className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
              data-modal-toggle="defaultModal"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="px-8 space-y-6">{children}</div>
          <div className="flex justify-end p-8 space-x-2 rounded-b">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className={
                disabled ? submitButtonDisabledStyle : submitButtonNormalStyle
              }
              disabled={disabled}
              onClick={onSubmit}
            >
              {submitBtnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
