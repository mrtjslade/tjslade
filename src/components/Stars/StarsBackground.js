import { useMemo } from "react";
import "./StarsBackground.css";

function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 700px)").matches;
}

function StarsBackground() {
  const { sharpStars, blurStars, twinkles } = useMemo(() => {
    const mobile = isMobileViewport();
    const sharpCount = mobile ? 50 : 120;
    const blurCount = mobile ? 40 : 100;
    const twinkleCount = mobile ? 15 : 40;

    const sharp = Array.from({ length: sharpCount }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      return (
        <div
          key={"sharp-" + i}
          className="star star-sharp"
          style={{
            width: size + "px",
            height: size + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            boxShadow: `0 0 ${size * 3}px ${size / 2}px rgba(255,255,255,0.8)`,
          }}
        />
      );
    });

    const blur = Array.from({ length: blurCount }).map((_, i) => {
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 14 + 12;
      return (
        <div
          key={"blur-" + i}
          className="star star-blur"
          style={{
            width: size + "px",
            height: size + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animationDuration: `${duration}s`,
            opacity: 0.45,
            boxShadow: `0 0 ${size * 5}px ${size * 1.2}px rgba(255,255,255,0.5)`,
          }}
        />
      );
    });

    const twinkleEls = Array.from({ length: twinkleCount }).map((_, i) => (
      <div
        key={"twinkle-" + i}
        className="twinkle"
        style={{
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          animationDelay: `${Math.random() * 3}s`,
        }}
      />
    ));

    return { sharpStars: sharp, blurStars: blur, twinkles: twinkleEls };
  }, []);

  return (
    <div className="stars-background">
      <div className="stars-blur-layer">{blurStars}</div>
      <div className="stars-layer">{sharpStars}</div>
      <div className="twinkle-layer">{twinkles}</div>
    </div>
  );
}

export default StarsBackground;
