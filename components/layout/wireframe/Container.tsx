import React from "react";
import classNames from "classnames";

interface ContainerPropsType {
  className?: string;
  children?: React.ReactNode; // Include children property
}

export function Container({
  className,
  children, // Use children property
  ...props
}: ContainerPropsType): JSX.Element {
  return (
    <div
      className={classNames(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children} {/* Render children */}
    </div>
  );
}
