import { useState, useEffect } from "react";
import { useAllCars } from "../../hooks/api/carHooks";
import { Button } from "../main/buttons/button";
import { Modal } from "../main/modals/modal";
import { List } from "../main/table/list";
import { Search } from "../search/search";

export const CarSelect = ({ onSelect = () => null }) => {
  const { data, error } = useAllCars();
  const [isSelecting, setIsSelecting] = useState();
  const [selected, setSelected] = useState();

  const handleSelectBtnClick = () => setIsSelecting(true);
  const handleSelectCancel = () => setIsSelecting(false);
  const handleSelectSubmit = (id) => {
    const car = data.find((x) => x.id == id);
    onSelect(car);
    setSelected(car);
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
          cars={data}
          onClose={handleSelectCancel}
          onSubmit={handleSelectSubmit}
        />
      )}
    </>
  );
};

const SelectModal = ({ cars, onClose, onSubmit }) => {
  const [filteredCars, setFilteredcars] = useState(cars);
  const [carShowList, setcarShowlist] = useState();
  const [keywords, setKeywords] = useState();
  const [selectedCar, setSelectedCar] = useState();

  useEffect(() => prepareKeywords(), []);
  useEffect(() => preparecarList(), [filteredCars]);

  const preparecarList = () => {
    const list = [];
    filteredCars.forEach(({ id, plate, model }) =>
      list.push({ id: id, label: plate, sublabel: model })
    );
    setcarShowlist(list);
  };

  const prepareKeywords = () => {
    const list = [];
    cars.forEach(({ id, model, plate }) => {
      list.push({ key: id, value: model });
      list.push({ key: id, value: plate });
    });
    setKeywords(list);
  };

  const handleSearch = (searchedKeywords) => {
    const ids = searchedKeywords.map((x) => x.key);
    if (!ids.includes(selectedCar)) ids.push(selectedCar);

    const filtered = cars.filter((x) => ids.includes(x.id));
    setFilteredcars(filtered);
  };

  const handleSelect = (item) => setSelectedCar(item.id);
  const handleSubmit = () => onSubmit(selectedCar);

  return (
    <Modal title="Wybierz pojazd" onClose={onClose}>
      <div className="w-64">
        <Search data={keywords} onSearch={handleSearch} />
      </div>
      <List items={carShowList} onSelect={handleSelect} />
      <div className="flex justify-end">
        <Button
          title="Gotowe"
          disabled={selectedCar == null}
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};
