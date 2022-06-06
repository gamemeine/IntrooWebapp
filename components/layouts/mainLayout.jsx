import { MainNavbar } from "../nav/mainNavbar";

export const MainLayout = ({ children }) => (
  <>
    <MainNavbar />
    <main className="sm:px-20 px-5">{children}</main>
  </>
);
