import Image from "next/image";

export default function Home() {
  return (
    <div
      // style={{
      //   // use relative position for the parent div
      //   position: "relative",
      //   width: "100vw",
      //   height: "100vh",
      // }}
      className="relative w-[100dvw] h-[100dvh]"
    >
      <Image src="/hero2.jpg" alt="logo" fill={true} />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-yellow-500 p-8 shadow-md">
        <h1
          style={{
            fontSize: "25px",
            color: "black",
          }}
        >
          Welcome to Sling Academy!
        </h1>
      </div>
    </div>
  );
}
