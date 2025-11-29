import "./App.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import BackgroundStars from "./components/Stars/BackgroundStars";
import Work from "./components/Work/Work";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <>
      <BackgroundStars />
      <Hero />
      <Navbar />
      <About />
      <Work />
      <Skills />
      <Contact />
    </>
  );
}

export default App;
