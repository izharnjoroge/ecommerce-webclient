type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="w-auto mx-auto bg-white min-h-screen flex flex-col border-l border-r">
      {children}
    </div>
  );
}
