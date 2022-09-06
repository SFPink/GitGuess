import React, { useRef, useEffect, useCallback } from "react";
import { useSpring } from "react-spring";
import { pie as pieGenerator, arc as arcGenerator, interpolateRgb } from "d3";
import { useChart } from "../chart";
import Segment from "./segment";

type PieProps = {
  colorFrom?: string;
  colorTo?: string;
  innerRadius?: number;
  outerRadius?: number;
  cornerRadius?: number;
  padAngle?: number;
  onMouseEnter?: Function;
  onMouseMove?: Function;
  onMouseOver?: Function;
  onMouseOut?: Function;
};

const animationConfig = {
  to: async (next, cancel) => {
    await next({ t: 1 });
  },
  from: { t: 0 },
  config: { duration: 250 },
  reset: true,
};

function Pie({
  colorFrom = "#74aa07",
  colorTo = "#44d8e0",
  innerRadius,
  outerRadius,
  cornerRadius = 8,
  padAngle = 0.02,
  onMouseEnter,
  onMouseMove,
  onMouseOver,
  onMouseOut,
}: PieProps) {
  const previous = useRef([]);
  const interpolate = useCallback(
    () => interpolateRgb(colorFrom, colorTo),
    [colorFrom, colorTo]
  );
  const { data, value, dimensions } = useChart();
  const { boundedHeight } = dimensions;
  const totalValue = data.reduce(function (a, b) {
    return a + value(b);
  }, 0);

  const pieData = data.map((item) => {
    const v = value(item);
    return {
      percent: Math.round((v / totalValue) * 100),
      ...item,
    };
  });

  const createPie = pieGenerator().value(value).sort(null).padAngle(padAngle);

  const currentData = createPie(pieData);
  const prevData = createPie(previous.current);

  const arc = arcGenerator()
    .innerRadius(innerRadius || boundedHeight / 3)
    .outerRadius(outerRadius || boundedHeight / 2)
    .cornerRadius(cornerRadius);

  const [animatedProps, setAnimatedProps] = useSpring(() => animationConfig);
  setAnimatedProps(animationConfig);

  useEffect(() => {
    previous.current = pieData;
  });

  return (
    <>
      {currentData.map((segment, index) => {
        const range = index / (currentData.length - 1);
        let color = interpolate()(isNaN(range) ? 0 : range);

        return (
          <Segment
            key={`pie_segment_${index}`}
            from={prevData[index]}
            to={segment}
            arc={arc}
            fill={color}
            stroke={color}
            animatedProps={animatedProps}
            onMouseOver={onMouseOver}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseOut={onMouseOut}
          />
        );
      })}
    </>
  );
}

export default React.memo(Pie);
