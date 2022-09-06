import React from "react";
import { useApp } from "../../context/app";
import { Head } from "../../UI/organisms/header/head";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { sitename, description } = useApp();

  return (
    <div className="bg-slate-100">
      <Head title="Let's Play!" sitename={sitename} description={description} />
      <div className="px-4 lg:px-6 py-6 h-screen">{children}</div>
    </div>
  );
}
