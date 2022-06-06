import { LeftArrowIcon } from "../main/icons/Arrows";
import { IconButton } from "../main/buttons/iconButton";

export const ReturnButton = ({ onClick }) => {
  return (
    <IconButton
      transparent
      onClick={onClick}
      icon={<LeftArrowIcon w={6} h={6} />}
    />
  );
};
