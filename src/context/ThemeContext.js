import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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

  const toggleMode = useCallback(() => {
    setTransitioning((t) => (t ? t : true));
  }, []);

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
