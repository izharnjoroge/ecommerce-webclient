const Spinner = ({ height }: { height?: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        height ? "" : "min-h-screen"
      }`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
    </div>
  );
};

export default Spinner;
