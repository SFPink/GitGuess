import React from "react";

type CardImageProps = {
  url: string;
};

export default function CardImage({ url }: CardImageProps) {
  return (
    <div
      className="bg-cover bg-bottom border w-full md:w-1/3 h-64 md:h-auto relative"
      style={{ backgroundImage: `url('${url}')` }}
    ></div>
  );
}
