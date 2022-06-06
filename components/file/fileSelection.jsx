import { useEffect, useState } from "react";
import { getAllFiles, getFile } from "../../lib/File";
import { ExitIcon } from "../main/icons/exit";

export const FileSelection = () => {
  const { data } = getAllFiles(2);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => setSelectedItems([...selectedItems, item]);
  const handleUnselect = (item) =>
    setSelectedItems(selectedItems.filter((x) => x != item));

  return (
    <div>
      <div>
        <Title>Dzisiaj</Title>
        <Container>
          {data?.map((file) => (
            <Item
              onSelect={() => handleSelect(file)}
              onUnselect={() => handleUnselect(file)}
            >
              <Photo source={file.source} alt={file.name} />
            </Item>
          ))}
        </Container>
      </div>
      <div>
        <Title>Wczoraj</Title>
        <Container>
          {data?.map((file) => (
            <Item>
              <Photo source={file.source} alt={file.name} />
            </Item>
          ))}
        </Container>
      </div>
    </div>
  );
};

const Container = ({ children }) => (
  <div class="container">
    <div class="flex flex-wrap">{children}</div>
  </div>
);

const Item = ({ children, onSelect = () => null, onUnselect = () => null }) => {
  const [selected, setSelected] = useState(false);
  const handleSelect = (e) => {
    e.preventDefault();
    setSelected(!selected);
    selected ? onUnselect() : onSelect();
  };
  return (
    <div class="flex flex-wrap w-1/3 relative" onClick={handleSelect}>
      <div
        class={`w-full p-1 ${selected && "opacity-50 scale-95"} transition-all`}
      >
        {children}
      </div>
    </div>
  );
};

const Photo = ({ source, alt }) => {
  return (
    <img
      src={source}
      alt={alt}
      className="object-cover object-center w-full h-full aspect-video rounded-lg"
    />
  );
};

const Title = ({ children }) => (
  <h1 className="py-2 font-semibold text-lg text-neutral-900">{children}</h1>
);
