import { Navbar } from "../../admin/navbar";

export const AdminLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="sm:px-20 px-5">{children}</main>
  </>
);
