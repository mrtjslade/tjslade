"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type DecodeContextValue = {
  decoded: boolean;
  toggle: () => void;
};

const DecodeContext = createContext<DecodeContextValue | null>(null);

export function DecodeProvider({ children }: { children: ReactNode }) {
  const [decoded, setDecoded] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.decoded = decoded ? "true" : "false";
  }, [decoded]);

  const toggle = useCallback(() => {
    setDecoded((d) => !d);
  }, []);

  return (
    <DecodeContext.Provider value={{ decoded, toggle }}>
      {children}
    </DecodeContext.Provider>
  );
}

export function useDecode() {
  const ctx = useContext(DecodeContext);
  if (!ctx) throw new Error("useDecode must be used inside DecodeProvider");
  return ctx;
}
