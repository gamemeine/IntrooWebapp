const colors = {
  primary: "text-white bg-neutral-900 hover:bg-neutral-800",
  secondary: "text-white bg-neutral-400 hover:bg-neutral-500 ",
  disabled: "text-white bg-neutral-200",
};

const sizes = {
  sm: "h-8 px-3 py-1.5",
  md: "h-10 px-4 py-2",
  lg: "h-12 px-5 py-2.5",
};

export const Button = ({
  title,
  icon,
  sm,
  lg,
  secondary,
  type,
  disabled,
  onClick,
}) => {
  const color = disabled
    ? colors.disabled
    : secondary
    ? colors.secondary
    : colors.primary;
  const size = sm ? sizes.sm : lg ? sizes.lg : sizes.md;

  return (
    <button
      type={type ? type : "button"}
      className={`${color} ${size} font-medium rounded-lg text-sm text-center whitespace-nowrap inline-flex items-center`}
      onClick={onClick}
      disabled={disabled}
    >
      <p>{title}</p>
      {icon && <div className="ml-4">{icon}</div>}
    </button>
  );
};
