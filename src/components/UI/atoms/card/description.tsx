import React from "react";

type CardDesriptionProps = {
  children: React.ReactNode;
};

export default function CardDesription({ children }: CardDesriptionProps) {
  return (
    <div className="w-full">
      <div className="text-md mt-4 text-justify md:text-left text-sm">
        {children}
      </div>
    </div>
  );
}
