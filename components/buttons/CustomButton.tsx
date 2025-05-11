import React from "react";
import { Button } from "@heroui/react";
import { CustomButtonPropType } from "@/types";
import classNames from "classnames";

const CustomButton: React.FC<CustomButtonPropType> = ({
  title,
  color = "default",
  size = "md",
  radius = "md",
  startContent,
  endContent,
  fullWidth = false,
  isLoading = false,
  variant = "solid",
  className = "",
  onPress,
  isDisabled = false,
  type = "button",
  href,
  target,
  rel,
  as,
}) => {
  return (
    <Button
      color={color}
      size={size}
      radius={radius}
      startContent={startContent}
      endContent={endContent}
      fullWidth={fullWidth}
      isLoading={isLoading}
      variant={variant}
      className={classNames(
        className,
        "!cursor-pointer",
        variant === "bordered" && "border-solid"
      )}
      onPress={onPress}
      isDisabled={isDisabled}
      type={type}
      href={href}
      target={target}
      rel={rel}
      as={as}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
