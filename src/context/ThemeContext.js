import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { flushSync } from "react-dom";

const STORAGE_KEY = "tjslade-theme-mode";
const ThemeContext = createContext(null);

function readInitialMode() {
  if (typeof window === "undefined") return "professional";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "space") return "space";
  if (saved === "professional") return "professional";
  return "professional";
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(readInitialMode);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const toggleMode = useCallback(
    (origin) => {
      // Leaving space mode: reveal the professional page in a circle that
      // grows out of the toggle button. Browsers without the View Transitions
      // API (or visitors who prefer reduced motion) keep the hyperspace jump.
      const canReveal =
        mode === "space" &&
        origin &&
        typeof document.startViewTransition === "function" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!canReveal) {
        setTransitioning((t) => (t ? t : true));
        return;
      }

      const { x, y } = origin;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        flushSync(() => setMode("professional"));
        try {
          window.localStorage.setItem(STORAGE_KEY, "professional");
        } catch (_) {}
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      }).catch(() => {
        // Transition skipped (e.g. tab in background); the mode still swaps.
      });
    },
    [mode]
  );

  const swapMode = useCallback(() => {
    // Mark the heavy theme swap (mounting StarsBackground, HUD navbar, ~1000
    // DecodeText spans) as a non-urgent update so it yields to the hyperspace
    // canvas animation instead of blocking the main thread.
    startTransition(() => {
      setMode((prev) => {
        const next = prev === "space" ? "professional" : "space";
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch (_) {}
        return next;
      });
    });
  }, []);

  const finishTransition = useCallback(() => {
    setTransitioning(false);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ mode, transitioning, toggleMode, swapMode, finishTransition }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
