import { useState } from "react";
import { normalizeDate } from "../../utils/date/normalizeDate";
import { MainLayout } from "../../components/layouts/mainLayout";
import {
  Heading,
  SubHeading,
  Hero,
} from "../../components/main/typography/headings";
import { Event } from "../../components/event/event";
import data from "./data.json";

export default function Repair() {
  const [activeEvent, SetActiveEvent] = useState(data.events[0]);
  const changeEvent = (e) => SetActiveEvent(e);

  return (
    <div>
      <Hero>
        Witaj {data.info.custmer.name}! Oto twoja naprawa{" "}
        <b className="font-semibold">{data.info.car.model}</b>
      </Hero>
      <div className="py-10 sm:grid sm:grid-cols-4 space-y-12 sm:space-x-10 sm:space-y-0">
        <div className="space-y-16">
          <div>
            <Heading>Przebieg naprawy</Heading>
            <div className="mt-10 space-y-1">
              {data.events?.map((element) => (
                <Event
                  active={element == activeEvent}
                  onSelected={() => changeEvent(element)}
                  {...element}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 space-y-10">
          <div className="flex justify-between space-x-5">
            <Heading>Szczegóły</Heading>
            <SubHeading className="text-right">{activeEvent.title}</SubHeading>
          </div>

          <div className="space-y-5">
            {activeEvent?.description && (
              <Description {...activeEvent?.description} />
            )}
            {activeEvent?.info?.map((element) => (
              <Info {...element} />
            ))}

            <Gallery />
          </div>
        </div>
        <div className="space-y-10">
          <Heading>Wycena</Heading>
          <Pricing items={data.pricing} />
        </div>
      </div>
    </div>
  );
}

Repair.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

const Description = ({ date, text }) => {
  const normalizedDate = normalizeDate(date);
  return (
    <div className="bg-slate-100 p-7 rounded-lg">
      <div className="mb-4 flex justify-between">
        <h1 className="font-semibold text-neutral-800 text-xl">Opis</h1>
        <h2 className="font-semibold text-neutral-500 text-sm">
          {normalizedDate}
        </h2>
      </div>

      <p className="font-light text-neutral-600">{text}</p>
    </div>
  );
};

const Info = ({ date, text }) => {
  const normalizedDate = normalizeDate(date);
  return (
    <div className="bg-blue-100 p-7 rounded-lg">
      <div className="mb-4 flex justify-between">
        <h1 className="font-semibold text-neutral-800/ text-xl">Informacja</h1>
        <h2 className="font-semibold text-neutral-500 text-sm">
          {normalizedDate}
        </h2>
      </div>

      <p className="font-light text-neutral-600">{text}</p>
    </div>
  );
};

const Gallery = () => {
  return (
    <div className="bg-slate-100 p-7 rounded-lg">
      <div className="mb-4 flex justify-between">
        <h1 className="font-semibold text-neutral-800 text-xl">Zdjęcia</h1>
        <h2 className="font-semibold text-neutral-500 text-sm">wczoraj</h2>
      </div>

      <section className="overflow-hidden text-gray-700">
        <div className="container">
          <div className="flex flex-wrap -m-1 md:-m-2">
            <div className="flex flex-wrap w-1/2">
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
                />
              </div>
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Pricing = ({ items }) => (
  <table className="w-full text-sm text-left bg-slate-100 text-gray-500 rounded-lg">
    <thead className="text-xs text-gray-700 uppercase">
      <tr>
        <th scope="col" className="px-6 py-3 pt-6">
          Usługa
        </th>
        <th scope="col" className="px-6 py-3">
          cena
        </th>
      </tr>
    </thead>
    <tbody>
      {items.map(({ title, price }) => (
        <tr>
          <th
            scope="row"
            className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
          >
            {title}
          </th>
          <td className="px-6 py-2">{price} zł</td>
        </tr>
      ))}
      <tr>
        <th></th>
        <td className="px-6 py-2">339 zł</td>
      </tr>
    </tbody>
  </table>
);
