import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AdminLayout } from "../../../components/layouts/adminLayout";
import { RepairSectionHeading } from "../../../components/nav/repairSectionHeading";
import { Button } from "../../../components/main/buttons/button";
import { PlusIcon } from "../../../components/main/icons/plus";
import { RepairTable } from "../../../components/repair/table";
import { Search } from "../../../components/search/search";
import { useAllRepairs } from "../../../hooks/api/repairHooks";
import { toStringDate } from "../../../utils/date/dateUtils";

export default function Index() {
  const { data, error } = useAllRepairs();
  const router = useRouter();

  const [filteredData, setFilteredData] = useState();
  const [keywords, setKeywords] = useState();

  useEffect(() => handleDataFetch(), [data]);

  const handleDataFetch = () => {
    if (data == null) return;
    if (filteredData == null) setFilteredData(data);

    const keywordList = [];
    data.forEach((x) => {
      keywordList.push({ key: x.id, value: x.id });
      keywordList.push({ key: x.id, value: toStringDate(x.startDate) });
      keywordList.push({ key: x.id, value: x.car.model });
      keywordList.push({ key: x.id, value: x.car.plate });
      keywordList.push({
        key: x.id,
        value: x.customer.name + x.customer.surname,
      });
    });
    setKeywords(keywordList);
  };

  const handleSearch = (searchedKeywords = []) => {
    const searchedIds = searchedKeywords.map((x) => x.key);
    const filtered = data.filter((x) => searchedIds.includes(x.id));

    setFilteredData(filtered);
  };

  const handleAdd = () => router.push("./naprawy/nowa");
  const handleInspect = (id) => router.push("./naprawy/" + id);

  return (
    <div className="p-4">
      <div className="flex justify-between py-4">
        <div className="w-64">
          <Search data={keywords} onSearch={handleSearch} />
        </div>
        <div>
          <Button
            title={"Nowa naprawa"}
            onClick={handleAdd}
            icon={<PlusIcon w={6} h={6} />}
          />
        </div>
      </div>
      {filteredData && (
        <RepairTable repairs={filteredData} onRepairInspect={handleInspect} />
      )}
    </div>
  );
}

Index.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <RepairSectionHeading>{page}</RepairSectionHeading>
    </AdminLayout>
  );
};
