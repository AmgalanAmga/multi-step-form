"use client";

import { useRef } from "react";
import LaserFlow from "./LaserFlow";

export const LaserFooter = ({ year }: { year: number }) => {
  const footer = useRef<HTMLElement>(null);

  return (
    <footer ref={footer} className="registration-footer">
      <div className="laser-stage" aria-hidden="true">
        <LaserFlow surfaceRef={footer} beamPosition={0.5} spread={3.5} revealImage={null} dpr={1} />
      </div>
      <small>© {year} Firstleaf.</small>
    </footer>
  );
};
