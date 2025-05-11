import React from "react";
import { DatePicker } from "@heroui/react";
import { DatePickerTypeProp } from "@/types";

const DatePickerInput: React.FC<DatePickerTypeProp> = ({
  name = "",
  value,
  label = "Scheduled Date",
  variant,
  color,
  size,
  radius,
  description,
  labelPlacement = "outside",
  startContent,
  endContent,
  isRequired,
  isDisabled,
  autoFocus,
  classNames,
  className,
  dateInputClassNames,
  timeInputProps,
  calendarProps,
  selectorButtonProps,
  popoverProps,
  showMonthAndYearPickers = true,
  CalendarBottomContent,
  shouldForceLeadingZeros,
  hideTimeZone,
  granularity,
  hourCycle,
  isDateUnavailable,
  CalendarTopContent,
  calendarWidth,
  visibleMonths,
  selectorIcon,
  isReadOnly,
  minValue,
  maxValue,
  onChange,
  onFocus,
  onBlur,
  onFocusChange,
  onKeyDown,
  onKeyUp,
  errors,
  touched,
}) => {
  return (
    <DatePicker
      name={name}
      value={value}
      label={label}
      variant={variant}
      size={size}
      radius={radius}
      description={description}
      labelPlacement={labelPlacement}
      startContent={startContent}
      endContent={endContent}
      isRequired={isRequired}
      isDisabled={isDisabled}
      autoFocus={autoFocus}
      classNames={{
        label: "label-class",
        calendarContent: "w-[276px]",
        ...dateInputClassNames,
      }}
      className={className}
      minValue={minValue}
      maxValue={maxValue}
      timeInputProps={timeInputProps}
      calendarProps={calendarProps}
      selectorButtonProps={selectorButtonProps}
      popoverProps={popoverProps}
      showMonthAndYearPickers={showMonthAndYearPickers}
      CalendarBottomContent={CalendarBottomContent}
      shouldForceLeadingZeros={shouldForceLeadingZeros}
      hideTimeZone={hideTimeZone}
      granularity={granularity}
      hourCycle={hourCycle}
      isDateUnavailable={isDateUnavailable}
      CalendarTopContent={CalendarTopContent}
      calendarWidth={calendarWidth}
      visibleMonths={visibleMonths}
      selectorIcon={selectorIcon}
      isReadOnly={isReadOnly}
      // errorMessage={errors?.[name]}
      // isInvalid={errors?.[name] && touched?.[name] ? true : false}
      // color={errors?.[name] && touched?.[name] ? "danger" : color}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onFocusChange={onFocusChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    />
  );
};

export default DatePickerInput;
