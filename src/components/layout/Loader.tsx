export const Loader = () => {
  return (
    <span
      className="relative inline-block w-12 h-12 rounded-full border-4 border-[var(--chart-1)] border-t-transparent animate-spin"
      style={{ animationDuration: "1s" }}
    >
      <span
        className="absolute inset-0 m-auto w-10 h-10 rounded-full border-4 border-transparent border-b-[var(--chart-1)] border-l-[var(--chart-1)]"
        style={{ animation: "spin-reverse 0.5s linear infinite" }}
      />
      <span
        className="absolute inset-0 m-auto w-8 h-8 rounded-full border-4 border-[var(--chart-1)] border-t-transparent animate-spin"
        style={{ animationDuration: "1.5s" }}
      />
      {/* Custom CSS for reverse spin */}
      <style>
        {`
          @keyframes spin-reverse {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
        `}
      </style>
    </span>
  );
};
