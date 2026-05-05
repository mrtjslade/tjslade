import { useEffect, useRef, useState } from "react";
import "./ThemeToggle.css";
import { useTheme } from "../../context/ThemeContext";
import DecodeText from "../DecodeText/DecodeText";

const ARM_DURATION = 3000;

function ThemeToggle() {
  const { mode, transitioning, toggleMode } = useTheme();
  const [armed, setArmed] = useState(false);
  const armTimer = useRef(null);
  const isTouch = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    isTouch.current = window.matchMedia("(hover: none)").matches;
  }, []);

  useEffect(() => {
    return () => {
      if (armTimer.current) clearTimeout(armTimer.current);
    };
  }, []);

  const isSpace = mode === "space";
  const nextLabel = isSpace ? "Professional Mode" : "Space Mode";

  const handleClick = () => {
    if (transitioning) return;

    // Hover-capable devices: direct toggle
    if (!isTouch.current) {
      toggleMode();
      return;
    }

    // Touch devices: tap-to-confirm
    if (armed) {
      if (armTimer.current) clearTimeout(armTimer.current);
      setArmed(false);
      toggleMode();
      return;
    }

    setArmed(true);
    if (armTimer.current) clearTimeout(armTimer.current);
    armTimer.current = setTimeout(() => setArmed(false), ARM_DURATION);
  };

  return (
    <button
      type="button"
      className={`theme-toggle${armed ? " is-armed" : ""}`}
      onClick={handleClick}
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
              {armed ? "Tap again to confirm" : "Light mode incoming"}
            </span>
            <span className="hint-detail">
              Switches to the clean, professional view.
            </span>
          </>
        ) : armed ? (
          "Tap again to confirm. Engaging the hyperdrive."
        ) : (
          "Engage the hyperdrive and jump to a galaxy far, far away."
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;
