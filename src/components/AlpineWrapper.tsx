"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface AlpineWrapperProps {
  children: ReactNode;
  data?: string;
  className?: string;
  id?: string;
}

export function AlpineWrapper({
  children,
  data = "{}",
  className,
  id,
}: AlpineWrapperProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("alpinejs").then(({ default: Alpine }) => {
        const win = window as unknown as { Alpine?: typeof Alpine };
        if (!win.Alpine) {
          win.Alpine = Alpine;
          Alpine.start();
        }
        if (rootRef.current) {
          Alpine.initTree(rootRef.current);
        }
      });
    }
  }, []);

  return (
    <div
      ref={rootRef}
      {...{
        "x-data": data,
      }}
      className={className}
      id={id}
    >
      {children}
    </div>
  );
}
