import "./App.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { DecodeProvider } from "./context/DecodeContext";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import StarsBackground from "./components/Stars/StarsBackground";
import Work from "./components/Work/Work";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import TranslateButton from "./components/TranslateButton/TranslateButton";
import Hyperspace from "./components/Hyperspace/Hyperspace";

function AppContent() {
  const { mode, transitioning, swapMode, finishTransition } = useTheme();

  return (
    <>
      {mode === "space" && <StarsBackground />}
      <Hero />
      <Navbar />
      <About />
      <Work />
      <Skills />
      <Contact />
      <ThemeToggle />
      <TranslateButton />
      <Hyperspace
        active={transitioning}
        onMidpoint={swapMode}
        onComplete={finishTransition}
      />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <DecodeProvider>
        <AppContent />
      </DecodeProvider>
    </ThemeProvider>
  );
}

export default App;
