import React from "react";

type InputGroupProps = {
  children: React.ReactNode;
};

export default function InputGroup({ children }: InputGroupProps) {
  return <div className="flex items-center mb-5">{children}</div>;
}
