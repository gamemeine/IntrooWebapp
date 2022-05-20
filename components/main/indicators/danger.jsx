export const DangerIndicator = ({ text, icon }) => {
  return (
    <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-2 space-x-1 rounded flex w-fit items-center">
      {icon && <div>{icon}</div>}
      <p>{text}</p>
    </span>
  );
};
