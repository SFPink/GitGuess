import React from "react";
import classNames from "classnames";

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  text: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "button", children, className = "", ...props }, ref) => {
    const classes = classNames({
      "bg-white hover:bg-gray-100 hover:border-gray-900 focus:border-gray-900 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded":
        true,
      [`${className}`]: true,
    });

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

export default Button;
