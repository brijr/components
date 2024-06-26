import React from "react";

export function Background() {
  return (
    <div className="fixed left-0 right-0 top-0 -z-50 flex h-screen w-full items-center justify-center bg-accent bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl"></p>
    </div>
  );
}
