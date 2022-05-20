export const CustomerIcon = ({ w = 10, h = 10 }) => {
  const style = `w-${w} h-${h}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={style}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
};
