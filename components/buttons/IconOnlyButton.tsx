import React, { MouseEvent, MouseEventHandler } from "react";
import { Button } from "@heroui/react";
import { CustomIconOnlyButtonProps } from "@/types";

const IconOnlyButton: React.FC<CustomIconOnlyButtonProps> = ({
  color = "default",
  size = "md",
  radius = "md",
  isLoading = false,
  variant = "solid",
  className,
  Icon,
  iconClass = "",
  onPress,
  isDisabled,
  as = "button",
  href,
  target,
  rel,
}) => {
  return (
    <Button
      color={color}
      size={size}
      radius={radius}
      isLoading={isLoading}
      variant={variant}
      className={className}
      isIconOnly
      onPress={onPress}
      isDisabled={isDisabled}
      as={as}
      href={href}
      target={target}
      rel={rel}
    >
      <Icon className={iconClass} />
    </Button>
  );
};

export default IconOnlyButton;
