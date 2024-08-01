"use client";

import Container from "@/src/components/reusables/container";
import NavBar from "@/src/components/reusables/navBar";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "E-Commerce Web",
//   description: "An Online Shopping Site",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <NavBar />
      <div>{children}</div>
      {/* <Footer /> */}
    </main>
  );
}
