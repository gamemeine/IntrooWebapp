export const PlusIcon = ({ w = 10, h = 10 }) => {
  const style = `w-${w} h-${h}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={style}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
};
