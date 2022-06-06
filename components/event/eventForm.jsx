import { useState } from "react";
import { FileZoneInput } from "../main/form/fileZoneInput";
import { Input } from "../main/form/input";
import { Submit } from "../main/form/submit";
import { TextareaInput } from "../main/form/textareaInput";
import { ExitIcon } from "../main/icons/exit";

export const EventForm = ({ onClose, onAdd, repair }) => {
  const [images, setImages] = useState([]);

  const handleImagesChange = (e) => {
    setImages(images.concat(Array.from(e.target.files)));
    e.target.value = null;
  };

  const handleDeleteImage = (e, img) => {
    e.preventDefault();
    const _images = images.filter((x) => x != img);
    setImages(_images);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      title: e.target.title.value,
      description: e.target.description.value,
      images: images,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="Nazwa zdarzenia" id="title" />
      <TextareaInput name="Opis" id="description" />

      <label className="font-semibold text-lg">Zdjęcia</label>
      <GalleryContainer>
        <GalleryItem>
          <FileZoneInput onChange={handleImagesChange} accept="image/*" />
        </GalleryItem>
        {images?.map((x) => (
          <GalleryItem>
            <div className="absolute right-2 top-1 z-50">
              <ExitBtn onClick={(e) => handleDeleteImage(e, x)} />
            </div>
            <img
              alt={x.name}
              className="block object-cover object-center w-full h-full rounded-lg drop-shadow-lg"
              src={URL.createObjectURL(x)}
            />
          </GalleryItem>
        ))}
      </GalleryContainer>
      <div className="flex justify-end pt-4">
        <Submit title="Dodaj" />
      </div>
    </form>
  );
};

const GalleryContainer = ({ children }) => (
  <div className="container">
    <div className="flex flex-wrap">{children}</div>
  </div>
);

const GalleryItem = ({ children }) => (
  <div className="flex flex-wrap w-1/3">
    <div className="w-full p-1 aspect-video relative">{children}</div>
  </div>
);

const ExitBtn = ({ ...props }) => (
  <button
    className="bg-neutral-900 text-gray-100 rounded-lg p-1 drop-shadow-lg"
    {...props}
  >
    <ExitIcon h={2} w={2} />
  </button>
);
