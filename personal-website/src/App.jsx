import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Resume from './components/Resume'
import Projects from './components/Projects'
import Blog from './components/Blog'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  )
}

export default App
