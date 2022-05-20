import { LeftArrowIcon } from "../icons/Arrows";
import { IconButton } from "../buttons/iconButton";

export const ReturnButton = ({ onClick }) => {
  return (
    <IconButton
      transparent
      onClick={onClick}
      icon={<LeftArrowIcon w={6} h={6} />}
    />
  );
};
