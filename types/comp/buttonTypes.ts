import React from "react";

interface BasicButtonPropType {
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  className?: string;
  isLoading?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "md" | "sm" | "lg" | undefined;
  radius?: "md" | "sm" | "lg" | "none" | "full" | undefined;
  onPress?: any;
  disabled?: boolean;
  isDisabled?: boolean;
  as?: any;
  // if as=Link
  href?: string;
  target?: string;
  rel?: string;
}
export interface AntButtonTypeProps {
  title: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  disabled?: boolean;
  icon?: any;
  type?: "primary" | "dashed" | "link" | "text" | "default";
  className?: string;
  size?: "large" | "middle" | "small";
}

export interface CustomButtonPropType extends BasicButtonPropType {
  title: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  fullWidth?: boolean;
  type?: any;
}

export interface CustomIconOnlyButtonProps extends BasicButtonPropType {
  Icon: any;
  iconClass?: string;
}
