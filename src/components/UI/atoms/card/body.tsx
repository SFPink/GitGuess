import React from "react";

type CardBodyProps = {
  children: React.ReactNode;
};

export default function CardBody({ children }: CardBodyProps) {
  return (
    <div className="bg-white w-full md:w-2/3">
      <div className="h-full mx-auto px-6 md:px-0 md:pt-6 md:-ml-6 relative">
        <div className="bg-white lg:h-full rounded-tl-lg p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
