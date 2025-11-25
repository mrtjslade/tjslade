import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="targeting-module">
        {/* Top indicator lights */}
        <div className="panel-lights">
          <div className="light red" />
          <div className="light yellow" />
          <div the="light green" />
        </div>

        {/* HUD screen */}
        <div className="hud-frame">
          <div className="hud-screen">
            {/* grid */}
            <div className="grid" />

            {/* OPTIONAL: if you want the red vertical line */}
            {/* <div className="red-lines" /> */}

            {/* nav links */}
            <div className="nav-links">
              <a href="#about">ABOUT</a>
              <a href="#work">WORK</a>
              <a href="#contact">CONTACT</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
