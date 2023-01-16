import React from "react";

export default function Button({
  type,
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}
