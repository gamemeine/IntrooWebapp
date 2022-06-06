import { contains } from "../../utils/string/stringUtils";
import { Input } from "../main/form/input";

/**
 * Input-based component reutrning data filtered by search value
 *
 * @param {array} data key-value list of data to search in
 * @param {callback} onSearch callback called every time search chagnes returning filtered data
 */
export const Search = ({ data = [], onSearch }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();

    const value = e.target.value;
    const filteredData = data.filter((x) => contains(x.value, value));
    onSearch(filteredData);
  };
  return <Input name="Szukaj" onChange={handleSearchChange} />;
};
