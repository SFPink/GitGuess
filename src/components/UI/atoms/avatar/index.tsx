import React from "react";
import classNames from "classnames";

export enum Sizes {
  sm,
  med,
  lrg,
}

type AvatarProps = {
  url: string;
  size: Sizes;
};

export default function Avatar({ url, size }: AvatarProps) {
  const classes = classNames({
    "object-center object-cover rounded-full": true,
    "h-36 w-36": size === Sizes.lrg,
    "h-20 w-20": size === Sizes.med,
    "h-16 w-16": size === Sizes.sm,
  });
  return <img className={classes} src={url} />;
}
