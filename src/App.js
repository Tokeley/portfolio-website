import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import FlowfieldBackground from './components/FlowfieldBackground';

const App = () => {
  return (
    <div className="relative">
      <FlowfieldBackground />
      <Navigation />
      <div className="relative z-10">
        <Home />
        <About />
        <Projects />
      </div>
    </div>
  );
}

export default App;
