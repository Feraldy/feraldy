import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import Resume from './pages/Resume'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Photography from './pages/Photography'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'

// Wrapper component to access location
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <LandingPage />
          </PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition>
            <Resume />
          </PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition>
            <Projects />
          </PageTransition>
        } />
        <Route path="/blog" element={
          <PageTransition>
            <Blog />
          </PageTransition>
        } />
        <Route path="/photography" element={
          <PageTransition>
            <Photography />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
