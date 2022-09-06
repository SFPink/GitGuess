import React, { useState } from "react";
import Chart, { ChartProps } from "../chart";
import Pie from "./pie";
import { MemoTooltip } from "../tooltip";

import "./index.scss";

interface PieChartProps extends ChartProps {
  colorFrom?: string;
  colorTo?: string;
  padAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  cornerRadius?: number;
  tooltip: Function | null;
}

export default function PieChart({
  colorFrom = "#74aa07",
  colorTo = "#44d8e0",
  padAngle,
  innerRadius,
  outerRadius,
  cornerRadius,
  tooltip = null,
  ...props
}: PieChartProps) {
  const [visible, setVisible] = useState<Boolean>(false);
  const [tooltipData, setTooltipData] = useState<Object>({});

  const showTooltip = (evt, data) => {
    setVisible(true);
    setTooltipData(data);
  };

  const hideTooltip = (evt, data) => {
    // TODO:: How do we prevent flickering when you hover over tooltip?
    // TODO:: This fires when hovering over the text label, prevent this..
    setVisible(false);
  };

  return (
    <>
      <Chart
        className="pie-chart"
        outside={
          tooltip && (
            <MemoTooltip visible={visible}>{tooltip(tooltipData)}</MemoTooltip>
          )
        }
        {...props}
      >
        <Pie
          colorFrom={colorFrom}
          colorTo={colorTo}
          padAngle={padAngle}
          cornerRadius={cornerRadius}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          onMouseOver={showTooltip}
          onMouseOut={hideTooltip}
        />
      </Chart>
    </>
  );
}
