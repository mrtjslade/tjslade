import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { useTheme } from "../../context/ThemeContext";
import DecodeText from "../DecodeText/DecodeText";

function HudCounter() {
  const [count, setCount] = useState(4783);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c + 1) % 100000);
    }, 220);
    return () => clearInterval(id);
  }, []);

  return <div className="hud-counter">{String(count).padStart(5, "0")}</div>;
}

// Pro sidebar links with an accent bar that slides to the section in view.
function ProNavLinks({ links }) {
  const [active, setActive] = useState(null);
  const [bar, setBar] = useState(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [links]);

  useEffect(() => {
    const el = active && linkRefs.current[active];
    setBar(el ? { top: el.offsetTop, height: el.offsetHeight } : null);
  }, [active]);

  return (
    <ul className="nav-links nav-links-pro">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            ref={(el) => (linkRefs.current[link.href] = el)}
            className={active === link.href ? "is-active" : undefined}
            aria-current={active === link.href ? "true" : undefined}
          >
            {link.label}
          </a>
        </li>
      ))}
      <span
        className="nav-pro-indicator"
        aria-hidden="true"
        style={
          bar
            ? { transform: `translateY(${bar.top}px)`, height: bar.height, opacity: 1 }
            : { opacity: 0 }
        }
      />
    </ul>
  );
}

function Navbar() {
  const { mode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const isPro = mode === "professional";

  // Close mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen]);

  // Close menu on theme change so users don't see stale state
  useEffect(() => {
    setMenuOpen(false);
  }, [mode]);

  const closeMenu = () => setMenuOpen(false);

  const proLinks = [
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const spaceLinks = [
    { href: "#about", label: "DOSSIER" },
    { href: "#work", label: "MISSIONS" },
    { href: "#skills", label: "ARSENAL" },
    { href: "#contact", label: "COMMS" },
  ];

  const links = isPro ? proLinks : spaceLinks;

  // Hamburger button (visible on mobile only via CSS)
  const hamburger = (
    <button
      type="button"
      className={`nav-mobile-toggle nav-mobile-toggle--${
        isPro ? "pro" : "space"
      }`}
      onClick={() => setMenuOpen((o) => !o)}
      aria-expanded={menuOpen}
      aria-controls="primary-nav-mobile"
      aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
    >
      <span className="nav-mobile-toggle-bar" />
      <span className="nav-mobile-toggle-bar" />
      <span className="nav-mobile-toggle-bar" />
    </button>
  );

  // Fullscreen mobile drawer (visible on mobile only when menuOpen)
  const mobileDrawer = (
    <nav
      id="primary-nav-mobile"
      className={`nav-mobile-drawer nav-mobile-drawer--${
        isPro ? "pro" : "space"
      }${menuOpen ? " is-open" : ""}`}
      aria-label="Primary"
    >
      <ul className="nav-mobile-links">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={closeMenu}>
              {isPro ? link.label : <DecodeText>{link.label}</DecodeText>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (isPro) {
    return (
      <>
        {hamburger}
        {mobileDrawer}
        <nav
          className="navbar navbar-pro navbar-pro-desktop"
          aria-label="Primary"
        >
          <ProNavLinks links={proLinks} />
        </nav>
      </>
    );
  }

  // Space mode
  return (
    <>
      {hamburger}
      {mobileDrawer}
      <nav className="navbar navbar-space-desktop">
        <div className="targeting-module">
          <div className="hud-frame">
            <div className="hud-side hud-side-left">
              <div className="hud-btn hud-btn-half hud-amber" />
              <div className="hud-btn hud-red">
                <div className="hud-btn-dot" />
              </div>
              <div className="hud-btn hud-btn-circle hud-violet" />
            </div>

            <div className="hud-screen">
              <svg
                className="hud-tunnel"
                viewBox="0 0 100 60"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.35"
                  strokeLinecap="round"
                >
                  <line x1="0" y1="0" x2="50" y2="30" />
                  <line x1="100" y1="0" x2="50" y2="30" />
                  <line x1="0" y1="60" x2="50" y2="30" />
                  <line x1="100" y1="60" x2="50" y2="30" />

                  <rect x="14" y="8.4" width="72" height="43.2" />
                  <rect x="27" y="16.2" width="46" height="27.6" />
                  <rect x="38" y="22.8" width="24" height="14.4" />
                  <rect x="44" y="26.4" width="12" height="7.2" />
                </g>
              </svg>

              <div className="hud-scanlines" aria-hidden="true" />

              <div className="nav-links">
                <a href="#about">
                  <DecodeText>DOSSIER</DecodeText>
                </a>
                <a href="#work">
                  <DecodeText>MISSIONS</DecodeText>
                </a>
                <a href="#skills">
                  <DecodeText>ARSENAL</DecodeText>
                </a>
                <a href="#contact">
                  <DecodeText>COMMS</DecodeText>
                </a>
              </div>

              <HudCounter />
            </div>

            <div className="hud-side hud-side-right">
              <div className="hud-btn hud-teal">
                <div className="hud-btn-dot" />
              </div>
              <div className="hud-btn hud-btn-square hud-amber" />
              <div className="hud-btn hud-btn-half hud-red" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
