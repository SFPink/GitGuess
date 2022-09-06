import React from "react";

interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {
  onEnterPress?: Function;
}

export default function Input({
  onKeyDown,
  onEnterPress,
  ...props
}: InputProps) {
  const handleKeyPress = (evt) => {
    if (
      evt.key === "Enter" &&
      onEnterPress &&
      typeof onEnterPress === "function"
    ) {
      onEnterPress(evt);
    }

    if (onKeyDown && typeof onKeyDown === "function") {
      onKeyDown(evt);
    }
  };

  return (
    <input
      onKeyDown={handleKeyPress}
      className={
        "flex-1 py-2 border-b border-gray-400 focus:border-gray-900  text-gray-600 placeholder-gray-400 outline-none"
      }
      {...props}
    />
  );
}
