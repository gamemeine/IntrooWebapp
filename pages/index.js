import { MainLayout } from "../components/layouts/mainLayout";

export default function Index() {
  return <div></div>;
}

Index.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
