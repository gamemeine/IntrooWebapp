import { Navbar } from "../main/navigation/navbar";

export const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="sm:px-20 px-5">{children}</main>
  </>
);
