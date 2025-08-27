"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({ children }) {
  const pathname = usePathname();

  // define small padding routes (and subroutes if needed)
  const smallPaddingRoutes = ["/name", "/jobs"];

  // check if current path starts with /job etc.
  const isSmall =
    smallPaddingRoutes.some((route) => pathname.startsWith(route));

  return (
    <main className={isSmall ? "flex-grow p-1" : "flex-grow p-6"}>
      {children}
    </main>
  );
}
