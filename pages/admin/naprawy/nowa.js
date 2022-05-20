import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AdminLayout } from "../../../components/layouts/admin/adminLayout";
import { RepairSectionHeading } from "../../../components/layouts/admin/repairSectionHeading";
import { DatePicker } from "../../../components/main/form/datePicker";
import { SelectInput } from "../../../components/main/form/selectInput";
import { Submit } from "../../../components/main/form/submit";
import { Heading, Hero } from "../../../components/main/typography/headings";
import { getAllCars } from "../../../utils/api/car";
import { getAllCusomers } from "../../../utils/api/customer";
import { createRepair } from "../../../utils/api/repair";
import { CustomerCard } from "../../../components/main/cards/customerCard";
import { CarCard } from "../../../components/main/cards/carCard";
import { PlusIcon } from "../../../components/main/icons/plus";
import { ReturnButton } from "../../../components/main/navigation/returnButton";
import { toDateWithoutTimezone } from "../../../utils/date/dateUtils";

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

  const handleReturn = (e) => {
    e.preventDefault();
    router.back();
  };

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
  const [customers, setCustomers] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    await getAllCusomers()
      .then((data) =>
        data.map((customer) => ({
          id: customer.id,
          label: customer.name + " " + customer.surname,
          sublabel: "505 721 926",
          value: customer,
        }))
      )
      .then((data) => setCustomers(data));
  };

  const handleSelect = (customer) => {
    setSelectedCustomer(customer?.value);
    onChange(customer.value);
  };

  return (
    <div>
      <Heading>Klient</Heading>
      <div className="flex justify-between py-2 items-center">
        {selectedCustomer && <CustomerCard customer={selectedCustomer} />}
        <SelectInput
          title="Wybierz klienta"
          items={customers}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

const CarSection = ({ onChange }) => {
  const [cars, setCars] = useState();
  const [selectedCar, setSelectedCar] = useState();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () =>
    await getAllCars()
      .then((data) =>
        data.map((car) => ({
          id: car.id,
          label: car.plate,
          sublabel: car.model,
          value: car,
        }))
      )
      .then((data) => setCars(data));

  const handleSelect = (car) => {
    setSelectedCar(car.value);
    onChange(car.value);
  };

  return (
    <div>
      <Heading>Pojazd</Heading>
      <div className="flex justify-between py-2 items-center">
        {selectedCar && <CarCard car={selectedCar} />}
        <SelectInput
          title="Wybierz pojazd"
          items={cars}
          onSelect={handleSelect}
        />
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
