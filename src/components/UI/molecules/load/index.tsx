import React from "react";
import { Alert, Loader } from "../../atoms";
import { Type } from "../../atoms/alert";

type LoadProps = {
  loading: boolean | null | undefined;
  error: string | null;
  children: React.ReactNode;
};
export default function Load({ loading, error, children }: LoadProps) {
  if (loading === null || loading === undefined) return false;

  if (loading === true)
    return (
      <div className="flex justify-center w-full mt-10 mb-5">
        <Loader />
      </div>
    );

  if (error)
    return (
      <Alert title="Error Occurred!" type={Type.warning}>
        {error}
      </Alert>
    );

  return children;
}
