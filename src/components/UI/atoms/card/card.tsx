import React from "react";

type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="shadow-lg flex flex-wrap w-full lg:w-4/5 mx-auto rounded-lg overflow-hidden">
      {children}
    </div>
  );
}
