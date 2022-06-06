import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AdminLayout } from "../../../components/layouts/adminLayout";
import { RepairSectionHeading } from "../../../components/nav/repairSectionHeading";
import { Button } from "../../../components/main/buttons/button";
import { IconButton } from "../../../components/main/buttons/iconButton";
import { CarCard } from "../../../components/car/card";
import { CustomerCard } from "../../../components/customer/card";
import { EventCard } from "../../../components/main/cards/eventCard";
import { Input } from "../../../components/main/form/input";
import { Submit } from "../../../components/main/form/submit";
import { CalendarSolidIcon } from "../../../components/main/icons/calendar";
import { EditIcon } from "../../../components/main/icons/edit";
import { EndIcon } from "../../../components/main/icons/end";
import { PlusIcon } from "../../../components/main/icons/plus";
import { TrashIcon } from "../../../components/main/icons/trash";
import { DangerIndicator } from "../../../components/main/indicators/danger";
import { SuccessIndicator } from "../../../components/main/indicators/success";
import { Modal } from "../../../components/main/modals/modal";
import { WarningModal } from "../../../components/main/modals/warningModal";
import { ReturnButton } from "../../../components/nav/returnButton";
import { LoadingSection } from "../../../components/main/other/loadingSection";
import { Heading, Hero } from "../../../components/main/typography/headings";
import { createEvent, updateEvent } from "../../../utils/api/event";
import {
  getRepair,
  updateRepair,
  deleteRepair,
} from "../../../utils/api/repair";
import {
  toApiDate,
  toDateWithoutTimezone,
} from "../../../utils/date/dateUtils";
import { useSingleRepair } from "../../../hooks/api/repairHooks";

export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSingleRepair(id);

  const [repair, setRepair] = useState();

  useEffect(() => setRepair(data), [data]);

  const handleRepairClose = async () => {
    const _repair = repair;
    _repair.endDate = toDateWithoutTimezone(new Date()).toJSON();
    _repair.status = 0;
    const response = await updateRepair(_repair);

    if (response) setRepair(_repair);
  };

  const handleRepairDelete = async () =>
    await deleteRepair(id).then(() => router.push("/admin/naprawy"));

  return (
    <div>
      <PageHero {...repair} />
      <div className="w-full flex justify-between items-center">
        <ReturnButton />
        <div className="flex">
          <RepairDeleteButton onDelete={handleRepairDelete} />
          <RepairCloseButton onClose={handleRepairClose} />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <PeriodSection {...repair} />
          <CustomerSection {...repair} />
          <CarSection {...repair} />
        </div>
        <div>
          <EventsSection {...repair} />
        </div>
        <div></div>
      </div>
    </div>
  );
}

Details.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <RepairSectionHeading>{page}</RepairSectionHeading>
    </AdminLayout>
  );
};

const PageHero = ({ id, status }) => {
  const hasRepairEnded = status == 0;
  const title = `Naprawa numer ${id}`;

  const Indicator = hasRepairEnded ? (
    <DangerIndicator text={"Zakończona"} />
  ) : (
    <SuccessIndicator text={"Rozpoczęta"} />
  );

  return (
    <Hero>
      <div className="flex items-center space-x-2">
        <p>{title}</p>
        {Indicator}
      </div>
    </Hero>
  );
};

const RepairCloseButton = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleCancel = () => setIsClosing(false);
  const handleClosing = () => setIsClosing(true);

  const ClosingModal = (
    <WarningModal
      text={"Czy na pewno chcesz zakończyć naprawę?"}
      icon={<EndIcon w={14} h={14} />}
      onSubmit={onClose}
      onCancel={handleCancel}
      onClose={handleCancel}
    />
  );

  return (
    <div className="p-2">
      <Button
        title={"Zakończ naprawę"}
        icon={<EndIcon w={6} h={6} />}
        onClick={handleClosing}
      />
      {isClosing && ClosingModal}
    </div>
  );
};

const RepairDeleteButton = ({ onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = () => setIsDeleting(false);
  const handleDeleting = () => setIsDeleting(true);

  const DeletingModal = (
    <WarningModal
      text={"Czy na pewno chcesz usunąć naprawę?"}
      icon={<TrashIcon w={14} h={14} />}
      onSubmit={onDelete}
      onCancel={handleCancel}
      onClose={handleCancel}
    />
  );

  return (
    <div className="p-2">
      <Button
        title="Usuń"
        icon={<TrashIcon w={6} h={6} />}
        onClick={handleDeleting}
      />
      {isDeleting && DeletingModal}
    </div>
  );
};

const PeriodSection = ({ startDate, endDate, status }) => {
  const title = "Okres";
  const startDateText = new Date(startDate).toLocaleDateString();
  const endDateText = new Date(endDate).toLocaleDateString();
  const hasRepairEnded = status == 0;

  const StartDateIndicator = (
    <SuccessIndicator
      icon={<CalendarSolidIcon w={3} h={3} />}
      text={startDateText}
    />
  );

  const EndDateIndicator = (
    <DangerIndicator
      icon={<CalendarSolidIcon w={3} h={3} />}
      text={endDateText}
    />
  );

  return (
    <div>
      <Heading>{title}</Heading>
      <div className="flex items-center space-x-2">
        {StartDateIndicator}
        <p className="text-neutral-900">{"-"}</p>
        {hasRepairEnded && EndDateIndicator}
      </div>
    </div>
  );
};

const CustomerSection = ({ customer }) => {
  const title = "Klient";

  return (
    <div>
      <Heading>{title}</Heading>
      <CustomerCard customer={customer} />
    </div>
  );
};

const CarSection = ({ car }) => {
  const title = "Pojazd";
  return (
    <div>
      <Heading>{title}</Heading>
      <CarCard car={car} />
    </div>
  );
};

const EventsSection = ({ id, events }) => {
  const title = "Zdarzenia";
  const [isAdding, setIsAdding] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAdd = async (eventData) => {
    const newEvent = {
      title: eventData.title,
      startDate: eventData.startDate,
      repairId: id,
    };

    const response = await createEvent(newEvent);
    setIsAdding(false);
  };

  const handleEdit = async (eventData) => {
    const updatedEvent = {
      id: editingEvent.id,
      title: eventData.title,
      startDate: editingEvent.startDate,
      repairId: id,
    };

    const response = await updateEvent(updatedEvent);
    setEditingEvent(null);
  };

  const handleAddCancel = () => setIsAdding(false);
  const handleAddBtnClick = () => setIsAdding(true);

  const handleEditBtnClick = (event) => setEditingEvent(event);
  const handleEditCancel = () => setEditingEvent(null);

  const EventListItem = ({ event }) => (
    <div className="h-20 w-full border-b-2 p-4 flex justify-between items-center">
      <EventCard event={event} />
      <EventEditButton onClick={() => handleEditBtnClick(event)} />
      {editingEvent == event && (
        <EventEditFormModal
          onClose={handleEditCancel}
          onSubmit={handleEdit}
          event={event}
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading>{title}</Heading>
        <EventAddButton onClick={handleAddBtnClick} />
        {isAdding && (
          <EventAddFormModal onClose={handleAddCancel} onSubmit={handleAdd} />
        )}
      </div>
      <div className="space-y-4 py-4">
        {events?.map((event) => (
          <EventListItem event={event} />
        ))}
      </div>
    </div>
  );
};

const EventAddButton = ({ onClick }) => {
  const handleClick = (e) => onClick();
  return (
    <div>
      <IconButton lg icon={<PlusIcon w={6} h={6} />} onClick={handleClick} />
    </div>
  );
};

const EventEditButton = ({ onClick }) => {
  return <IconButton onClick={onClick} icon={<EditIcon />} />;
};

const EventAddFormModal = ({ onClose, onSubmit }) => {
  const handleClose = () => onClose();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title: e.target.title.value,
      startDate: toApiDate(new Date()),
    };

    onSubmit(eventData);
  };

  return (
    <Modal title="Nowe zdarzenie" onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Input name="Nazwa" id="title" />
        <div className="flex justify-end">
          <Submit title="Dodaj" />
        </div>
      </form>
    </Modal>
  );
};

const EventEditFormModal = ({ onClose, onSubmit, event }) => {
  const handleClose = () => onClose();

  useEffect(() => console.log(event), []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title: e.target.title.value,
      startDate: toApiDate(new Date()),
    };

    onSubmit(eventData);
  };

  return (
    <Modal title="Edytuj zdarzenie" onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Input name="Nazwa" id="title" defaultValue={event.title} />
        <div className="flex justify-end">
          <Submit title="Gotowe" />
        </div>
      </form>
    </Modal>
  );
};
