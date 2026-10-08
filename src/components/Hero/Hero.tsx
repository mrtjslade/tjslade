import { Fragment, type CSSProperties } from "react";
import "./Hero.css";
import { useTheme } from "../../context/ThemeContext";
import DecodeText from "../DecodeText/DecodeText";

const PRO_TITLE = "Hi, I'm TJ";
const PRO_SUBTITLE =
  "Web developer building modern client sites with React, Next.js, and WordPress, plus the APIs and data pipelines behind them.";

// Each word slides up from behind a mask, staggered by --i.
function MaskedWords({
  text,
  startIndex = 0,
}: {
  text: string;
  startIndex?: number;
}) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      <span className="word-mask">
        <span
          className="word"
          style={{ "--i": startIndex + i } as CSSProperties}
        >
          {word}
        </span>
      </span>{" "}
    </Fragment>
  ));
}

function Hero() {
  const { mode } = useTheme();
  const isPro = mode === "professional";
  const titleWords = PRO_TITLE.split(" ").length;

  return (
    <div className="hero">
      {isPro ? (
        <h1 className="hero-text hero-text-masked">
          <span className="visually-hidden">{PRO_TITLE}</span>
          <span aria-hidden="true">
            <MaskedWords text={PRO_TITLE} />
          </span>
        </h1>
      ) : (
        <h1 className="hero-text">
          <DecodeText>Hi, I'm TJ</DecodeText>
        </h1>
      )}
      {isPro ? (
        <p className="hero-subtitle hero-subtitle-masked">
          <span className="visually-hidden">{PRO_SUBTITLE}</span>
          <span aria-hidden="true">
            <MaskedWords text={PRO_SUBTITLE} startIndex={titleWords + 1} />
          </span>
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
