import { TextInputTypeProps } from "@/types";
import { Input } from "@heroui/react";
import classNames from "classnames";

export default function TextInput({
  label,
  placeholder = "Enter here",
  labelPlacement = "outside",
  size = "md",
  isClearable = false,
  isRequired = false,
  isReadOnly = false,
  fullWidth = false,
  name = "",
  value,
  numericValue = 0,
  color = "default",
  onChange,
  onValueChange,
  className = "",
  endContent,
  startContent,
  radius,
  propClassNames,
  errors,
  touched,
  isDisabled,
  description,
  variant,
  type = "text",
  min,
  max,
  autoFocus,
  onBlur,
}: TextInputTypeProps) {
  return (
    <Input
      autoFocus={autoFocus}
      type={type}
      name={name}
      value={type === "number" ? String(numericValue) : value}
      label={label}
      description={description}
      placeholder={placeholder}
      labelPlacement={labelPlacement}
      min={min}
      max={max}
      size={size}
      variant={variant}
      isClearable={isClearable}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      fullWidth={fullWidth}
      onChange={onChange}
      onValueChange={onValueChange}
      className={classNames("transition-animation", className)}
      endContent={endContent}
      startContent={startContent}
      radius={radius}
      errorMessage={errors?.[name]}
      isDisabled={isDisabled}
      isInvalid={errors?.[name] && touched?.[name] ? true : false}
      color={errors?.[name] && touched?.[name] ? "danger" : color}
      classNames={{
        inputWrapper: variant === "bordered" ? "bg-white" : "",
        input: "!text-[16px] placeholder:text-sm",
        label: "label-class",
        ...propClassNames,
      }}
      onBlur={onBlur}
    />
  );
}
