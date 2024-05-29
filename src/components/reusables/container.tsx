type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[1200px] mx-auto bg-white min-h-screen flex flex-col">
      {children}
    </div>
  );
}
