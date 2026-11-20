"use client";

import { useRef } from "react";
import Image from "next/image";
import LaserFlow from "./LaserFlow";

export const LaserFooter = ({ year }: { year: number }) => {
  const footer = useRef<HTMLElement>(null);

  return (
    <footer ref={footer} className="registration-footer">
      <span className="footer-landing-edge" aria-hidden="true" />
      <div className="laser-stage" aria-hidden="true">
        <LaserFlow
          surfaceRef={footer}
          transmission={1}
          intensity={0.8}
          beamWidth={2}
          flare={2}
          beamPosition={0.5}
          spread={4}
          spill={0.55}
          revealImage={null}
          dpr={1}
          fog={4}
          dust={10}
          dots={2}
          speed={2}
        />
      </div>
      <small>
        <Image src="/icon.svg" alt="" width={20} height={20} />© {year} Astra
      </small>
      <p>Take the first step toward something only you can build.</p>
    </footer>
  );
};
