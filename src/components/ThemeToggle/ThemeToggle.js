import "./ThemeToggle.css";
import { useTheme } from "../../context/ThemeContext";
import DecodeText from "../DecodeText/DecodeText";

function ThemeToggle() {
  const { mode, transitioning, toggleMode } = useTheme();
  const isSpace = mode === "space";
  const nextLabel = isSpace ? "Professional Mode" : "Space Mode";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleMode}
      disabled={transitioning}
      aria-label={`Switch to ${nextLabel.toLowerCase()}`}
    >
      <span className="theme-toggle-label">
        {isSpace ? <DecodeText stagger={25}>{nextLabel}</DecodeText> : nextLabel}
      </span>
      <span className="theme-toggle-hint" role="tooltip">
        {isSpace ? (
          <>
            <span className="hint-warn">
              <span className="hint-warn-icon" aria-hidden="true">
                !
              </span>
              Light mode incoming
            </span>
            <span className="hint-detail">
              Switches to the clean, professional view.
            </span>
          </>
        ) : (
          "Engage the hyperdrive and jump to a galaxy far, far away."
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;
