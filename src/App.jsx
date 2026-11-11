import './App.css'
import GradientASCII from './components/GradientASCII'
import githubIcon from './assets/github.png'
import linkedinIcon from './assets/linkedin.png'
import roboArmVideo from './assets/roboarm.mp4'
import roboCatVideo from './assets/robocat.mp4'
import keychainVideo from './assets/keychain.mp4'
import JellyRadio from './components/JellyRadio'
import Projects from './pages/projects'
import VideoGallery from './components/VideoGallery'
import About from './pages/about'
import { HashRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Experience from './pages/experience'

const pages = [
  { value: 'projects', label: 'Projects', description: 'Here are some interesting projects.' },
  { value: 'experience', label: 'Experience', description: 'Here is my work experience.' },
  { value: 'about', label: 'About Me', description: 'Learn more about me.' },
]

const videos = [
  { src: roboArmVideo, title: 'Robo Arm' },
  { src: roboCatVideo, title: 'RoboCat' },
  { src: keychainVideo, title: 'Keychain' },
]

function PageContent({ title, description }) {
  return (
    <>
      <h1>{title}</h1>
      {description && <p className="intro">{description}</p>}
    </>
  )
}

function Portfolio() {
  const location = useLocation()
  const navigate = useNavigate()
  const activePage = pages.find(page => `/${page.value}` === location.pathname)?.value ?? null

  return (
    <div className="page">
      <div className="background-wrapper" aria-hidden="true">
        <GradientASCII
          className="page-background"
          colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']}
          gradientOpacity={0.3}
          glyphOpacity={0.25}
        />
      </div>

      <header className="top-bar">
        <a
          className="social-link"
          href="https://www.linkedin.com/in/armando-valdez-97ab571b5/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
        >
          <img src={linkedinIcon} alt="LinkedIn" />
        </a>
        <Link className="brand-name" to="/">Armando Valdez</Link>
        <a
          className="social-link"
          href="https://github.com/homie90x"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <img src={githubIcon} alt="GitHub" />
        </a>
      </header>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Hello! I am Armando Valdez, an aspiring Robotics Engineer.</h1>
                <p className="intro">Find my personal projects and work experience below.</p>
              </>
            }
          />
          <Route 
            path="/projects" element={<Projects />} />
          <Route
            path="/experience"
            element={<Experience />} />
          
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <JellyRadio
          className="page-menu"
          items={pages}
          value={activePage}
          onChange={value => navigate(`/${value}`)}
          ariaLabel="Portfolio pages"
          chipColor="#27272a"
          activeColor="#f5f5f5"
          textColor="#f5f5f5"
          activeTextColor="#18181b"
          size="lg"
        />
        {location.pathname === '/' && <VideoGallery items={videos} />}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Portfolio />
    </HashRouter>
  )
}
