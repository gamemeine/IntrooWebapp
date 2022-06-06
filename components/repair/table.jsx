import { DangerIndicator } from "../main/indicators/danger";
import { SuccessIndicator } from "../main/indicators/success";
import { toStringDate } from "../../utils/date/dateUtils";

export const RepairTable = ({ repairs, onRepairInspect }) => {
  return (
    <table className="w-full text-sm text-left text-neutral-500 ">
      <thead className="text-xs uppercase text-gray-700 bg-gray-200/75 backdrop-blur-lg  sticky top-14">
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
        {repairs?.map(({ id, startDate, car, customer, status }) => (
          <tr className="bg-white border-b hover:bg-gray-100 ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900">
              {id}
            </th>
            <td className="px-6 py-4">{toStringDate(startDate)}</td>
            <td className="px-6 py-4">{car.model}</td>
            <td className="px-6 py-4">{car.plate}</td>
            <td className="px-6 py-4">{`${customer.name} ${customer.surname}`}</td>
            <td className="px-6 py-2">
              {status == 0 ? (
                <DangerIndicator text="Zakończona" />
              ) : (
                <SuccessIndicator text="Rozpoczęta" />
              )}
            </td>
            <td className="px-6 py-4 text-right">
              <InspectBtn onClick={() => onRepairInspect(id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const InspectBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="font-medium text-neutral-900 hover:underline"
  >
    Więcej
  </button>
);
