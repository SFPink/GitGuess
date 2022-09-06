import React, { createContext, useContext, useCallback } from "react";
import useChartDimensions, { Dimensions } from "./useChartDimensions";

import "./index.scss";

export interface ChartProps {
  children?: Function | React.ReactNode;
  outside?: Function | React.ReactNode;
  height: number;
  width?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  // TODO:: Should revisit this type
  data?: any;
  center?: Boolean;
  className?: string;
  xValue?: Function;
  yValue?: Function;
  value: Function;
}

type ChartContextProps = {
  // TODO:: Not sure how to handle refs in TS, revisit
  chart?: React.RefObject<any> | null;
  dimensions: Dimensions;
  data?: any;
  xValue?: Function;
  yValue?: Function;
  value: Function;
  offsetX?: number;
  offsetY?: number;
};

const ChartContext = createContext<ChartContextProps>({
  value: (data) => data.value,
  dimensions: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    width: 0,
    height: 0,
    boundedHeight: 0,
    boundedWidth: 0,
  },
  offsetX: 0,
  offsetY: 0,
});

const ChartProvider = ({
  children,
  outside,
  height = 400,
  width,
  marginTop = 60,
  marginBottom = 60,
  marginRight = 60,
  marginLeft = 60,
  data = [],
  center = true,
  className = "",
  xValue = (data) => data.label,
  yValue = (data) => data.value,
  value = (data) => data.value,
}: ChartProps) => {
  const [ref, dimensions] = useChartDimensions({
    width,
    height,
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
  } as Dimensions);

  if (!data || data.constructor !== Array)
    return (
      <p className="py-4 font-bold text-red-700">
        No data supplied or data is not in the correct format.
      </p>
    );

  // Content check prevents charts for initially in the wrong position until width and height is calculated.
  const content =
    typeof children === "function"
      ? children({ ref, dimensions, xValue, yValue })
      : children;

  const outsideChildren =
    typeof outside === "function"
      ? outside({ ref, dimensions, xValue, yValue })
      : outside;

  const offsetX = center
    ? dimensions.marginLeft + dimensions.boundedWidth / 2
    : dimensions.marginLeft;

  const offsetY = center
    ? dimensions.marginTop + dimensions.boundedHeight / 2
    : dimensions.marginTop;

  return (
    <ChartContext.Provider
      value={{
        chart: ref ? ref.current : null,
        dimensions,
        data,
        xValue,
        yValue,
        value,
        offsetX,
        offsetY,
      }}
    >
      <div ref={ref} className={`chart ${className}`}>
        <svg
          height={dimensions.height}
          width={dimensions.width}
          id={`svg-chart-container`}
        >
          <g transform={`translate(${[offsetX, offsetY].join(",")})`}>
            {!dimensions.width || !dimensions.height ? "loading..." : content}
          </g>
        </svg>
        {outsideChildren}
      </div>
    </ChartContext.Provider>
  );
};

export const useChart = () => {
  const {
    offsetX = 0,
    offsetY = 0,
    chart,
    ...props
  } = useContext(ChartContext);

  const getMousePosition = useCallback(
    (x, y): { x: number; y: number } => {
      return {
        x: x - offsetX,
        y: y - offsetY,
      };
    },
    [offsetX, offsetY]
  );

  return { getMousePosition, ...props };
};

export default ChartProvider;
