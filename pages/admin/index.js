import { AdminLayout } from "../../components/layouts/adminLayout";
import { Input } from "../../components/main/form/input";
import { Submit } from "../../components/main/form/submit";

export default function Index() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "https://localhost:7105/api/repair";
    const data = {
      customerId: e.target.customer.value,
      carId: e.target.car.value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(apiUrl, options).then((x) => x.json());
    console.log(response);
  };
  return (
    <div className="flex justify-center mt-20">
      <div className="w-80">
        <h1 className="font-semibold text-lg py-4">Nowa naprawa</h1>
        <form onSubmit={handleSubmit}>
          <Input name="Klient" id="customer" />
          <Input name="Auto" id="car" />
          <Submit text="Dodaj" />
        </form>
      </div>
    </div>
  );
}

Index.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
