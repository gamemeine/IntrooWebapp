import { useEffect, useState } from "react";
import { getAllFiles, addFile } from "../../lib/File";
import { toShownDate } from "../../utils/date/dateUtils";
import { FileInput } from "../main/form/fileInput";
import { Loader } from "../main/other/loader";
import { Item } from "./Item";

export const FileSection = ({ onChange }) => {
  const { data, mutate } = getAllFiles();
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderedData, setOrderedData] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const prepareData = () => {
    let dataObj = {};
    data?.forEach((file) => {
      const date = file.createdAt.split("T")[0];
      if (dataObj[date]) {
        dataObj[date].push(file);
      } else {
        dataObj[date] = [file];
      }
    });
    const dataArr = Object.entries(dataObj);
    dataArr.sort().reverse();
    dataArr.map(([date, files]) => [date, files.sort().reverse()]);
    setOrderedData(dataArr);
  };

  useEffect(prepareData, [data]);

  const handleSelect = (item) => {
    setSelectedItems([...selectedItems, item]);
    handleSelect(selectedItems);
  };
  const handleUnselect = (item) => {
    setSelectedItems(selectedItems.filter((x) => x != item));
    handleSelect(selectedItems);
  };

  const handleAdd = async (e) => {
    setIsUploading(true);
    const files = e.target.files;
    for (const file of files) {
      await addFile(file);
      mutate();
    }
    setIsUploading(false);
  };

  const gallery = orderedData?.map(([date, files = []]) => (
    <div key={date}>
      <Subtitle>{toShownDate(date)}</Subtitle>
      <Container>
        {files.reverse().map((file) => (
          <Item
            key={file.id}
            onSelect={() => handleSelect(file)}
            onUnselect={() => handleUnselect(file)}
          >
            <Photo source={file.source} alt={file.name} />
          </Item>
        ))}
      </Container>
    </div>
  ));

  return (
    <div>
      <div className="pb-4">
        <Title>Dodaj</Title>
        <div className="flex justify-center items-center h-40 transition-all">
          {isUploading ? <Loader /> : <FileInput onChange={handleAdd} />}
        </div>
      </div>
      {gallery}
    </div>
  );
};

const Container = ({ children }) => (
  <div className="container">
    <div className="flex flex-wrap">{children}</div>
  </div>
);

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

const Subtitle = ({ children }) => (
  <h2 className="py-2 font-semibold text-lg text-neutral-500">{children}</h2>
);
