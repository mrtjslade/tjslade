import "./DecodeText.css";
import { useTheme } from "../../context/ThemeContext";
import { useDecode } from "../../context/DecodeContext";

/**
 * Renders text in Aurebesh until the global TRANSLATE button is pressed.
 * On press, each letter resolves into the inherited font with a brief flicker.
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
function DecodeText({ children, stagger = 35 }) {
  const { mode } = useTheme();
  const { decoded } = useDecode();

  if (mode !== "space") {
    return <>{children}</>;
  }

  const text = String(children);
  const parts = text.split(/(\s+)/);
  let letterIndex = 0;

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
                  className={`decode-letter${decoded ? " decode-letter--resolved" : ""}`}
                  style={
                    decoded
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
