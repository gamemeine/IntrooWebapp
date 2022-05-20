import { route } from "next/dist/server/router";
import { useRouter } from "next/router";
import { LinkButton, SectionHeading } from "./sectionHeading";

const routes = [
  { name: "Wszystkie", link: "/admin/naprawy" },
  { name: "Nowa", link: "/admin/naprawy/nowa" },
];

export const RepairSectionHeading = ({ children }) => {
  const router = useRouter();

  const handleClick = (e, link) => {
    e.preventDefault();
    router.push(link);
  };

  const endsWithNum = (text) => /[0-9]+$/.test(text);

  return (
    <>
      <SectionHeading title="Naprawy" routes={routes}>
        {routes.map((route) => (
          <LinkButton
            active={router.pathname.endsWith(route.link)}
            name={route.name}
            onClick={(e) => handleClick(e, route.link)}
          />
        ))}
        {endsWithNum(router.asPath) && (
          <LinkButton active={true} name="Szczegóły" />
        )}
      </SectionHeading>
      {children}
    </>
  );
};
