import React, { useEffect, useCallback, useState, useRef } from "react";
import { useChart } from "../chart";
import "./index.scss";

// OFFSET IS WRONG BECAUSE OF GROUP TRANSLATE TO CENTER IT!
export default function Tooltip({
  children,
  visible,
  offsetX = 20,
  offsetY = 0,
}) {
  const { getMousePosition } = useChart();
  const listenerActive = useRef(false);
  const [position, setPosition] = useState([0, 0]);

  const getPosition = useCallback(
    (props) => {
      let xPosition = props.clientX + offsetX;
      let yPosition = props.clientY + offsetY;
      setPosition([xPosition, yPosition]);
    },
    [offsetX, offsetY, getMousePosition]
  );

  const addListener = useCallback(() => {
    window.addEventListener("mousemove", getPosition);
    listenerActive.current = true;
  }, [getPosition]);

  const removeListener = useCallback(() => {
    window.removeEventListener("mousemove", getPosition);
    // Pretty sure I don't need this...
    listenerActive.current = false;
  }, [getPosition]);

  useEffect(() => {
    if (listenerActive.current === false && visible) {
      addListener();
    }
    if (listenerActive.current === true && !visible) {
      removeListener();
    }

    return () => {
      removeListener();
    };
  }, [visible, addListener, removeListener]);

  if (!visible) return null;

  return (
    <div
      className="chart-tooltip html"
      style={{ left: position[0], top: position[1] }}
    >
      {children}
    </div>
  );
}

export const MemoTooltip = React.memo(Tooltip);
