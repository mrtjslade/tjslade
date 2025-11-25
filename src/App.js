import "./App.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import BackgroundStars from "./components/Stars/BackgroundStars";
import Stars from "./components/Stars/Stars";
import Work from "./components/Work/Work";

function App() {
  return (
    <>
      <Stars />
      <BackgroundStars />
      <Hero />
      <Navbar />
      <About />
      <Work />
      <section id="contact" style={{ minHeight: "100vh" }}></section>
    </>
  );
}

export default App;
