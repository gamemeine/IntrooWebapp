import { useState, useEffect } from "react";
import { Search } from "../table/search";
import { List } from "../table/list";
import { contains } from "../../../utils/stringUtils";
import { LoadingSection } from "../other/loadingSection";
import { Modal } from "../modals/modal";
import { Button } from "../buttons/button";

export const SelectInput = ({ title, items, isLoading, onSelect }) => {
  const [isPicking, setIsPicking] = useState(false);

  const handleClick = () => setIsPicking(true);
  const handleClose = () => setIsPicking(false);

  const handleSubmit = (item) => {
    onSelect(item);
    setIsPicking(false);
  };

  return (
    <>
      <div>
        <Button title="Wybierz" onClick={handleClick} />
      </div>
      {isPicking && (
        <PickModal
          title={title}
          onClose={handleClose}
          onSubmit={handleSubmit}
          items={items}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

const PickModal = ({ title, onClose, items, isLoading, onSubmit }) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (i) => setSelectedItem(i);
  const handleSubmit = (e) => onSubmit(selectedItem);

  const filter = (item, value) =>
    contains(item.label, value) ||
    contains(item.sublabel, value) ||
    item?.id === selectedItem?.id ||
    item?.id === selectedItem?.id;

  return (
    <Modal title={title} submitBtnText={"Wybierz"} onClose={onClose}>
      <Search
        onFiltered={(i) => setFilteredItems(i)}
        items={items}
        filter={filter}
      />
      <LoadingSection isLoading={isLoading}>
        <List
          items={filteredItems}
          onSelect={handleSelect}
          selectedItem={selectedItem}
        />
      </LoadingSection>
      <div className="flex justify-end">
        <Button
          title="Wybierz"
          onClick={handleSubmit}
          disabled={selectedItem === null}
        />
      </div>
    </Modal>
  );
};
