import React from "react";

type CardTitleProps = {
  children: React.ReactNode;
};

export default function CardTitle({ children }: CardTitleProps) {
  return (
    <div className="w-full lg:border-right lg:border-solid text-center md:text-left">
      <h3 className="text-2xl font-bold leading-7 text-gray-600 sm:truncate sm:text-3xl sm:tracking-tight">
        {children}
      </h3>
      <hr className=" mt-4 border-1 border-gray-300" />
    </div>
  );
}
