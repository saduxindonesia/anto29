import Hero from './components/Hero';
import RoadTo30 from './components/RoadTo30';
import Wishes from './components/Wishes';
import Challenges from './components/Challenges';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-wrapper">
      <Hero />
      <RoadTo30 />
      <Challenges />
      <Wishes />
      <Footer />
    </div>
  );
}

export default App;
