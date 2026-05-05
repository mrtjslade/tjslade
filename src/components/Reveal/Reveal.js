import { Children, cloneElement, useEffect, useRef, useState } from "react";
import "./Reveal.css";
import { useTheme } from "../../context/ThemeContext";

/**
 * Wraps a single child element and applies a subtle fade-in + translateY
 * animation when it scrolls into view. Pro mode only. In space mode this is
 * a no-op and renders children directly.
 *
 * Uses cloneElement so no extra wrapper div is added (preserves grid layouts).
 *
 * Props:
 *   children: exactly one element (required)
 *   delay:    ms before the transition starts after entering view (default 0)
 */
function Reveal({ children, delay = 0 }) {
  const { mode } = useTheme();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (mode !== "professional") return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode]);

  if (mode !== "professional") {
    return children;
  }

  const child = Children.only(children);
  const existingClass = child.props.className || "";
  const nextClass = `${existingClass} reveal${inView ? " reveal--in" : ""}`.trim();

  return cloneElement(child, {
    ref,
    className: nextClass,
    style: {
      ...child.props.style,
      transitionDelay: `${delay}ms`,
    },
  });
}

export default Reveal;
