export function SectionBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 bg-[#070709]" aria-hidden />
      <div
        className="absolute inset-0 z-[1] opacity-50"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />
      <div className="absolute top-[10%] right-[5%] w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-[#ff1900]/[0.05] rounded-full blur-[100px] md:blur-[140px] z-0 pointer-events-none" aria-hidden />
      <div className="absolute bottom-[15%] left-[-5%] w-[240px] h-[240px] md:w-[320px] md:h-[320px] bg-[#ff3d00]/[0.04] rounded-full blur-[80px] md:blur-[120px] z-0 pointer-events-none" aria-hidden />
    </>
  );
}
