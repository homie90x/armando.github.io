import './App.css'
import GradientASCII from './components/GradientASCII'
import githubIcon from './assets/github.png'
import linkedinIcon from './assets/linkedin.png'
import whiteLogo from './assets/armando logo faviconwhite.png'
import JellyRadio from './components/JellyRadio'
import Projects, { ProjectDetails } from './pages/projects'
import About from './pages/about'
import { HashRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Experience from './pages/experience'
import FlexCarousel from './components/FlexCarousel';



  const items = [
      { src: '/images/one.jpg', alt: 'A chrome sculpture', title: 'Iridescence' },
      { src: '/images/two.jpg', alt: 'A figure on a white set', title: 'White Room' },
      { src: '/images/three.jpg', alt: 'A clay bust in profile', title: 'Clay Study', subtitle: 'Studio 04' }
];

const pages = [
  { value: 'projects', label: 'Projects', description: 'Here are some interesting projects.' },
  { value: 'experience', label: 'Experience', description: 'Here is my work experience.' },
  { value: 'about', label: 'About Me', description: 'Learn more about me.' },
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
  const activePage =
    location.pathname.startsWith('/projects')
      ? 'projects'
      : pages.find(page => `/${page.value}` === location.pathname)?.value ?? null

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
        <Link className="brand-name" to="/">
          <img src={whiteLogo} alt="Armando Valdez" />
        </Link>
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
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
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
      </main>

      {/* {location.pathname === '/' && (
        <div style={{ width: '100%', height: '560px', position: 'relative' }}>
          <FlexCarousel
            items={items}
            preset="liquid"
            intro="rise"
            cardHeight={0.5}
            gap={12}
            squeeze={0.2}
            focusOnClick
            captions
            fit="natural"
            radius={0}
            lensWidth={0.74}
            lensHeight={1.18}
            tilt={62}
            roundness={1}
            bend={0.34}
            reach={0.38}
            curl="twist"
            dispersion={0.45}
            liquid={0}
            followCursor={false}
            autoplay={false}
            interval={4}
            captureWheel
          />
        </div>
      )} */}

      <footer className="footer-box">
        <Link className="footer-logo" to="/" aria-label="Armando Valdez home">
          <img src={whiteLogo} alt="" />
        </Link>
        <nav className="footer-links" aria-label="Social links">
          <a href="https://www.instagram.com/armando_v777/" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/armando-valdez-97ab571b5/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="https://github.com/homie90x" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </footer>
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
