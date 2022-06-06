import { useState, useEffect } from "react";
import { useAllCustomers } from "../../hooks/api/customerHooks";
import { Button } from "../main/buttons/button";
import { Modal } from "../main/modals/modal";
import { List } from "../main/table/list";
import { Search } from "../search/search";

export const CustomerSelect = ({ onSelect = () => null }) => {
  const { data, error } = useAllCustomers();
  const [isSelecting, setIsSelecting] = useState();
  const [selected, setSelected] = useState();

  const handleSelectBtnClick = () => setIsSelecting(true);
  const handleSelectCancel = () => setIsSelecting(false);
  const handleSelectSubmit = (id) => {
    const customer = data.find((x) => x.id == id);
    onSelect(customer);
    setSelected(customer);
    setIsSelecting(false);
  };

  return (
    <>
      {selected ? (
        <Button title="Zmień" onClick={handleSelectBtnClick} />
      ) : (
        <Button title="Wybierz" onClick={handleSelectBtnClick} />
      )}
      {isSelecting && (
        <SelectModal
          customers={data}
          onClose={handleSelectCancel}
          onSubmit={handleSelectSubmit}
        />
      )}
    </>
  );
};

const SelectModal = ({ customers, onClose, onSubmit }) => {
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [customerShowList, setCustomerShowlist] = useState();
  const [keywords, setKeywords] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();

  useEffect(() => prepareKeywords(), []);
  useEffect(() => prepareCustomerList(), [filteredCustomers]);

  const prepareCustomerList = () => {
    const list = [];
    filteredCustomers.forEach(({ id, name, surname, phoneNumber }) =>
      list.push({ id: id, label: `${name} ${surname}`, sublabel: phoneNumber })
    );
    setCustomerShowlist(list);
  };

  const prepareKeywords = () => {
    const list = [];
    customers.forEach(({ id, name, surname, phoneNumber }) => {
      list.push({ key: id, value: name });
      list.push({ key: id, value: surname });
      list.push({ key: id, value: phoneNumber });
    });
    setKeywords(list);
  };

  const handleSearch = (searchedKeywords) => {
    const ids = searchedKeywords.map((x) => x.key);
    if (!ids.includes(selectedCustomer)) ids.push(selectedCustomer);

    const filtered = customers.filter((x) => ids.includes(x.id));
    setFilteredCustomers(filtered);
  };

  const handleSelect = (item) => setSelectedCustomer(item.id);
  const handleSubmit = () => onSubmit(selectedCustomer);

  return (
    <Modal title="Wybierz klienta" onClose={onClose}>
      <div className="w-64">
        <Search data={keywords} onSearch={handleSearch} />
      </div>
      <List items={customerShowList} onSelect={handleSelect} />
      <div className="flex justify-end">
        <Button
          title="Gotowe"
          disabled={selectedCustomer == null}
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};
