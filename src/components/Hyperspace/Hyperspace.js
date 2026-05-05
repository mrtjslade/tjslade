import { useEffect, useRef } from "react";
import "./Hyperspace.css";

const DURATION_MS = 900;
const STAR_COUNT = 220;
const MIDPOINT = 0.5;

function Hyperspace({ active, onMidpoint, onComplete }) {
  const canvasRef = useRef(null);
  const callbacksRef = useRef({ onMidpoint, onComplete });
  callbacksRef.current = { onMidpoint, onComplete };

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * 80 + 10,
      speedMul: 0.6 + Math.random() * 0.8,
    }));

    const start = performance.now();
    let raf = 0;
    let midpointFired = false;

    const animate = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION_MS, 1);

      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.hypot(w, h);

      ctx.fillStyle = "rgba(8, 10, 18, 0.42)";
      ctx.fillRect(0, 0, w, h);

      const accel = t * t;
      const trailLen = 6 + accel * 260;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const speed = (4 + accel * 90) * s.speedMul;
        s.distance += speed;

        const cosA = Math.cos(s.angle);
        const sinA = Math.sin(s.angle);
        const x1 = cx + cosA * s.distance;
        const y1 = cy + sinA * s.distance;
        const tail = s.distance - trailLen;
        const x2 = cx + cosA * tail;
        const y2 = cy + sinA * tail;

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, "rgba(220, 230, 245, 0.75)");
        grad.addColorStop(0.4, "rgba(170, 190, 225, 0.5)");
        grad.addColorStop(1, "rgba(220, 230, 245, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1 + accel * 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        if (s.distance > maxDist) {
          s.angle = Math.random() * Math.PI * 2;
          s.distance = Math.random() * 40;
        }
      }

      const flash = Math.max(0, 1 - Math.abs(t - MIDPOINT) * 1.6);
      if (flash > 0) {
        ctx.fillStyle = `rgba(210, 220, 235, ${flash * 0.32})`;
        ctx.fillRect(0, 0, w, h);
      }

      if (!midpointFired && t >= MIDPOINT) {
        midpointFired = true;
        callbacksRef.current.onMidpoint?.();
      }

      if (t < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        callbacksRef.current.onComplete?.();
      }
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="hyperspace-canvas" />;
}

export default Hyperspace;
