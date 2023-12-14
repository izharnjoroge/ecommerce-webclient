"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className={`mt-auto border-t py-5 px-7 text-black text-center ${
        pathname === "/" ? "hidden" : ""
      }`}
    >
      <small>2023. All rights reserved.</small>
    </footer>
  );
}
