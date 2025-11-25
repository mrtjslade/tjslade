import "./Work.css";
import { projects } from "./WorkData";

function Work() {
  return (
    <section id="work" className="work-section">
      <h2 className="work-title">MY WORK</h2>

      <div className="work-grid">
        {projects.map((project, index) => (
          <div className="work-card" key={index}>
            <h3 className="work-name">{project.title}</h3>

            <p className="work-services">{project.services}</p>

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="work-button"
            >
              VIEW PROJECT
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Work;
