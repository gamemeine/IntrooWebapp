export const SuccessIndicator = ({ text, icon }) => {
  return (
    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-2 space-x-1 rounded flex w-fit items-center">
      {icon && <div>{icon}</div>}
      <p>{text}</p>
    </span>
  );
};
