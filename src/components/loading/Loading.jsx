const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-12 h-12">
        {/* Background Circle */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        {/* Animated Circle */}
        <div className="absolute inset-0 rounded-full border-4 border-t-rose-950 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
