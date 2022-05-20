export const List = ({ items, selectedItem, onSelect }) => {
  const handleSelect = (e, item) => {
    e.preventDefault();
    onSelect(item);
  };

  return (
    <table className="w-full text-sm text-left text-neutral-500 ">
      <tbody>
        {items?.map((item) => {
          const activeStyle =
            "text-neutral-100 bg-neutral-900 hover:bg-neutral-800";
          const normalStyle = "text-neutral-900 hover:bg-neutral-100";

          return (
            <tr
              className={
                item.id === selectedItem?.id ? activeStyle : normalStyle
              }
              onClick={(e) => handleSelect(e, item)}
              key={item.id}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                {item.label}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-light whitespace-nowrap"
              >
                {item.sublabel}
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
