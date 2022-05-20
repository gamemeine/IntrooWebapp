const colors = {
  primary: "bg-neutral-900 hover:bg-neutral-800 text-white",
  secondary: "bg-neutral-400 hover:bg-neutral-600 text-white",
  transparent:
    "bg-transparent hover:bg-neutral-100 text-netural-400 hover:text-neutral-800",
};

export const IconButton = ({
  icon,
  onClick,
  secondary,
  transparent,
  sm,
  lg,
}) => {
  const color = secondary
    ? colors.secondary
    : transparent
    ? colors.transparent
    : colors.primary;

  const size = sm ? "h-8" : lg ? "h-12" : "h-10";
  return (
    <button
      type="button"
      className={`${color} ${size} aspect-square font-medium rounded-lg text-sm p-2 text-center whitespace-nowrap flex justify-center items-center`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
