import { Button } from "../buttons/button";

export const Submit = ({ title, icon, disabled = false }) => {
  return <Button type="submit" title={title} icon={icon} disabled={disabled} />;
};
