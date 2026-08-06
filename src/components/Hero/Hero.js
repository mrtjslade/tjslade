import "./Hero.css";
import { useTheme } from "../../context/ThemeContext";
import DecodeText from "../DecodeText/DecodeText";

function Hero() {
  const { mode } = useTheme();
  const isPro = mode === "professional";

  return (
    <div className="hero">
      <h1 className="hero-text">
        <DecodeText>Hi, I'm TJ</DecodeText>
      </h1>
      {isPro ? (
        <p className="hero-subtitle">
          Web developer building modern client sites with React, Next.js, and
          WordPress, plus the APIs and data pipelines behind them.
        </p>
      ) : (
        <p className="hero-subtitle hero-subtitle-space">
          <DecodeText stagger={18}>
            Hyperdrive Coder · Cockpit-grade Engineer · Outer Rim Web Specialist
          </DecodeText>
        </p>
      )}
    </div>
  );
}

export default Hero;
