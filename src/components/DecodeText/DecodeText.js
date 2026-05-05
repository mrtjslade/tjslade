import { useEffect, useRef, useState } from "react";
import "./DecodeText.css";
import { useTheme } from "../../context/ThemeContext";
import { useDecode } from "../../context/DecodeContext";

/**
 * Renders text in Aurebesh until the global TRANSLATE button is pressed.
 * On press, each letter resolves into the inherited font with a brief flicker.
 * Pressing again runs the animation in reverse, encoding back into Aurebesh.
 *
 * In professional mode, this is a no-op. Children render normally.
 *
 * Words are kept together (no mid-word breaks) by wrapping each word in a
 * .decode-word with white-space: nowrap.
 *
 * Props:
 *   children: a string (required)
 *   stagger:  ms between each letter resolving (default 35)
 */

const ANIMATION_MS = 520;

function DecodeText({ children, stagger = 35 }) {
  const { mode } = useTheme();
  const { decoded } = useDecode();
  const [phase, setPhase] = useState(decoded ? "decoded" : "encoded");
  const prevDecoded = useRef(decoded);
  const timerRef = useRef(null);

  const text = String(children);
  const totalDuration =
    ANIMATION_MS + Math.max(0, text.length - 1) * stagger;

  useEffect(() => {
    if (prevDecoded.current === decoded) return;
    prevDecoded.current = decoded;

    const target = decoded ? "decoded" : "encoded";
    const transitionPhase = decoded ? "decoding" : "encoding";

    setPhase(transitionPhase);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase(target);
      timerRef.current = null;
    }, totalDuration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [decoded, totalDuration]);

  if (mode !== "space") {
    return <>{children}</>;
  }

  const parts = text.split(/(\s+)/);
  let letterIndex = 0;

  let letterClass = "decode-letter";
  if (phase === "decoded" || phase === "decoding") {
    letterClass = "decode-letter decode-letter--resolved";
  } else if (phase === "encoding") {
    letterClass = "decode-letter decode-letter--encoding";
  }

  const showStagger = phase === "decoding" || phase === "encoding";

  return (
    <span className="decode-text" aria-label={text}>
      {parts.map((part, partIdx) => {
        if (part.length === 0) return null;
        if (/^\s+$/.test(part)) {
          return (
            <span key={partIdx} className="decode-space">
              {part}
            </span>
          );
        }
        const chars = Array.from(part);
        return (
          <span key={partIdx} className="decode-word">
            {chars.map((char, cIdx) => {
              const idx = letterIndex++;
              return (
                <span
                  key={cIdx}
                  aria-hidden="true"
                  className={letterClass}
                  style={
                    showStagger
                      ? { animationDelay: `${idx * stagger}ms` }
                      : undefined
                  }
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

export default DecodeText;
