import "./Stars.css";

function Stars() {
  const stars = Array.from({ length: 150 }).map((_, i) => {
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    return (
      <div
        key={"star-" + i}
        className="star"
        style={{
          width: size + "px",
          height: size + "px",
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          boxShadow: `0 0 ${size * 3}px ${size / 2}px rgba(255, 255, 255, 0.8)`,
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
    <>
      <div className="stars">{stars}</div>
      <div className="twinkle-layer">{twinkles}</div>
    </>
  );
}

export default Stars;
