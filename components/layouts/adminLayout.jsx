import { AdminNavbar } from "../nav/adminNavbar";

export const AdminLayout = ({ children }) => (
  <>
    <AdminNavbar />
    <main className="sm:px-20 px-5">{children}</main>
  </>
);
