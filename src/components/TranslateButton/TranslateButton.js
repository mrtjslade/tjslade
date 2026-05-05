import "./TranslateButton.css";
import { useTheme } from "../../context/ThemeContext";
import { useDecode } from "../../context/DecodeContext";

function TranslateButton() {
  const { mode } = useTheme();
  const { decoded, toggle } = useDecode();

  if (mode !== "space") return null;

  return (
    <button
      type="button"
      className="translate-toggle"
      onClick={toggle}
      aria-label={
        decoded ? "Re-encode to galactic basic" : "Translate to galactic basic"
      }
    >
      {decoded ? "AUREBESH" : "TRANSLATE"}
    </button>
  );
}

export default TranslateButton;
