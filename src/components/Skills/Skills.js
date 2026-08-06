import "./Skills.css";
import { useTheme } from "../../context/ThemeContext";
import DecodeText from "../DecodeText/DecodeText";
import Reveal from "../Reveal/Reveal";

const skills = [
  {
    name: "JavaScript and ES6",
    pro: "Client logic, browser features, modern app behavior.",
    space: "Hyperdrive logic for browser-based vessels.",
  },
  {
    name: "React Applications",
    pro: "Interactive views, component patterns, state flow.",
    space: "Modular component arrays for fleet-wide deployments.",
  },
  {
    name: "Next.js",
    pro: "Server rendering, routing, modern React frameworks.",
    space: "Server-rendered Republic-grade React frameworks.",
  },
  {
    name: "Front End Development",
    pro: "Modern UI, animations, responsive experience.",
    space: "Cockpit interfaces that respond at lightspeed.",
  },
  {
    name: "HTML and CSS",
    pro: "Pixel control, typography, layout execution.",
    space: "Pixel control, structural integrity, layout discipline.",
  },
  {
    name: "WordPress Development",
    pro: "Custom builds, CPTs, templates, scalability.",
    space: "Custom builds, content types, sector-scale architecture.",
  },
  {
    name: "Custom Theme Building",
    pro: "Advanced layouts, dynamic content, maintainable structure.",
    space: "Bespoke layouts, dynamic content, mission-grade structure.",
  },
  {
    name: "Plugin Extensions",
    pro: "WooCommerce, Crocoblock, ACF, membership logic.",
    space: "WooCommerce, Crocoblock, ACF, membership protocols.",
  },
  {
    name: "PHP",
    pro: "Theme logic, backend structure, WP customization.",
    space: "Backend logic and WordPress core customization.",
  },
  {
    name: "Python Development",
    pro: "Automation, data sync tools, scripts, workflow systems.",
    space: "Droid-grade automation, data relays, workflow engineering.",
  },
  {
    name: "APIs and Data Integration",
    pro: "REST APIs, Stripe, Square, Vimeo, Zoom, real-time data sync.",
    space: "Comm relays, credit systems, and live telemetry feeds.",
  },
  {
    name: "SQL and Databases",
    pro: "MySQL, WordPress data layer, queries, schema design.",
    space: "Archive vault records, query protocols, structured data.",
  },
  {
    name: "Data Pipelines and ETL",
    pro: "Ingest, transform, and sync dataflows across systems.",
    space: "Data cargo runs: extract, transform, deliver on schedule.",
  },
  {
    name: "UI and Graphic Design",
    pro: "Structure, branding, typography, accessibility.",
    space: "Branding, typography, accessibility, visual command.",
  },
  {
    name: "Hosting and Workspace",
    pro: "Server setup, email configuration, maintenance.",
    space: "Server deployment, comm routing, infrastructure upkeep.",
  },
  {
    name: "SEO and Analytics",
    pro: "Technical SEO, local search, indexing, traffic analytics.",
    space: "Sector-wide signal boosting and traffic telemetry.",
  },
];

function Skills() {
  const { mode } = useTheme();
  const isPro = mode === "professional";
  const title = isPro ? "SKILLS" : "ARSENAL";

  return (
    <section id="skills" className="skills-section">
      <Reveal>
        <h2 className="skills-title">
          {isPro ? title : <DecodeText>{title}</DecodeText>}
        </h2>
      </Reveal>

      <div className="skills-grid">
        {skills.map((s, index) => (
          <Reveal key={s.name} delay={(index % 6) * 50}>
            <div className="skill-card">
              <h3>
                {isPro ? (
                  s.name
                ) : (
                  <DecodeText stagger={22}>{s.name}</DecodeText>
                )}
              </h3>
              <p>{isPro ? s.pro : s.space}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Skills;
