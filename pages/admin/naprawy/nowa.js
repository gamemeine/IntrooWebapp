import { useRouter } from "next/router";
import { useState } from "react";
import { AdminLayout } from "../../../components/layouts/adminLayout";
import { RepairSectionHeading } from "../../../components/nav/repairSectionHeading";
import { DatePicker } from "../../../components/main/form/datePicker";
import { Submit } from "../../../components/main/form/submit";
import { Heading, Hero } from "../../../components/main/typography/headings";
import { createRepair } from "../../../utils/api/repair";
import { CustomerCard } from "../../../components/customer/card";
import { CarCard } from "../../../components/car/card";
import { PlusIcon } from "../../../components/main/icons/plus";
import { ReturnButton } from "../../../components/nav/returnButton";
import { toDateWithoutTimezone } from "../../../utils/date/dateUtils";
import { CustomerSelect } from "../../../components/customer/select";
import { CarSelect } from "../../../components/car/select";

export default function NewRepair() {
  const [customer, setCustomer] = useState(null);
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const repair = {
      startDate: toDateWithoutTimezone(startDate).toJSON(),
      customerId: customer.id,
      carId: car.id,
    };

    const response = await createRepair(repair);

    if (response) router.push(`/admin/naprawy/${response.id}`);
  };

  const handleReturn = (e) => router.back();

  return (
    <div>
      <Hero>Nowa naprawa</Hero>
      <div className="grid justify-center">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex justify-between pb-4">
            <ReturnButton onClick={handleReturn} />
            <Submit
              title="Dodaj"
              icon={<PlusIcon w={6} h={6} />}
              disabled={car === null || customer === null}
            />
          </div>
          <div className="grid grid-cols-2 space-x-12">
            <DateSection onChange={setStartDate} />
            <div className="space-y-4 w-80">
              <CustomerSection onChange={setCustomer} />
              <CarSection onChange={setCar} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

NewRepair.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <RepairSectionHeading>{page}</RepairSectionHeading>
    </AdminLayout>
  );
};

const CustomerSection = ({ onChange }) => {
  const [customer, setCustomer] = useState();

  const handleSelect = (customer) => {
    setCustomer(customer);
    onChange(customer);
  };

  return (
    <div>
      <Heading>Klient</Heading>
      <div className="flex justify-between py-2 items-center">
        {customer && <CustomerCard customer={customer} />}
        <CustomerSelect onSelect={handleSelect} />
      </div>
    </div>
  );
};

const CarSection = ({ onChange }) => {
  const [car, setCar] = useState();

  const handleSelect = (car) => {
    setCar(car);
    onChange(car);
  };

  return (
    <div>
      <Heading>Pojazd</Heading>
      <div className="flex justify-between py-2 items-center">
        {car && <CarCard car={car} />}
        <CarSelect onSelect={handleSelect} />
      </div>
    </div>
  );
};

const DateSection = ({ onChange }) => {
  return (
    <div>
      <Heading>Data rozpoczęcia</Heading>
      <DatePicker onChange={onChange} />
    </div>
  );
};
