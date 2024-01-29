import Container from "@/src/components/container";
import NavBar from "@/src/components/navBar";

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
