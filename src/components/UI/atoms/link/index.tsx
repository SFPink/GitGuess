import classNames from "classnames";
import React from "react";

interface LinkProps
  extends React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    React.AriaAttributes {
  children: React.ReactNode;
}

export default function Link({ className, children, ...props }: LinkProps) {
  return (
    <a
      className={classNames("text-indigo-600 hover:text-indigo-900", className)}
      {...props}
    >
      {children}
    </a>
  );
}
