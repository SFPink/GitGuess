import React from "react";
import { Helmet } from "react-helmet-async";

export interface IHeadProps {
  sitename: string;
  title?: string;
  description?: string;
}

export const Head = ({
  sitename = "Sitename",
  title = "",
  description = "",
}: IHeadProps) => {
  return (
    <Helmet
      title={title ? `${title} | ${sitename}` : undefined}
      defaultTitle={sitename}
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
