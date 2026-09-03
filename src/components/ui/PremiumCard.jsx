import { useRef, useState, useCallback } from "react";

function PremiumCard({ children, className = "", spotlight = true }) {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, [spotlight]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`group relative rounded-2xl p-[1.5px] overflow-hidden transition-shadow duration-300 ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(200,169,106,0.9) 0%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,0.05) 60%, rgba(200,169,106,0.6) 100%)",
      }}
    >
      {/* Persistent gold ring — always visible, not a hover-only effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#C8A96A]/40" />

      {/* Static top glass highlight */}
      <div className="pointer-events-none absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      {/* Content layer */}
      <div className="relative rounded-2xl overflow-hidden bg-[#111111] h-full">
        {children}

        {/* Cursor-tracked spotlight — sits above content but below text via mix-blend, doesn't obscure logos */}
        {spotlight && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-soft-light"
            style={{
              opacity: hovering ? 1 : 0,
              background: `radial-gradient(220px circle at ${pos.x}% ${pos.y}%, rgba(200,169,106,0.9), transparent 70%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PremiumCard;