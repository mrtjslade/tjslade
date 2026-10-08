"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

export type ThemeMode = "professional" | "space";
export type Point = { x: number; y: number };

type ThemeContextValue = {
  mode: ThemeMode;
  transitioning: boolean;
  toggleMode: (origin?: Point) => void;
  swapMode: () => void;
  finishTransition: () => void;
};

const STORAGE_KEY = "tjslade-theme-mode";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function saveMode(mode: ThemeMode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {}
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The server always renders professional mode. A saved space-mode choice is
  // applied in a layout effect, which runs before the browser paints.
  const [mode, setMode] = useState<ThemeMode>("professional");
  const [transitioning, setTransitioning] = useState(false);

  useLayoutEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "space") {
        setMode("space");
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const toggleMode = useCallback(
    (origin?: Point) => {
      // Leaving space mode: reveal the professional page in a circle that
      // grows out of the toggle button. Browsers without the View Transitions
      // API (or visitors who prefer reduced motion) keep the hyperspace jump.
      const canReveal =
        mode === "space" &&
        origin !== undefined &&
        typeof document.startViewTransition === "function" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!canReveal) {
        setTransitioning(true);
        return;
      }

      const { x, y } = origin;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        flushSync(() => setMode("professional"));
        saveMode("professional");
      });

      transition.ready
        .then(() => {
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
        })
        .catch(() => {
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
        const next: ThemeMode = prev === "space" ? "professional" : "space";
        saveMode(next);
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
