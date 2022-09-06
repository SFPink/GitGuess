import React from "react";

interface InputProps
  extends React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    React.AriaAttributes {
  children: React.ReactNode;
}

export default function Label({ children, ...props }: InputProps) {
  return (
    <label className={"mr-6 text-right font-bold text-gray-600"} {...props}>
      {children}
    </label>
  );
}
