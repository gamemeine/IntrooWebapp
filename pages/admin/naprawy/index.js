import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AdminLayout } from "../../../components/layouts/admin/adminLayout";
import { RepairSectionHeading } from "../../../components/layouts/admin/repairSectionHeading";
import { Search } from "../../../components/main/table/search";
import { Loader } from "../../../components/main/other/loader";
import { getAllRepairs } from "../../../utils/api/repair";
import { contains } from "../../../utils/stringUtils";
import { LoadingSection } from "../../../components/main/other/loadingSection";
import { Started } from "../../../components/main/indicators/started";
import { Ended } from "../../../components/main/indicators/ended";
import { Button } from "../../../components/main/buttons/button";
import { PlusIcon } from "../../../components/main/icons/plus";
import { SuccessIndicator } from "../../../components/main/indicators/success";
import { DangerIndicator } from "../../../components/main/indicators/danger";

export default function Index() {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    const data = await getAllRepairs();

    if (data) {
      data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      setData(data);
      setRecords(data);
      setLoading(false);
    }
  };

  const filter = (item, value) =>
    contains(item.id, value) ||
    contains(new Date(item.startDate).toLocaleDateString(), value) ||
    contains(item.car.model, value) ||
    contains(item.car.plate, value) ||
    contains(item.customer.name + item.customer.surname, value);

  const handleAdd = (e) => {
    e.preventDefault();
    router.push("/admin/naprawy/nowa");
  };
  const handleInspect = (e, id) => {
    e.preventDefault();
    router.push(`/admin/naprawy/${id}`);
  };

  return (
    <LoadingSection isLoading={isLoading}>
      <div className="p-4">
        <div className="flex justify-between py-4">
          <Search onFiltered={setRecords} filter={filter} items={data} />
          <Button
            title={"Nowa naprawa"}
            onClick={handleAdd}
            icon={<PlusIcon w={6} h={6} />}
          />
        </div>

        <RepairsTable data={records} onRecordButtonClick={handleInspect} />
      </div>
    </LoadingSection>
  );
}

Index.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <RepairSectionHeading>{page}</RepairSectionHeading>
    </AdminLayout>
  );
};

const RepairsTable = ({ data, onRecordButtonClick }) => {
  const hasRepairEnded = (repair) => repair?.status == 0;
  return (
    <div className="relative rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200/75 backdrop-blur-lg  sticky top-14">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID naprawy
            </th>
            <th scope="col" className="px-6 py-3">
              Data przyjęcia
            </th>
            <th scope="col" className="px-6 py-3">
              Pojazd
            </th>
            <th scope="col" className="px-6 py-3">
              Numer rejestracyjny
            </th>
            <th scope="col" className="px-6 py-3">
              Klient
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((repair) => (
            <tr className="bg-white border-b   hover:bg-gray-100 ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
              >
                {repair.id}
              </th>
              <td className="px-6 py-4">
                {new Date(repair?.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{repair?.car?.model}</td>
              <td className="px-6 py-4">{repair?.car?.plate}</td>
              <td className="px-6 py-4">{`${repair?.customer?.name} ${repair?.customer?.surname}`}</td>
              <td className="px-6 py-2">
                {hasRepairEnded(repair) ? (
                  <DangerIndicator text="Zakończona" />
                ) : (
                  <SuccessIndicator text="Rozpoczęta" />
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  href=""
                  onClick={(e) => onRecordButtonClick(e, repair.id)}
                  className="font-medium text-neutral-900  hover:underline"
                >
                  Więcej
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
