import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="targeting-module">
        <div className="panel-lights">
          <div className="light red" />
          <div className="light yellow" />
          <div className="light green" />
          <div className="light blue" />
        </div>

        <div className="hud-frame">
          <div className="hud-screen">
            <div className="grid" />
            <div className="nav-links">
              <a href="#about">ABOUT</a>
              <a href="#work">WORK</a>
              <a href="#work">SKILLS</a>
              <a href="#contact">CONTACT</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
