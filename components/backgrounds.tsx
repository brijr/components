import React from "react";

export function Background() {
  return (
    <div className="w-full -z-50 h-screen fixed top-0 right-0 left-0 dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.1] flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8"></p>
    </div>
  );
}
