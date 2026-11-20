"use client";

import { useRef } from "react";
import LaserFlow from "@/components/LaserFlow";

export function LaserFormSurface({ children }) {
  const surfaceRef = useRef(null);

  return (
    <div ref={surfaceRef} className="laser-surface relative flex min-h-0 max-h-full flex-col">
      <div className="laser-stage" aria-hidden="true">
        <LaserFlow surfaceRef={surfaceRef} beamPosition={0.5} spread={1.8} dpr={1} />
      </div>
      {children}
    </div>
  );
}
