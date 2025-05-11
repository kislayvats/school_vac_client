import { AntButtonTypeProps } from "@/types";
import { Button } from "antd";
import classNames from "classnames";

const AntButton: React.FC<AntButtonTypeProps> = ({
  onClick,
  title,
  disabled = false,
  icon = <></>,
  type = "default",
  className = "",
  size = "middle",
}) => {
  return (
    <Button
      size={size}
      className={classNames(className)}
      onClick={onClick}
      disabled={disabled}
      icon={icon}
      type={type}
    >
      {title}
    </Button>
  );
};
export default AntButton;
