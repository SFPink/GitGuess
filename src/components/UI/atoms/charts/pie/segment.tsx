import React from "react";
import { animated } from "react-spring";
import { interpolate } from "d3";

type SegmentProps = {
  from: any;
  to: any;
  stroke: string;
  fill: string;
  arc: any;
  animatedProps: any;
  onMouseEnter?: Function;
  onMouseMove?: Function;
  onMouseOver?: Function;
  onMouseOut?: Function;
};

function Segment({
  from,
  to,
  stroke,
  fill,
  arc,
  animatedProps,
  onMouseMove = () => false,
  onMouseOver = () => false,
  onMouseOut = () => false,
  onMouseEnter = () => false,
}: SegmentProps) {
  const interpolator = interpolate(from, to);
  if (to.data.percent === 0) return null;

  return (
    <g
      className="pie-segment"
      onMouseMove={(evt) => {
        onMouseMove(evt, to.data);
      }}
      onMouseOver={(evt) => {
        onMouseOver(evt, to.data);
      }}
      onMouseOut={(evt) => {
        onMouseOut(evt, to.data);
      }}
      onMouseEnter={(evt) => {
        onMouseEnter(evt, to.data);
      }}
    >
      <animated.path
        d={animatedProps.t.interpolate((t) => arc(interpolator(t)))}
        stroke={stroke}
        fill={fill}
      />
      <animated.text
        transform={animatedProps.t.interpolate(
          (t) => `translate(${arc.centroid(interpolator(t))})`
        )}
      >
        {animatedProps.t.interpolate(
          (t) => `${interpolator(t).data.percent.toFixed(0)}%`
        )}
      </animated.text>
    </g>
  );
}

export default React.memo(Segment);
