import "./About.css";
import { useTheme } from "../../context/ThemeContext";
import DecodeText from "../DecodeText/DecodeText";
import Reveal from "../Reveal/Reveal";

function About() {
  const { mode } = useTheme();
  const isPro = mode === "professional";

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <Reveal>
          <h2 className="about-title">
            {isPro ? "ABOUT" : <DecodeText>DOSSIER</DecodeText>}
          </h2>
        </Reveal>

        {isPro ? (
          <>
            <Reveal delay={80}>
              <p className="about-text">
                I'm TJ Slade, a web developer building modern, scalable client
                sites with React, Next.js, and WordPress. I focus on clean
                code, strong performance, and interfaces that hold up under
                real world use.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <p className="about-text">
                My work spans the full stack of front end engineering:
                JavaScript and ES6, React component architecture, Next.js
                applications, and custom WordPress themes and plugins. Behind
                the interface I build the data layer that ties it all
                together: PHP, Node, and Python automation, REST API
                integrations, and real-time data pipelines that keep content,
                inventory, and payments in sync across systems.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="about-text">
                I deliver everything a client needs to launch and maintain a
                digital presence: design, development, hosting, Google
                Workspace, SEO, and ongoing maintenance. From small business
                landing pages to large scale subscription platforms, I build
                scalable, reliable systems that are easy to operate, simple to
                monitor, and built to last.
              </p>
            </Reveal>
          </>
        ) : (
          <>
            <p className="about-text">
              TJ Slade, code-slinger from the Outer Rim of the digital galaxy.
              I build modern, scalable client sites with React, Next.js, and
              WordPress. Clean code, strong performance, interfaces that hold
              up under real combat.
            </p>

            <p className="about-text">
              My work spans the full stack of front end engineering: JavaScript
              and ES6, React component arrays, Next.js applications, custom
              WordPress themes and plugins, and the backend logic that ties it
              all together with PHP, Node, and Python automation.
            </p>

            <p className="about-text">
              I deliver everything a client needs to launch and maintain a
              digital outpost: design, development, hosting, Google Workspace,
              SEO, and ongoing maintenance. From small business landing pages
              to capital-ship-class subscription platforms, I build systems
              that operate effortlessly from the cockpit and hold up across
              the sector.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default About;
