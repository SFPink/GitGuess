import React, { useEffect, useState, useRef } from "react";
import { ResizeObserver } from "@juggle/resize-observer";

export type Dimensions = {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  boundedHeight: number;
  boundedWidth: number;
  width: number;
  height: number;
};

const defaultSettings = {
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  width: 0,
  height: 0,
  boundedHeight: 0,
  boundedWidth: 0,
};

const combineChartDimensions = (dimensions: Dimensions): Dimensions => {
  return {
    ...dimensions,
    boundedHeight: Math.max(
      dimensions.height - dimensions.marginTop - dimensions.marginBottom,
      0
    ),
    boundedWidth: Math.max(
      dimensions.width - dimensions.marginLeft - dimensions.marginRight,
      0
    ),
  };
};

/**
 * For more information - https://wattenberger.com/blog/react-and-d3
 * @param {Dimensions} dimensions
 */
export default function useChartDimensions(
  defaultSettings: Dimensions
): [
  ref: React.RefObject<HTMLInputElement | undefined>,
  newSettings: Dimensions
] {
  const ref = useRef<any>();
  const dimensions = combineChartDimensions(defaultSettings);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (dimensions.width && dimensions.height) return;

    const element = ref.current;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      if (width !== entry.contentRect.width) setWidth(entry.contentRect.width);
      if (height !== entry.contentRect.height)
        setHeight(entry.contentRect.height);
    });

    if (element) resizeObserver.observe(element);

    return () => {
      if (element) resizeObserver.unobserve(element);
    };
  }, []);

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newSettings];
}
