const Loader = () => {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none flex items-center 
                       justify-center z-1"
      >
        <div
          className="h-10 w-10 border-5 border-primary/30 rounded-full border-t-primary
                            animate-loader"
        />
      </div>
    </>
  );
};

export default Loader;
