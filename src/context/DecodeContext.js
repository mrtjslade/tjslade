import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DecodeContext = createContext(null);

export function DecodeProvider({ children }) {
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
