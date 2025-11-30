import "./StarsBackground.css";

function StarsBackground() {
  const sharpStars = Array.from({ length: 120 }).map((_, i) => {
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

  const blurStars = Array.from({ length: 100 }).map((_, i) => {
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

  const twinkles = Array.from({ length: 40 }).map((_, i) => (
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

  return (
    <div className="stars-background">
      <div className="stars-blur-layer">{blurStars}</div>
      <div className="stars-layer">{sharpStars}</div>
      <div className="twinkle-layer">{twinkles}</div>
    </div>
  );
}

export default StarsBackground;
