import React from "react";
import { getMaxProperty } from "../../../../helpers";
import { countLanguages } from "../../../../helpers/repos";
import { useProfile } from "../../../context/user";
import AnalysisPanel from "../analysis";

// TODO:: Perhaps ask the user if this is correct? If no, guess again?
export default function GuessPanel() {
  const { repos } = useProfile();

  if (repos.length === 0) return null;

  let stats = countLanguages(repos);
  let preferred = getMaxProperty(stats);

  return (
    <>
      <div className="py-5 guess-panel">
        <p className="mb-5">
          I have calculated that the preferred language for this user is:
        </p>
        <h2 className="text-5xl font-normal leading-normal mt-0 text-pink-400 text-center">
          {preferred}
        </h2>
      </div>
      <AnalysisPanel stats={stats} />
    </>
  );
}
