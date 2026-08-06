import "./Work.css";
import { projects } from "./WorkData";
import { useTheme } from "../../context/ThemeContext";
import DecodeText from "../DecodeText/DecodeText";
import Reveal from "../Reveal/Reveal";

function Work() {
  const { mode } = useTheme();
  const isPro = mode === "professional";
  const title = isPro ? "MY WORK" : "MISSIONS";
  const buttonLabel = isPro ? "VIEW PROJECT" : "VIEW MISSION";
  const comingSoonLabel = isPro ? "Coming Soon!" : "INCOMING";

  return (
    <section id="work" className="work-section">
      <Reveal>
        <h2 className="work-title">
          {isPro ? title : <DecodeText>{title}</DecodeText>}
        </h2>
      </Reveal>

      <div className="work-grid">
        {projects.map((project, index) => {
          const hasLink = Boolean(project.url) && !project.comingSoon;
          const description =
            !isPro && project.spaceDescription
              ? project.spaceDescription
              : project.description;
          const displayTitle = project.comingSoon
            ? `${project.title} - ${comingSoonLabel}`
            : project.title;

          return (
            <Reveal key={index} delay={(index % 8) * 60}>
              <div
                className={
                  "work-card" + (project.featured ? " work-card-featured" : "")
                }
              >
              {isPro && hasLink ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="work-name-link"
                >
                  <h3 className="work-name">{displayTitle}</h3>
                </a>
              ) : (
                <h3 className="work-name">
                  {isPro ? (
                    displayTitle
                  ) : (
                    <DecodeText stagger={20}>{displayTitle}</DecodeText>
                  )}
                </h3>
              )}

              <p className="work-services">{project.services}</p>

              {description && (
                <p className="work-description">{description}</p>
              )}

              {!isPro && hasLink && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="work-button"
                >
                  <DecodeText stagger={25}>{buttonLabel}</DecodeText>
                </a>
              )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default Work;
