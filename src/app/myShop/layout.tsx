"use client";

import Container from "@/src/components/reusables/container";
import NavBar from "@/src/components/reusables/navBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <NavBar />
      <div>{children}</div>
      {/* <Footer /> */}
    </Container>
  );
}
