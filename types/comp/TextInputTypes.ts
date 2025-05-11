import React, { FocusEvent, Key, ReactNode } from "react";
import { KeyboardEvent as ReactAriaKeyboardEvent } from "@react-types/shared";
import { DateValue } from "@heroui/react";

interface BasicTypeProp {
  labelPlacement?: "outside" | "outside-left" | "inside";
  size?: "md" | "sm" | "lg";
  isClearable?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  maxLength?: number;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
  variant?: "flat" | "bordered" | "faded" | "underlined";
}

export interface TextInputTypeProps extends BasicTypeProp {
  label?: React.ReactNode;
  name?: string;
  value?: string;
  numericValue?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  isDisabled?: boolean;
  endContent?: any;
  startContent?: any;
  propClassNames?: Partial<
    Record<
      | "base"
      | "label"
      | "inputWrapper"
      | "innerWrapper"
      | "mainWrapper"
      | "input"
      | "clearButton"
      | "helperWrapper"
      | "description"
      | "errorMessage",
      string
    >
  >;
  type?: "text" | "search" | "url" | "tel" | "email" | "password" | "number";
  min?: number;
  max?: number;
  description?: string;
  autoFocus?: boolean;
  errors?: Record<string, any>;
  touched?: Record<string, any>;
  errorMessage?: string;
  id?: string;
  onBlur?: (e: FocusEvent<Element>) => void;
  handleSave?: any;
}

// Interface extending TextInputTypeProps with additional props
export interface TextAreaTypeProps extends TextInputTypeProps {
  minRows?: number;
  maxRows?: number;
  errorMessage?: string;
  isInvalid?: boolean;
  // Add any additional props specific to your custom text input
}

export interface InputSelectTypeProps extends BasicTypeProp {
  data: { value: string | number; label: string }[];
  label?: string;
  className?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  value?: any;
  selectionMode?: "single" | "multiple";
  variant?: "flat" | "bordered" | "faded" | "underlined";
  description?: string;
  errorMessage?: string;
  isLoading?: boolean;
  onSelectionChange?: any;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  readOnly?: boolean;
}

export interface TextAutocompleteTypeProps {
  data: { value: string; label: string }[];
  label?: string;
  placeholder?: string;
  className?: string;
  isRequired?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  onSelectionChange?: (key: Key | null) => void;

  onInputChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  value?: string;
  inputValue?: string;
  defaultSelectedKey?: any;
  isClearable?: boolean;
  readOnly?: boolean;
  disabledKeys?: any;
}

type Variant = "flat" | "bordered" | "faded" | "underlined" | undefined; // Add more variants as needed
type Color =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined; // Add more colors as needed
type Size = "md" | "sm" | "lg" | undefined; // Add more sizes as needed
type Radius = "md" | "sm" | "lg" | "none" | "full" | undefined; // Add more radii as needed
type LabelPlacement = "outside" | "outside-left" | "inside" | undefined; // Add more placements as needed

// !----------------------------------------------------------------
// *-------------------------DATE PICKER----------------------------
// !----------------------------------------------------------------

export interface DatePickerTypeProp {
  name: string;
  value?: any;
  label?: React.ReactNode;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  description?: React.ReactNode;
  labelPlacement?: "inside" | "outside" | "outside-left";
  errorMessage?: React.ReactNode | ((v: any) => React.ReactNode);
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  autoFocus?: boolean;
  classNames?: Record<
    | "base"
    | "selectorButton"
    | "selectorIcon"
    | "popoverContent"
    | "calendar"
    | "calendarContent"
    | "timeInputLabel"
    | "timeInput",
    string
  >;
  className?: string;
  dateInputClassNames?: Record<
    | "base"
    | "label"
    | "inputWrapper"
    | "innerWrapper"
    | "input"
    | "helperWrapper"
    | "description"
    | "errorMessage",
    string
  >;
  timeInputProps?: any;
  calendarProps?: any;
  selectorButtonProps?: any;
  popoverProps?: any;
  showMonthAndYearPickers?: any;
  CalendarBottomContent?: React.ReactNode;
  shouldForceLeadingZeros?: boolean;
  hideTimeZone?: boolean;
  granularity?: "day" | "hour" | "minute" | "second";
  hourCycle?: 12 | 24;
  isDateUnavailable?: ((date: DateValue) => boolean) | undefined;
  CalendarTopContent?: React.ReactNode;
  calendarWidth?: number;
  visibleMonths?: number | undefined;
  selectorIcon?: React.ReactNode;
  isReadOnly?: boolean;
  maxValue?: any;
  minValue?: any;
  // function
  onChange?: (value: any) => void;
  onFocus?: (e: FocusEvent<Element>) => void;
  onBlur?: (e: FocusEvent<Element>) => void;
  onFocusChange?: (isFocused: boolean) => void;
  onKeyDown?: (e: ReactAriaKeyboardEvent) => void;
  onKeyUp?: (e: ReactAriaKeyboardEvent) => void;
  // formik related
  errors?: Record<string, any>;
  touched?: Record<string, any>;
}
// !----------------------------------------------------------------
// *------------------------SELECT INPUT----------------------------
// !----------------------------------------------------------------
export interface SelectInputTypeProps {
  // required
  items: Record<string, any>[];
  children: any;
  name: string;
  placeholder: string;
  // optional
  selectionMode?: "single" | "multiple";
  selectedKeys?: any;
  disabledKeys?: any;
  defaultSelectedKeys?: any;
  selectorIcon?: React.ReactNode;
  scrollRef?: React.RefObject<HTMLElement>;
  spinnerRef?: React.RefObject<HTMLElement>;
  fullWidth?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  isMultiline?: boolean;
  isInvalid?: boolean;
  showScrollIndicators?: boolean;
  disallowEmptySelection?: boolean;
  disableAnimation?: boolean;
  disableSelectorIconRotation?: boolean;
  popoverProps?: any;
  listboxProps?: any;
  scrollShadowProps?: any;
  classNames?: Record<
    | "base"
    | "label"
    | "trigger"
    | "mainWrapper"
    | "innerWrapper"
    | "selectorIcon"
    | "value"
    | "listboxWrapper"
    | "listbox"
    | "popoverContent"
    | "helperWrapper"
    | "description"
    | "errorMessage",
    string
  >;
  value?: string;
  label?: React.ReactNode;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  description?: React.ReactNode;
  labelPlacement?: "inside" | "outside" | "outside-left";
  errorMessage?: React.ReactNode | ((v: any) => React.ReactNode);
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
  autoFocus?: boolean;
  renderValue?: any;
  onClose?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  onSelectionChange?: (
    keys: "all" | (Set<React.Key> & { anchorKey?: string; currentKey?: string })
  ) => void;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  // formik related
  errors?: Record<string, any>;
  touched?: Record<string, any>;
}

// !----------------------------------------------------------------
// *---------------------AUTOCOMPLETE INPUT-------------------------
// !----------------------------------------------------------------

export interface SearchItemInputProps {
  label?: string;
  data: Record<string, any>[];
  placeholder: string;
  name: string;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  description?: string;
  labelPlacement?: "inside" | "outside" | "outside-left";
  startContent?: ReactNode;
  endContent?: ReactNode;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  isClearable?: boolean;
  classNames?: Partial<
    Record<
      | "base"
      | "listboxWrapper"
      | "listbox"
      | "popoverContent"
      | "endContentWrapper"
      | "clearButton"
      | "selectorButton",
      string
    >
  >;
  className?: string;
  selectorIcon?: ReactNode;
  onInputChange?: (value: string) => void;
  onSelectionChange?: any;
  onValueChange?: (value: string) => void;
  inputValue: string;
  inputWrapperClass?: string;
  children: any;
  isInvalid?: boolean;
  errorMessage?: string;
  errors?: Record<string, any>;
  touched?: Record<string, any>;
  selectedKey?: any;
}
