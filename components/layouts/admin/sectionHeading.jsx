import { useRouter } from "next/router";

export const SectionHeading = ({ title, routes, children }) => {
  const router = useRouter();

  const handleClick = (event, link) => {
    event.preventDefault();
    router.push(link);
  };
  return (
    <div className="text-sm font-medium text-center flex text-neutral-500 border-b border-neutral-200  ">
      <div className="flex items-center mr-10">
        <Heading>{title}</Heading>
      </div>
      <ul className="flex flex-wrap -mb-px">{children}</ul>
    </div>
  );
};

const Heading = ({ children }) => {
  return <h1 className="text-lg text-neutral-900">{children}</h1>;
};

export const LinkButton = ({ name, link, active, onClick }) => {
  const activeStyle =
    "inline-block p-4 text-neutral-900 rounded-t-lg border-b-2 border-neutral-900 active";
  const normalStyle =
    "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-neutral-600 hover:border-neutral-300";
  return (
    <li className="mr-2">
      <a
        href=""
        className={active ? activeStyle : normalStyle}
        onClick={onClick}
      >
        {name}
      </a>
    </li>
  );
};
