import { useState, useEffect } from "react";

export const Search = ({ items, onFiltered = () => null, filter }) => {
  const [search, setSearch] = useState("");

  useEffect(() => filterItems(), [search]);

  const handleInput = (e) => setSearch(e.target.value);

  const filterItems = () => {
    const filteredItems = items?.filter((item) => filter(item, search));
    onFiltered(filteredItems);
  };

  return (
    <div className="relative z-0 w-80 mb-6 group">
      <input
        type="text"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-600 peer"
        placeholder=" "
        required=""
        value={search}
        onChange={handleInput}
      />
      <label
        // htmlFor={name}
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-neutral-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Szukaj
      </label>
    </div>
  );
};
