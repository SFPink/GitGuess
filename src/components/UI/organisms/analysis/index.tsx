import React, { useCallback } from "react";
import { useProfile } from "../../../context/user";
import { Pie } from "../../atoms/charts";

export default function AnalysisPanel({ stats }: { stats: Object }) {
  const { repos } = useProfile();
  const count = repos.length;

  const format = useCallback(() => {
    const keys = Object.keys(stats);
    const output: Array<Object> = [];

    keys.forEach((key) => {
      output.push({
        label: key,
        value: stats[key],
      });
    });

    return output;
  }, [stats]);

  return (
    <div className="py-5 analysis-panel">
      <p>
        This decision was based on the {count} repo(s) linked to this account.
      </p>
      <div>
        <Pie
          data={format()}
          value={(data) => data.value}
          height={150}
          marginTop={10}
          marginBottom={10}
          innerRadius={30}
          padAngle={0.05}
          cornerRadius={4}
          colorFrom="#be2596"
          colorTo="#25BE61"
          tooltip={({ label, value }) => (
            <>
              <p>Language: {label}</p>
              <p>Instances: {value}</p>
            </>
          )}
        />
      </div>
    </div>
  );
}
